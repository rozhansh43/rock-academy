'use client';

import { UseQueryStateOptions, useQueryState } from 'nuqs';

export const useOpen = (
  id: string,
  comp = 'dialog',
  queryStateOptions?: UseQueryStateOptions<string>,
) => {
  const compId = `${comp}-${id}`;
  const [queryParam, setQueryParam] = useQueryState(compId, {
    history: 'push',
    ...queryStateOptions,
  });

  const isOpen = queryParam === 'open';

  const open = () => {
    setQueryParam('open');
  };

  const close = () => {
    setQueryParam(null, { history: 'replace' });
  };

  return {
    isOpen,
    open,
    close,
  };
};
