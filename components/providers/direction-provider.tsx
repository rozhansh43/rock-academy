'use client';

import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import { FC } from 'react';

const DirectionProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RadixDirectionProvider dir="rtl">{children}</RadixDirectionProvider>;
};

export { DirectionProvider };
