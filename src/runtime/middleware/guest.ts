import { useSanctum } from '../composables/useSanctum';
import { useSanctumOptions } from '../composables/useSanctumOptions';
import { defineNuxtRouteMiddleware, navigateTo, createError } from '#app';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isLoggedIn } = useSanctum();
  const { redirect } = useSanctumOptions();

  if (!isLoggedIn.value) return;

  const { enableIntendedRedirect, guestOnlyRedirect } = redirect;

  if (enableIntendedRedirect) {
    const currentPath = to.path;
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
