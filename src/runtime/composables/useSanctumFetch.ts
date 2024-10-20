import type {
  $Fetch,
  FetchRequest,
  FetchOptions,
  MappedResponseType,
  ResponseType,
} from 'ofetch';
import createFetchService from '../services/createFetchService';
import { createLogger } from '../helpers/createLogger';
import { useSanctumOptions } from './useSanctumOptions';
// import { useNuxtApp } from '#app';

export const useSanctumFetch = <T = any, R extends ResponseType = 'json'>(
  request: FetchRequest,
  options?: FetchOptions<R>,
): Promise<MappedResponseType<R, T>> => {
  // const { $sanctumFetch } = useNuxtApp();
  // return ($sanctumFetch as $Fetch)<T, R>(request, options);

  const { logLevel } = useSanctumOptions();
  const logger = createLogger(logLevel);

  // Extract onRequest and onResponseError from options
  const { onRequest, onResponseError, ...otherOptions } = options || {};

  // Pass only the necessary options to the fetch service
  const fetchServiceOptions: FetchOptions = {
    ...(onRequest && { onRequest }),
    ...(onResponseError && { onResponseError }),
  };

  const fetchService: $Fetch = createFetchService(fetchServiceOptions, logger);

  return fetchService(request, otherOptions);
};
