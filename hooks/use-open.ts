'use client';

import { useRouter } from 'next/navigation';
import { useQueryParam } from './use-query-param';

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

  const queryParam = useQueryParam();

  const isOpen = queryParam.get(paramName) === openValue;

  const open = () => {
    queryParam.set(paramName, openValue);
    // router.push(`?${queryParam.params}`, { scroll: false });
  };

  const close = () => {
    queryParam.remove(paramName);
    // router.push(`?${queryParam.params}`, { scroll: false });
  };

  return {
    isOpen,
    open,
    close,
  };
};
