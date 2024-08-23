import type { $Fetch } from 'ofetch';
import { useNuxtApp } from '#app';

/**
 * Returns the Sanctum fetch instance.
 *
 * @returns The Sanctum fetch instance.
 */
export const useSanctumFetch = () => {
  const { $sanctumFetch } = useNuxtApp();

  return $sanctumFetch as $Fetch;
};
