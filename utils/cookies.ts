import Cookies from 'js-cookie';

import { isJsonString } from './strings';

enum COOKIE_KEYS {
  ACCESS_TOKEN = 'access_token',
}

const COOKIES_EXPIRE_TIME = 100;

const getCookie = <T = unknown>(key: COOKIE_KEYS): T | undefined => {
  const jsonValue = Cookies.get(key);
  if (jsonValue && isJsonString(jsonValue)) return JSON.parse(jsonValue) as T;
  return undefined;
};

const setCookie = (
  key: COOKIE_KEYS,
  value: unknown,
  options?: Cookies.CookieAttributes,
): void => {
  Cookies.set(key, JSON.stringify(value), {
    expires: COOKIES_EXPIRE_TIME,
    ...options,
  });
};

const removeCookie = (key: COOKIE_KEYS): void => {
  Cookies.remove(key);
};

export { COOKIE_KEYS, COOKIES_EXPIRE_TIME, getCookie, setCookie, removeCookie };
