/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MeProfile } from '../models/MeProfile';
import type { SendOTPIn } from '../models/SendOTPIn';
import type { VerifyOTPIn } from '../models/VerifyOTPIn';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @returns MeProfile
     * @throws ApiError
     */
    public static authAccountsProfileRead(): CancelablePromise<MeProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/accounts/profile/',
        });
    }
    /**
     * @param data
     * @returns MeProfile
     * @throws ApiError
     */
    public static authAccountsProfileUpdate(
        data: MeProfile,
    ): CancelablePromise<MeProfile> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/auth/accounts/profile/',
            body: data,
        });
    }
    /**
     * @param data
     * @returns MeProfile
     * @throws ApiError
     */
    public static authAccountsProfilePartialUpdate(
        data: MeProfile,
    ): CancelablePromise<MeProfile> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/auth/accounts/profile/',
            body: data,
        });
    }
    /**
     * @param data
     * @returns SendOTPIn
     * @throws ApiError
     */
    public static authOtpSendCreate(
        data: SendOTPIn,
    ): CancelablePromise<SendOTPIn> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/otp/send/',
            body: data,
        });
    }
    /**
     * @param data
     * @returns VerifyOTPIn
     * @throws ApiError
     */
    public static authOtpVerifyCreate(
        data: VerifyOTPIn,
    ): CancelablePromise<VerifyOTPIn> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/otp/verify/',
            body: data,
        });
    }
}
