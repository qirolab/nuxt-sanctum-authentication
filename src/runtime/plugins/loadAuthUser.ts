import { FetchError } from 'ofetch';
import createFetch from '../client/createFetch';
import { createLogger, getOptions } from '../helpers';
import { useSanctumUser } from '../composables/useSanctumUser';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (_nuxtApp) => {
  const { sanctumEndpoints, logLevel } = getOptions();
  const $customFetch = createFetch();
  const user = useSanctumUser();
  const logger = createLogger(logLevel);

  if (!user.value) {
    try {
      user.value = await $customFetch(sanctumEndpoints.user);
    } catch (error) {
      if (error instanceof FetchError) {
        handleFetchError(error);
      } else {
        logger.error('Failed to load user identity from API.', error);
      }
    }
  }

  function handleFetchError(error: FetchError) {
    if (error.response && [401, 419].includes(error.response.status)) {
      logger.debug(
        `User authentication failed during plugin initialization with status code ${error.response.status}.`,
      );
    } else {
      logger.error(
        `An unexpected error occurred while fetching the user's identity.`,
        error,
      );
    }
  }
});
