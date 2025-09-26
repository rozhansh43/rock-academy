/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MeProfile = {
    readonly id?: number;
    /**
     * e.g. +989121234567
     */
    readonly phone?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    national_id?: string | null;
    birth_date?: string | null;
    gender?: MeProfile.gender;
    referrer_phone?: string;
    readonly avatar?: string | null;
    readonly role?: MeProfile.role;
    readonly is_profile_complete?: string;
};
export namespace MeProfile {
    export enum gender {
        MALE = 'male',
        FEMALE = 'female',
        UNKNOWN = 'unknown',
    }
    export enum role {
        COMMON = 'common',
        VIP = 'vip',
    }
}

