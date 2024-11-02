import type { $Fetch } from 'ofetch';
import { useSanctumOptions } from '../composables/useSanctumOptions';
import { extractNestedValue } from './utilities';

type ResponseType<T extends string | null> =
  T extends `${infer Key}.${infer Rest}`
    ? Record<Key, ResponseType<Rest>>
    : T extends string
      ? Record<T, any>
      : any;

export async function getAuthUser<T = any>(
  fetchService: $Fetch,
): Promise<T | null> {
  const options = useSanctumOptions();

  const responseWrapper = options.userResponseWrapperKey || null;

  const fetchResponse = await fetchService<
    ResponseType<typeof responseWrapper>
  >(options.sanctumEndpoints.user);

  return extractNestedValue<T>(fetchResponse, responseWrapper);
}
