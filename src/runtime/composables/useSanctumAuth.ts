import { computed } from 'vue';
import { useSanctumFetch } from './useSanctumFetch';
import { useSanctumOptions } from './useSanctumOptions';
import { useAuthUser } from './useAuthUser';
import { useTokenStorage } from './useTokenStorage';
import { navigateTo, useNuxtApp, useRoute } from '#app';

export const useSanctumAuth = <T>() => {
  const nuxtApp = useNuxtApp();
  const options = useSanctumOptions();
  const user = useAuthUser<T>();
  const client = useSanctumFetch();

  const isLoggedIn = computed(() => {
    return user.value !== null;
  });

  async function refreshUser() {
    user.value = await client<T>(options.sanctumEndpoints.user);
  }

  async function login(credentials: Record<string, any>) {
    const { redirect, authMode, sanctumEndpoints } = options;
    const currentRoute = useRoute();

    if (isLoggedIn.value) {
      // Already logged in, check for redirect
      if (
        !redirect.redirectToAfterLogin ||
        redirect.redirectToAfterLogin === currentRoute.path
      ) {
        return;
      }

      return await navigateTo(redirect.redirectToAfterLogin);
    }

    const response = await client<{ token: string }>(sanctumEndpoints.login, {
      method: 'post',
      body: credentials,
    });

    // Handle token or cookie auth
    if (authMode === 'token') {
      await useTokenStorage(nuxtApp).set(response.token);
    }

    await refreshUser();

    // Handle intended redirect
    if (redirect.enableIntendedRedirect) {
      const requestedRoute = currentRoute.query.redirect;
      if (requestedRoute && requestedRoute !== currentRoute.path) {
        return await navigateTo(requestedRoute as string);
      }
    }

    // No intended redirect, check for default redirect
    if (
      !redirect.redirectToAfterLogin ||
      currentRoute.path === redirect.redirectToAfterLogin
    ) {
      return;
    }

    return await navigateTo(redirect.redirectToAfterLogin);
  }

  async function logout(): Promise<void> {
    if (!isLoggedIn.value) {
      return;
    }

    await client(options.sanctumEndpoints.logout, { method: 'post' });

    user.value = null;

    if (options.authMode === 'token') {
      await useTokenStorage(nuxtApp).set(undefined);
    }

    const currentPath = useRoute().path;
    if (
      !options.redirect.redirectToAfterLogout ||
      currentPath === options.redirect.redirectToAfterLogout
    ) {
      return;
    }

    await navigateTo(options.redirect.redirectToAfterLogout as string);
  }

  return {
    options,
    user,
    isLoggedIn,
    refreshUser,
    login,
    logout,
  };
};
