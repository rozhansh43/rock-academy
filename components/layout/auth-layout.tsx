'use client';
import { FC } from 'react';

export const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="size-full bg-white">{children}</div>;
};
