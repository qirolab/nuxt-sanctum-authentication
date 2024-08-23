import type { FetchOptions, FetchContext } from 'ofetch';
import type { ModuleOptions } from '../../types/ModuleOptions';
import { createLogger, getOptions } from '../helpers';
import { useSanctumUser } from '../composables/useSanctumUser';
import onRequestHandler from './onRequestHandler';
import { useNuxtApp } from '#app';

function buildFetchOptions(config: ModuleOptions): FetchOptions {
  /**
   * Check if the browser supports the "credentials" option in the Fetch API.
   */
  const isCredentialsSupported = 'credentials' in Request.prototype;

  /**
   * The default fetch options.
   */
  const options: FetchOptions = {
    baseURL: config.apiUrl,
    redirect: 'manual',
    retry: config.fetchClientOptions.retryAttempts,
  };

  /**
   * If the auth mode is set to "cookie", set the credentials mode to "include" if the browser supports it.
   */
  if (config.authMode === 'cookie') {
    options.credentials = isCredentialsSupported ? 'include' : undefined;
  }

  return options;
}

export default function createFetch() {
  const nuxtApp = useNuxtApp();
  const options = getOptions();
  const user = useSanctumUser();

  const logger = createLogger(options.logLevel);

  return $fetch.create({
    ...buildFetchOptions(options),

    async onRequest(context: FetchContext): Promise<void> {
      await nuxtApp.runWithContext(async () => {
        await onRequestHandler(context);
      });
    },

    async onResponseError({ response }): Promise<void> {
      if (response.status === 419) {
        logger.warn('CSRF token mismatch');
        return;
      }

      if (response.status === 401) {
        if (user.value !== null) {
          user.value = null;
        }
      }
    },
  });
}
