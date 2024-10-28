import type { ConsolaInstance } from 'consola';
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
  logger: ConsolaInstance,
): Promise<T | null> {
  const options = useSanctumOptions();

  const responseWrapper = options.userResponseWrapperKey || null;

  try {
    const fetchResponse = await fetchService<
      ResponseType<typeof responseWrapper>
    >(options.sanctumEndpoints.user);
    const user = extractNestedValue<T>(fetchResponse, responseWrapper);

    if (fetchResponse && !user) {
      logger.warn(
        'User data extraction failed.',
        `Please verify your \`userResponseWrapperKey\` in the configuration.`,
        `\nConfigured \`userResponseWrapperKey\`: ${responseWrapper}`,
        `\nReceived User API Response:`,
        fetchResponse,
      );
    }
    return user;
  } catch (error) {
    logger.debug('Failed to fetch authenticated user:', error);
    return null;
  }
}
