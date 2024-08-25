import { useSanctumAuth } from '../composables/useSanctumAuth';
import { getOptions, trimTrailingSlash } from '../helpers';
import { defineNuxtRouteMiddleware, navigateTo, createError } from '#app';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isLoggedIn } = useSanctumAuth();
  const { redirect } = getOptions();

  if (!isLoggedIn.value) return;

  const { enableIntendedRedirect, guestOnlyRedirect } = redirect;

  if (enableIntendedRedirect) {
    const currentPath = trimTrailingSlash(to.path);
    const requestedRoute = to.query.redirect as string;

    if (requestedRoute && requestedRoute !== currentPath) {
      return navigateTo(requestedRoute);
    }
  }

  if (guestOnlyRedirect) {
    return navigateTo(guestOnlyRedirect, { replace: true });
  }

  throw createError({ statusCode: 403 });
});
