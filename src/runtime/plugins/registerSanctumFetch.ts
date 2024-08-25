import createFetch from '../client/createFetch';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (_nuxtApp) => {
  const $customFetch = createFetch(_nuxtApp);

  // Expose to useNuxtApp().$sanctumFetch
  return {
    provide: {
      sanctumFetch: $customFetch,
    },
  };
});
