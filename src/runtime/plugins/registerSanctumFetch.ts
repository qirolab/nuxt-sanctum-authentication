import createFetch from '../client/createFetch';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (_nuxtApp) => {
  const $customFetch = createFetch();

  // Expose to useNuxtApp().$sanctumFetch
  return {
    provide: {
      sanctumFetch: $customFetch,
    },
  };
});
