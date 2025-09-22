'use client';

import { FC } from 'react';
import { DashLayout } from './dash-layout';

const BaseLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DashLayout>{children}</DashLayout>;
};

export { BaseLayout };
