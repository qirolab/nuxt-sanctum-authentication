import type { RouteLocationRaw } from 'vue-router';
import { useSanctum } from '../composables/useSanctum';
import { useSanctumOptions } from '../composables/useSanctumOptions';
import { defineNuxtRouteMiddleware, navigateTo, createError } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useSanctum();
  if (isLoggedIn.value) {
    return;
  }

  const options = useSanctumOptions();
  const loginPath = options.redirect.loginPath;

  if (!isLoggedIn.value && loginPath) {
    const redirect: RouteLocationRaw = { path: loginPath };

    if (options.redirect.enableIntendedRedirect) {
      redirect.query = { redirect: to.fullPath };
    }

    return navigateTo(redirect, { replace: true });
  }

  throw createError({ statusCode: 403 });
});
