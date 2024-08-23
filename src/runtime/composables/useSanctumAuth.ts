import { computed } from 'vue';
import { useSanctumUser } from './useSanctumUser';
import { getOptions, trimTrailingSlash } from '../helpers';
import { useSanctumFetch } from './useSanctumFetch';
import { navigateTo, useNuxtApp, useRoute } from '#app';
import { useTokenStorage } from './useTokenStorage';

export const useSanctumAuth = <T>() => {
  const options = getOptions();
  const nuxtApp = useNuxtApp();

  // Initialize fetch client and user state
  const client = useSanctumFetch();
  const user = useSanctumUser<T>();

  // Computed property for login status
  const isLoggedIn = computed(() => user.value !== null);

  // Refresh user function
  async function refreshUser() {
    user.value = await client<T>(options.sanctumEndpoints.user);
  }

  // Login function
  async function login(credentials: Record<string, any>) {
    const currentRoute = useRoute();
    const currentPath = trimTrailingSlash(currentRoute.path);

    const response = await client(options.sanctumEndpoints.login, {
      method: 'post',
      body: credentials,
    });

    if (options.authMode === 'token') {
      await useTokenStorage().set(response.token);
    }

    await refreshUser();

    if (options.redirect.enableIntendedRedirect) {
      const requestedRoute = currentRoute.query.redirect;
      if (requestedRoute && requestedRoute !== currentPath) {
        await nuxtApp.runWithContext(
          async () => await navigateTo(requestedRoute as string),
        );
        return;
      }
    }

    if (
      !options.redirect.redirectToAfterLogin ||
      currentRoute.path === options.redirect.redirectToAfterLogin
    ) {
      return;
    }

    await useNuxtApp().runWithContext(
      async () =>
        await navigateTo(options.redirect.redirectToAfterLogin as string),
    );
  }

  return {
    config: getOptions(),
    user,
    isLoggedIn,
    refreshUser,
    login,
  };
};
