import type { $Fetch } from 'ofetch';
import { useNuxtApp } from '#app';

export const useSanctumFetch = (): $Fetch => {
  const { $sanctumFetch } = useNuxtApp();

  return $sanctumFetch as $Fetch;
};
