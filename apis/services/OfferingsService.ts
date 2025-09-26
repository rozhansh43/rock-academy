/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OfferingsService {
    /**
     * List offerings with filters
     *
     * Retrieve a paginated list of offerings with advanced filtering options.
     *
     * **Filtering Options:**
     * - `search`: Search in Persian and English names
     * - `kind`: Filter by offering type (class, event, workshop, salon)
     * - `salon`: Filter by salon IDs (can provide multiple values)
     * - `semester`: Filter by semester number
     * - `is_online`: Filter by online/offline status
     * - `price_min`/`price_max`: Price range filtering
     * - `reg_from`/`reg_to`: Registration date range (ISO or Jalali format)
     * - `reg_from_j`/`reg_to_j`: Registration date range (Jalali format)
     * - `reg_mode`: How to handle registration date filtering (cover/overlap)
     * - `op`: How to combine multiple filters (and/or)
     * - `ordering`: Sort results by various fields
     *
     * **Examples:**
     * - `/events/?search=guitar&kind=class&is_online=true`
     * - `/events/?price_min=100000&price_max=500000&ordering=price`
     * - `/events/?salon=1,2,3&reg_from_j=1403/01/01&reg_to_j=1403/12/29`
     *
     * @param page یک شماره صفحه‌ در مجموعه نتایج صفحه‌بندی شده.
     * @param search Search in Persian and English names
     * @param kind Filter by offering kind
     * @param salon Filter by salon IDs (comma-separated)
     * @param semester Filter by semester number
     * @param isOnline Filter by online/offline status
     * @param priceMin Minimum price filter
     * @param priceMax Maximum price filter
     * @param regFrom Registration start date (ISO format or Jalali)
     * @param regTo Registration end date (ISO format or Jalali)
     * @param regMode Registration date filtering mode
     * @param regFromJ Registration start date (Jalali format)
     * @param regToJ Registration end date (Jalali format)
     * @param op How to combine multiple filters
     * @param ordering Sort results by field
     * @returns any List of offerings
     * @throws ApiError
     */
    public static eventsList(
        page?: number,
        search?: string,
        kind?: 'class' | 'event' | 'workshop' | 'salon',
        salon?: Array<number>,
        semester?: number,
        isOnline?: boolean,
        priceMin?: number,
        priceMax?: number,
        regFrom?: string,
        regTo?: string,
        regMode?: 'cover' | 'overlap',
        regFromJ?: string,
        regToJ?: string,
        op?: 'and' | 'or',
        ordering?: 'price' | '-price' | 'semester' | '-semester' | 'salon' | '-salon' | 'start_date' | '-start_date' | 'end_time' | '-end_time',
    ): CancelablePromise<{
        /**
         * Total number of results
         */
        count?: number;
        /**
         * URL to next page
         */
        next?: string;
        /**
         * URL to previous page
         */
        previous?: string;
        results?: Array<{
            id?: number;
            persian_name?: string;
            english_name?: string;
            kind?: string;
            description?: string;
            price?: number;
            capacity?: number;
            semester?: number;
            salon?: {
                id?: number;
                name?: string;
            };
            is_recurring?: boolean;
            weekdays?: Array<number>;
            start_time?: string;
            end_time?: string;
            start_date?: string;
            end_date?: string;
            start_registration_date?: string;
            end_registration_date?: string;
            repeat_every_n_weeks?: number;
            /**
             * 1 if registration is active, 0 otherwise
             */
            registration_active?: number;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/',
            query: {
                'page': page,
                'search': search,
                'kind': kind,
                'salon': salon,
                'semester': semester,
                'is_online': isOnline,
                'price_min': priceMin,
                'price_max': priceMax,
                'reg_from': regFrom,
                'reg_to': regTo,
                'reg_mode': regMode,
                'reg_from_j': regFromJ,
                'reg_to_j': regToJ,
                'op': op,
                'ordering': ordering,
            },
            errors: {
                400: `Bad request - invalid filter parameters`,
            },
        });
    }
    /**
     * Get offering details
     *
     * Retrieve detailed information about a specific offering by its ID.
     *
     * **Response includes:**
     * - Basic offering information (Persian/English names, description, price, capacity)
     * - Offering kind and semester information
     * - Salon details (name and ID)
     * - Schedule information (weekdays, time range, dates)
     * - Session count and details
     * - Formatted Persian weekday names
     * - Jalali date formatting for start/end dates
     *
     * @param id
     * @returns any Offering details
     * @throws ApiError
     */
    public static eventsRead(
        id: string,
    ): CancelablePromise<{
        /**
         * Offering ID
         */
        id?: number;
        /**
         * Persian name
         */
        persian_name?: string;
        /**
         * English name
         */
        english_name?: string;
        /**
         * Offering kind
         */
        kind?: string;
        /**
         * Description
         */
        description?: string;
        /**
         * Price
         */
        price?: number;
        /**
         * Capacity
         */
        capacity?: number;
        /**
         * Persian weekday names
         */
        weekdays_fa?: Array<string>;
        /**
         * Number of sessions
         */
        sessions_count?: number;
        /**
         * Time range
         */
        time_range?: {
            /**
             * Start time (HH:MM)
             */
            from?: string;
            /**
             * End time (HH:MM)
             */
            to?: string;
        };
        /**
         * Salon name
         */
        salon_name?: string;
        /**
         * Start date (Jalali format)
         */
        start_date?: string;
        /**
         * End date (Jalali format)
         */
        end_date?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{id}/',
            path: {
                'id': id,
            },
            errors: {
                404: `Offering not found`,
            },
        });
    }
}
