import type { $Fetch } from 'ofetch';
import createFetchService from './services/createFetchService';
import { useCurrentUser } from './composables/useCurrentUser';
import { createLogger } from './helpers/createLogger';
import { useSanctumOptions } from './composables/useSanctumOptions';
import { getAuthUser } from './helpers/get-auth-user';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async () => {
  const options = useSanctumOptions();
  const user = useCurrentUser();
  const logger = createLogger(options.logLevel);
  const fetchService: $Fetch = createFetchService({}, logger);

  if (!user.value) {
    try {
      user.value = await getAuthUser(fetchService);
    } catch (error) {
      logger.debug('Failed to fetch authenticated user:', error);
    }
  }

  return {
    provide: {
      sanctumFetch: fetchService,
    },
  };
});
