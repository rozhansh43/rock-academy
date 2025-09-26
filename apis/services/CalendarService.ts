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
     * - `date`: Anchor date for the calendar (ISO format or Jalali) - defaults to today
     * - `tz`: Timezone for the calendar - defaults to 'Asia/Tehran'
     * - `kinds`: Comma-separated list of offering kinds to include
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
     * - `/events/calendar/?period=month&date=1403/01/01`
     * - `/events/calendar/?period=week&kinds=class,workshop&tz=Asia/Tehran`
     *
     * @param period Calendar period to display
     * @param date Anchor date (ISO format or Jalali), defaults to today
     * @param tz Timezone for the calendar
     * @param kinds Comma-separated list of offering kinds to include
     * @returns any Calendar view of registrable offerings
     * @throws ApiError
     */
    public static eventsCalendarList(
        period?: 'day' | 'week' | 'month' | 'year',
        date?: string,
        tz?: string,
        kinds?: string,
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
            },
            errors: {
                400: `Bad request - invalid parameters`,
            },
        });
    }
}
