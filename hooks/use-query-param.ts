import { useRouter, useSearchParams } from 'next/navigation';

export const useQueryParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const get = (key: string) => {
    return searchParams.get(key);
  };

  const set = (key: string, value: string) => {
    // Get the most current URL parameters to handle rapid successive calls
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  const remove = (key: string) => {
    // Get the most current URL parameters to handle rapid successive calls
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete(key);
    const queryString = currentParams.toString();
    router.push(queryString ? `?${queryString}` : window.location.pathname, {
      scroll: false,
    });
  };

  return {
    get,
    set,
    remove,
  };
};
