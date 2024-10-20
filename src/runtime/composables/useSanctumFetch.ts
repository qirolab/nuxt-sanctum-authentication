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

  const moduleOptions = useSanctumOptions();
  const logger = createLogger(moduleOptions.logLevel);
  const serviceOptions: FetchOptions = {};

  if (options?.onRequest) {
    serviceOptions['onRequest'] = options.onRequest;
    delete options.onRequest;
  }
  if (options?.onResponseError) {
    serviceOptions['onResponseError'] = options.onResponseError;
    delete options.onResponseError;
  }

  const fetchService: $Fetch = createFetchService(serviceOptions, logger);

  return fetchService(request, options);
};
