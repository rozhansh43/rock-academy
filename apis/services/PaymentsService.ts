/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentsService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static paymentsPaymentsCallbackList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/payments/payments/callback/',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static paymentsPaymentsStartCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payments/payments/start/',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static paymentsPaymentsValidateDiscountCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/payments/payments/validate-discount/',
        });
    }
}
