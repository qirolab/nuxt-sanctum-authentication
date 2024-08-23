import type { RouteLocationRaw } from 'vue-router';
import { useSanctumAuth } from '../composables/useSanctumAuth';
import { getOptions, trimTrailingSlash } from '../helpers';
import { defineNuxtRouteMiddleware, navigateTo, createError } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useSanctumAuth();
  if (isLoggedIn.value) {
    return;
  }

  const options = getOptions();
  const loginPath = options.redirect.loginPath;

  if (!isLoggedIn.value && loginPath) {
    const redirect: RouteLocationRaw = { path: loginPath };

    if (options.redirect.enableIntendedRedirect) {
      redirect.query = { redirect: trimTrailingSlash(to.fullPath) };
    }

    return navigateTo(redirect, { replace: true });
  }

  throw createError({ statusCode: 403 });
});
