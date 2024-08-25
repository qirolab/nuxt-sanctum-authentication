import { useSanctumAuth } from '../composables/useSanctumAuth';
import { getOptions, trimTrailingSlash } from '../helpers';
import {
  defineNuxtRouteMiddleware,
  navigateTo,
  createError,
  useRoute,
} from '#app';

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { isLoggedIn } = useSanctumAuth();
  const options = getOptions();

  if (!isLoggedIn.value) return;

  if (options.redirect.enableIntendedRedirect) {
    const currentRoute = useRoute();
    const currentPath = trimTrailingSlash(currentRoute.path);

    const requestedRoute = currentRoute.query.redirect as string;

    if (requestedRoute && requestedRoute !== currentPath) {
      return navigateTo(requestedRoute);
    }
  }

  if (options.redirect.guestOnlyRedirect) {
    return navigateTo(options.redirect.guestOnlyRedirect, { replace: true });
  }

  throw createError({ statusCode: 403 });
});
