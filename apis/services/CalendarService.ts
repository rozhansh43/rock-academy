/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CalendarService {
    /**
     * Get calendar view of registrable offerings
     *
     * Retrieve a calendar view showing registrable offerings across different time periods.
     *
     * **Query Parameters:**
     * - `period`: Calendar period (day, week, month, year) - defaults to 'month'
     * - `date`: Gregorian date in ISO format (e.g., 2024-10-15) - optional
     * - `jdate`: Jalali date with dash or slash (e.g., 1404-07-10 or 1404/07/10) - optional
     * - `tz`: Timezone for the calendar - defaults to 'Asia/Tehran'
     * - `kinds`: Comma-separated list of offering kinds to include
     *
     * **Date Selection:**
     * - If `jdate` is provided, it takes priority over `date`
     * - If neither is provided, defaults to today
     * - Use `date` for Gregorian dates, `jdate` for Jalali dates
     *
     * **Period Behavior:**
     * - `day`: Returns offerings running on the specified date
     * - `week`: Returns offerings running during the full week containing the date
     * - `month`: Returns offerings running from the specified date to end of that month
     * - `year`: Returns offerings running from the specified date to end of that year
     *
     * **Important:** Calendar shows offerings based on their actual start_date and end_date (when the offering is happening), NOT based on registration dates.
     *
     * **Response includes:**
     * - Calendar period and anchor date
     * - Date range for the calendar view
     * - Daily breakdown with:
     * - Date in both Gregorian and Jalali formats
     * - Count of offerings by kind for each day
     * - Total offerings per day
     * - Whether any offerings exist for that day
     * - Summary statistics:
     * - Total registrable offerings across all days
     * - Number of days with any offerings
     *
     * **Examples:**
     * - `/events/calendar/?period=month&jdate=1404-07-10` (Jalali date with dash)
     * - `/events/calendar/?period=month&jdate=1404/07/10` (Jalali date with slash)
     * - `/events/calendar/?period=month&date=2025-10-15` (Gregorian date)
     * - `/events/calendar/?period=week&jdate=1404-07-15&kinds=class,workshop`
     * - `/events/calendar/?period=month` (defaults to today to end of current month)
     *
     * @param period Calendar period to display
     * @param date Gregorian date in ISO format (e.g., 2025-10-15). For month/year periods, returns from this date to end of period. Optional.
     * @param tz Timezone for the calendar
     * @param kinds Comma-separated list of offering kinds to include
     * @param jdate Jalali date with dash (1404-07-10) or slash (1404/07/10). Takes priority over 'date' if both provided. For month/year periods, returns from this date to end of period. Optional.
     * @returns any Calendar view of registrable offerings
     * @throws ApiError
     */
    public static eventsCalendarList(
        period?: 'day' | 'week' | 'month' | 'year',
        date?: string,
        tz?: string,
        kinds?: string,
        jdate?: string,
    ): CancelablePromise<{
        /**
         * Calendar period
         */
        period?: string;
        /**
         * Anchor date
         */
        anchor_date?: string;
        /**
         * Date range for the calendar
         */
        range?: {
            /**
             * Start date
             */
            start?: string;
            /**
             * End date
             */
            end?: string;
        };
        /**
         * Daily breakdown
         */
        days?: Array<{
            /**
             * Date
             */
            date?: string;
            /**
             * Jalali date information
             */
            jalali?: {
                /**
                 * Jalali year
                 */
                'y'?: number;
                /**
                 * Jalali month
                 */
                'm'?: number;
                /**
                 * Jalali day
                 */
                'd'?: number;
                /**
                 * Weekday number
                 */
                weekday?: number;
                /**
                 * Persian weekday name
                 */
                weekday_fa?: string;
            };
            /**
             * Count of offerings by kind
             */
            counts?: Record<string, number>;
            /**
             * Total offerings for this day
             */
            total?: number;
            /**
             * Whether any offerings exist
             */
            has_any?: boolean;
        }>;
        /**
         * Summary statistics
         */
        summary?: {
            /**
             * Total offerings across all days
             */
            total_registrable_offerings?: number;
            /**
             * Number of days with any offerings
             */
            days_with_any?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/calendar/',
            query: {
                'period': period,
                'date': date,
                'tz': tz,
                'kinds': kinds,
                'jdate': jdate,
            },
            errors: {
                400: `Bad request - invalid parameters`,
            },
        });
    }
}
