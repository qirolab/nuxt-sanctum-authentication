import type { FetchContext } from 'ofetch';
import { createLogger, getOptions } from '../helpers';
import { useTokenStorage } from '../composables/useTokenStorage';
import {
  useCookie,
  useRequestHeaders,
  useRequestURL,
  type NuxtApp,
} from '#app';
import type { ModuleOptions } from '~/src/types/ModuleOptions';

// Constants
const SECURE_METHODS = new Set(['post', 'delete', 'put', 'patch']);

/**
 * Builds the server headers for the request.
 *
 * @param headers - The headers to be used for the request.
 * @param config - The module configuration.
 * @returns The server headers.
 */
function buildServerHeaders(
  headers: HeadersInit | undefined,
  config: ModuleOptions,
): HeadersInit {
  const clientCookies = useRequestHeaders(['cookie']);
  const origin = config.appOriginUrl ?? useRequestURL().origin;

  return {
    ...headers,
    Referer: origin,
    Origin: origin,
    ...(clientCookies.cookie && clientCookies),
  };
}

/**
 * Initializes the CSRF cookie by making a request to the CSRF endpoint.
 *
 * @param config - The module configuration options.
 */
async function initCsrfCookie(config: ModuleOptions): Promise<void> {
  await $fetch(config.sanctumEndpoints.csrf, {
    baseURL: config.apiUrl,
    credentials: 'include',
  });
}

/**
 * Adds the CSRF token to the headers if it exists.
 *
 * @param headers - The headers to add the CSRF token to.
 * @param config - The module configuration.
 * @returns The headers with the CSRF token added.
 */
async function useCsrfHeader(
  headers: HeadersInit | undefined,
  config: ModuleOptions,
): Promise<HeadersInit> {
  let csrfToken = useCookie(config.csrf.cookieName, { readonly: true });

  if (!csrfToken.value) {
    await initCsrfCookie(config);
    csrfToken = useCookie(config.csrf.cookieName, { readonly: true });
  }

  const logger = createLogger();

  if (!csrfToken.value) {
    logger.warn(
      `${config.csrf.cookieName} cookie is missing, unable to set ${config.csrf.headerName} header`,
    );

    return headers as HeadersInit;
  }

  logger.debug(`Added ${config.csrf.headerName} header to pass to the API`);

  return {
    ...headers,
    ...(csrfToken.value && {
      [config.csrf.headerName]: csrfToken.value,
    }),
  };
}

/**
 * Handles the request and sets up the necessary headers and options.
 *
 * @param {FetchContext} ctx - The FetchContext object.
 */
export default async function onRequestHandler(
  ctx: FetchContext,
  nuxtApp: NuxtApp,
) {
  const method = ctx.options.method?.toLowerCase() ?? 'get';

  // Default headers
  ctx.options.headers = {
    Accept: 'application/json',
    Referer: origin,
    Origin: origin,
    ...ctx.options.headers,
  };

  // Handle form data
  if (method !== 'get' && ctx.options.body instanceof FormData) {
    ctx.options.method = 'POST';
    ctx.options.body.append('_method', method);
  }

  // Configuration
  const options = getOptions();

  // Cookie Auth Mode
  if (options.authMode === 'cookie') {
    if (import.meta.server) {
      ctx.options.headers = buildServerHeaders(ctx.options.headers, options);
    }
    if (SECURE_METHODS.has(method)) {
      ctx.options.headers = await useCsrfHeader(ctx.options.headers, options);
    }
  }

  // Token Auth Mode
  if (options.authMode === 'token') {
    const token = await useTokenStorage(nuxtApp).get();

    if (token) {
      ctx.options.headers = {
        ...ctx.options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
}
