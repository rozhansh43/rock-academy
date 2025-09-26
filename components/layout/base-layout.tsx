'use client';

import { FC } from 'react';

const BaseLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mx-auto size-full max-w-md">{children}</div>;
};

export { BaseLayout };
