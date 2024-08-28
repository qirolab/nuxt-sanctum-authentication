import createFetchService from './services/createFetchService';
import { useAuthUser } from './composables/useAuthUser';
import { createLogger } from './helpers/createLogger';
import { useSanctumOptions } from './composables/useSanctumOptions';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async () => {
  const options = useSanctumOptions();
  const user = useAuthUser();
  const logger = createLogger(options.logLevel);
  const fetchService = createFetchService(logger);

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
