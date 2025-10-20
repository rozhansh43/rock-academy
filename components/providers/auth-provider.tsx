'use client';

import { useLayoutEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiCaller } from '@/apis/api-caller';
import { ApiError } from '@/apis';
import Image from 'next/image';
import { Button } from '../ui/button';
import { removeCookie } from '@/utils/cookies';
import { COOKIE_KEYS } from '@/utils/cookies';

const authRoutes = ['/login'];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isWaiting, setIsWaiting] = useState(true);

  const query = useQuery({
    retry: 0,
    queryKey: ['profile'],
    queryFn: () => apiCaller.auth.accounts.profile.get(),
  });
  const isAuthenticated = (query.error as ApiError)?.status !== 401;

  useLayoutEffect(() => {
    if (query.isLoading || query.isFetching) return;
    if (!isAuthenticated) {
      removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
      router.push('/login');
    } else if (isAuthenticated && authRoutes.includes(pathname)) {
      router.push('/');
    }
  }, [isAuthenticated, query.isLoading, query.isFetching]);

  useLayoutEffect(() => {
    if (!query.isLoading && !query.isFetching) {
      setTimeout(() => {
        setIsWaiting(false);
      }, 500);
    } else {
      setIsWaiting(true);
    }
  }, [query.isLoading, query.isFetching]);

  if (isWaiting)
    return (
      <div className="flex size-full flex-col items-center justify-between bg-white">
        <div className="relative -mt-20">
          <Image
            src="/images/bg-wait-1.webp"
            width={448}
            height={410}
            alt=""
            className="absolute -top-5"
          />
          <Image src="/images/bg-wait-2.webp" width={448} height={410} alt="" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-3">
          <Image src="/images/logo.webp" alt="logo" width={100} height={100} />
          {isAuthenticated && query.isError ? (
            <>
              <div className="text-dark-1 text-lg font-semibold">
                مشکلی بوجود آمده است!
              </div>
              <div className="text-dark-2 text-base">
                لطفا وضعیت اینترنت خود را بررسی کنید <br /> و یا چند دقیقه دیگر
                مجدد تلاش کنید.
              </div>
              <Button
                size="lg"
                className="mt-3"
                onClick={() => window.location.reload()}
              >
                تلاش مجدد
              </Button>
            </>
          ) : (
            <p className="text-4xl font-bold">
              <span className="text-primary">Rock </span>
              Academy
            </p>
          )}
        </div>
        <div className="flex-1" />
      </div>
    );

  return <>{children}</>;
};

export { AuthProvider };
