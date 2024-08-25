import { FetchError } from 'ofetch';
import { createLogger, getOptions } from './helpers';
import createFetchService from './client/createFetchService';
import { defineNuxtPlugin } from '#app';
import { useSanctumUser } from '#imports';

export default defineNuxtPlugin(async (_nuxtApp) => {
  const { sanctumEndpoints, logLevel } = getOptions();
  const logger = createLogger(logLevel);
  const fetchService = createFetchService(_nuxtApp);

  const ensureUser = async () => {
    if (!useSanctumUser().value) {
      try {
        useSanctumUser().value = await fetchService(sanctumEndpoints.user);
      } catch (error) {
        if (error instanceof FetchError) {
          await handleFetchError(error);
        } else {
          logger.error('Failed to load user identity from API.', error);
        }
      }
    }
  };

  const handleFetchError = async (error: FetchError) => {
    if (error.response && error.response.status === 401) {
      logger.debug(
        `User authentication failed with status code ${error.response.status}.`,
      );
    } else if (error.response && error.response.status === 419) {
      logger.debug(
        `User session expired with status code ${error.response.status}.`,
      );
    } else {
      logger.error(
        `An unexpected error occurred while fetching the user's identity.`,
        error,
      );
    }
  };

  await ensureUser();

  return {
    provide: {
      sanctumFetch: fetchService,
    },
  };
});
