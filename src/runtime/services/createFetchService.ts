import type { $Fetch, FetchOptions, FetchContext } from 'ofetch';
import type { ConsolaInstance } from 'consola';
import { useSanctumOptions } from '../composables/useSanctumOptions';
import type { ModuleOptions } from '../types/ModuleOptions';
import { useTokenStorage } from '../composables/useTokenStorage';
import { useCurrentUser } from '../composables/useCurrentUser';
import { useCookie, useNuxtApp, useRequestHeaders, useRequestURL } from '#app';

/**
 * Fetch and initialize the CSRF cookie required for making secure requests.
 *
 * @param {ModuleOptions} config - The module configuration options.
 * @param {ConsolaInstance} logger - The Consola logger instance for logging messages.
 * @returns {Promise<void>} Resolves when the CSRF cookie is successfully initialized.
 */
const fetchCsrfCookie = async (
  config: ModuleOptions,
  logger: ConsolaInstance,
): Promise<void> => {
  try {
    await $fetch(config.sanctumEndpoints.csrf, {
      baseURL: config.apiUrl,
      credentials: 'include',
    });
    logger.debug('CSRF cookie has been initialized');
  } catch (error) {
    logger.error('Failed to initialize CSRF cookie', error);
  }
};

/**
 * Attach the CSRF header to the request headers if the CSRF token is available.
 *
 * @param {HeadersInit | undefined} headers - The existing request headers.
 * @param {ModuleOptions} config - The module configuration options.
 * @param {ConsolaInstance} logger - The Consola logger instance for logging messages.
 * @returns {Promise<HeadersInit>} The updated headers with the CSRF header attached if available.
 */
const attachCsrfHeader = async (
  headers: HeadersInit | undefined,
  config: ModuleOptions,
  logger: ConsolaInstance,
): Promise<HeadersInit> => {
  let csrfToken = useCookie(config.csrf.cookieName, { readonly: true });

  if (!csrfToken.value) {
    await fetchCsrfCookie(config, logger);
    csrfToken = useCookie(config.csrf.cookieName, { readonly: true });
  }

  if (!csrfToken.value) {
    logger.warn(
      `${config.csrf.cookieName} cookie is missing, unable to set ${config.csrf.headerName} header`,
    );
    return headers ?? {};
  }

  logger.debug(`Added ${config.csrf.headerName} header to the request`);
  return {
    ...headers,
    [config.csrf.headerName]: csrfToken.value,
  };
};

/**
 * Generate server-side headers including cookies and the origin information.
 *
 * @param {HeadersInit | undefined} headers - The existing request headers.
 * @param {ModuleOptions} config - The module configuration options.
 * @returns {HeadersInit} The generated headers for server-side requests.
 */
const generateServerHeaders = (
  headers: HeadersInit | undefined,
  config: ModuleOptions,
): HeadersInit => {
  const clientCookies = useRequestHeaders(['cookie']);
  const origin = config.appOriginUrl ?? useRequestURL().origin;

  return {
    ...headers,
    Referer: origin,
    Origin: origin,
    ...clientCookies,
  };
};

/**
 * Add the authentication token to the request headers if it exists in storage.
 *
 * @param {HeadersInit} headers - The existing request headers.
 * @param {ConsolaInstance} logger - The Consola logger instance for logging messages.
 * @returns {Promise<HeadersInit>} The updated headers with the authentication token attached if available.
 */
const retrieveAndAttachToken = async (
  headers: HeadersInit,
  logger: ConsolaInstance,
): Promise<HeadersInit> => {
  const nuxtApp = useNuxtApp();
  const token = await useTokenStorage(nuxtApp).get();

  if (!token) {
    logger.debug('Authentication token is not set in the storage');
    return headers;
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Handle authentication for the request based on the configured authentication mode.
 *
 * @param {FetchContext} context - The fetch context, including request options and headers.
 * @param {ModuleOptions} config - The module configuration options.
 * @param {ConsolaInstance} logger - The Consola logger instance for logging messages.
 * @returns {Promise<void>} Resolves when the request headers have been processed.
 */
const processRequestAuth = async (
  context: FetchContext,
  config: ModuleOptions,
  logger: ConsolaInstance,
): Promise<void> => {
  const method = context.options.method?.toLowerCase() ?? 'get';

  // Ensure headers are of type Headers
  context.options.headers = new Headers({
    Accept: 'application/json',
    ...(context.options.headers instanceof Headers
      ? Object.fromEntries(context.options.headers.entries())
      : context.options.headers),
  });

  if (context.options.body instanceof FormData) {
    context.options.method = 'POST';
    context.options.body.append('_method', method.toUpperCase());
  }

  if (config.authMode === 'cookie') {
    const SECURE_METHODS = new Set(['post', 'delete', 'put', 'patch']);

    if (import.meta.server) {
      context.options.headers = new Headers(
        generateServerHeaders(
          Object.fromEntries(context.options.headers.entries()),
          config,
        ),
      );
    }

    if (SECURE_METHODS.has(method)) {
      context.options.headers = new Headers(
        await attachCsrfHeader(
          Object.fromEntries(context.options.headers.entries()),
          config,
          logger,
        ),
      );
    }
  } else if (config.authMode === 'token') {
    context.options.headers = new Headers(
      await retrieveAndAttachToken(
        Object.fromEntries(context.options.headers.entries()),
        logger,
      ),
    );
  }
};

/**
 * Get the appropriate credentials mode for the fetch request based on browser support.
 *
 * @returns {RequestCredentials | undefined} The credentials mode ('include' if supported, undefined otherwise).
 */
const getCredentialsMode = (): RequestCredentials | undefined => {
  return 'credentials' in Request.prototype ? 'include' : undefined;
};

/**
 * Create and configure a new fetch service instance with the Sanctum module's settings.
 *
 * @param {FetchOptions} options
 * @param {ConsolaInstance} logger - The Consola logger instance for logging messages.
 * @returns {$Fetch} A configured fetch service instance ready for making API requests.
 */
export default function createFetchService(
  options: FetchOptions,
  logger: ConsolaInstance,
): $Fetch {
  const config = useSanctumOptions();

  const httpOptions: FetchOptions = {
    baseURL: config.apiUrl,
    credentials: getCredentialsMode(),
    redirect: 'manual',
    retry: false,

    onRequest: async (context: FetchContext): Promise<void> => {
      // Handle options.onRequest as MaybeArray
      if (options.onRequest) {
        if (Array.isArray(options.onRequest)) {
          for (const hook of options.onRequest) {
            await hook(context);
          }
        } else {
          await options.onRequest(context);
        }
      }

      await processRequestAuth(context, config, logger);
    },

    onResponseError: async (context): Promise<void> => {
      if (context.response.status === 419) {
        logger.warn('CSRF token mismatch');
      } else if (context.response.status === 401) {
        const user = useCurrentUser();
        if (user.value !== null) {
          user.value = null;
        }
      }

      // Handle options.onResponseError as MaybeArray
      if (options.onResponseError) {
        if (Array.isArray(options.onResponseError)) {
          for (const hook of options.onResponseError) {
            await hook(context);
          }
        } else {
          await options.onResponseError(context);
        }
      }
    },
  };

  return $fetch.create(httpOptions) as $Fetch;
}
