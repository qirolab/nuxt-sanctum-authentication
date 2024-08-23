import { useSanctumAuth } from '../composables/useSanctumAuth';
import { getOptions } from '../helpers';
import { defineNuxtRouteMiddleware, navigateTo, createError } from '#app';

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const options = getOptions();
  const { isLoggedIn } = useSanctumAuth();

  if (isLoggedIn.value && options.redirect.guestOnlyRedirect) {
    return navigateTo(options.redirect.guestOnlyRedirect, { replace: true });
  }

  if (isLoggedIn.value) {
    throw createError({ statusCode: 403 });
  }
});
