'use client';
import { FC } from 'react';
import Image from 'next/image';

export const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex size-full flex-col items-center bg-linear-8 bg-gradient-to-t from-orange-100 from-[53.7%] to-orange-200 to-[97.64%] py-8">
      <header className="">
        <Image src="/images/logo.png" alt="logo" width={93.4} height={68.6} />
      </header>
      <main className="container-main mx-auto size-full flex-1">
        {children}
      </main>
    </div>
  );
};
