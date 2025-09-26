import { AuthService, CalendarService, OfferingsService } from '.';

export const apiCaller = {
  auth: {
    accounts: {
      profile: {
        get: AuthService.authAccountsProfileRead,
        put: AuthService.authAccountsProfileUpdate,
        patch: AuthService.authAccountsProfilePartialUpdate,
      },
    },
    otp: {
      send: {
        post: AuthService.authOtpSendCreate,
      },
      verify: {
        post: AuthService.authOtpVerifyCreate,
      },
    },
  },
  offerings: {
    events: {
      get: OfferingsService.eventsList,
      $id: {
        get: OfferingsService.eventsRead,
      },
    },
  },
  calendar: {
    events: {
      calendar: {
        get: CalendarService.eventsCalendarList,
      },
    },
  },
};
