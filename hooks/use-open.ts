'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface UseOpenOptions {
  /**
   * The search parameter name to use for the open state
   * @default 'open'
   */
  paramName?: string;
  /**
   * The value to set when opening
   * @default 'true'
   */
  openValue?: string;
}

export const useOpen = (options: UseOpenOptions = {}) => {
  const { paramName = 'open', openValue = 'true' } = options;

  const router = useRouter();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get(paramName) === openValue;

  const open = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, openValue);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams, paramName, openValue]);

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramName);
    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : window.location.pathname, {
      scroll: false,
    });
  }, [router, searchParams, paramName]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
