'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useSyncedUrlState<T extends string>(
  key: string,
  defaultValue: T,
  options?: { validValues?: T[] }
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramValue = searchParams.get(key) as T | null;

  const initial = options?.validValues?.includes(paramValue as T)
    ? paramValue!
    : defaultValue;

  const [value, setValue] = useState<T>(initial);



  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    router.replace(url.toString(), { scroll: false });
  }, [key, value, router]);

  return [value, setValue] as const;
}
