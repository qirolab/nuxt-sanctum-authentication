import type { $Fetch } from 'ofetch';
import createFetchService from './services/createFetchService';
import { useCurrentUser } from './composables/useCurrentUser';
import { createLogger } from './helpers/createLogger';
import { useSanctumOptions } from './composables/useSanctumOptions';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async () => {
  const options = useSanctumOptions();
  const user = useCurrentUser();
  const logger = createLogger(options.logLevel);
  const fetchService: $Fetch = createFetchService(logger);

  if (!user.value) {
    try {
      user.value = await fetchService(options.sanctumEndpoints.user);
    } catch (error) {
      console.debug(error);
    }
  }

  return {
    provide: {
      sanctumFetch: fetchService,
    },
  };
});
