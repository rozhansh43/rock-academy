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
    if (!query.isLoading && !query.isFetching) {
      setTimeout(() => {
        setIsWaiting(false);
      }, 500);
    } else {
      setIsWaiting(true);
    }
  }, [query.isLoading, query.isFetching]);

  useLayoutEffect(() => {
    if (isWaiting) return;
    if (!isAuthenticated) {
      removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
      router.push('/login');
    } else if (isAuthenticated && authRoutes.includes(pathname)) {
      router.push('/');
    }
  }, [isAuthenticated, isWaiting]);

  if (isWaiting)
    return (
      <div className="flex size-full items-center justify-center">
        <Image src="/images/logo.png" alt="logo" width={93.4} height={68.6} />
      </div>
    );

  // if (isAuthenticated && query.isError)
  //   return (
  //     <div className="dash-gradient flex size-full flex-col items-center justify-center gap-3">
  //       <div className="text-dark-1 text-lg font-semibold">
  //         مشکلی بوجود آمده است!
  //       </div>
  //       <div className="text-dark-2 text-base">
  //         لطفا وضعیت اینترنت خود را بررسی کنید <br /> و یا چند دقیقه دیگر مجدد
  //         تلاش کنید.
  //       </div>
  //       <Button
  //         size="lg"
  //         className="mt-3"
  //         onClick={() => window.location.reload()}
  //       >
  //         تلاش مجدد
  //       </Button>
  //     </div>
  //   );

  return <>{children}</>;
};

export { AuthProvider };
