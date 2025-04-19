import type {
  FetchRequest,
  FetchOptions,
  MappedResponseType,
  ResponseType,
} from 'ofetch';

export const useApiFetch = <T = any, R extends ResponseType = 'json'>(
  request: FetchRequest,
  options?: FetchOptions<R>,
): Promise<MappedResponseType<R, T>> => {
  return useSanctumFetch(request, {
    headers: {
      'custom-header': 'value',
    },
    ...options,
  });
};
