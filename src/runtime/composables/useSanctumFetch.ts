import type {
  $Fetch,
  FetchRequest,
  FetchOptions,
  MappedResponseType,
  ResponseType,
} from 'ofetch';
import { useNuxtApp } from '#app';

export const useSanctumFetch = <T = any, R extends ResponseType = 'json'>(
  request: FetchRequest,
  options?: FetchOptions<R>,
): Promise<MappedResponseType<R, T>> => {
  const { $sanctumFetch } = useNuxtApp();
  return ($sanctumFetch as $Fetch)<T, R>(request, options);
};
