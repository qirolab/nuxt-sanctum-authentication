import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  useLogger,
  addImportsDir,
  addRouteMiddleware,
} from '@nuxt/kit';
import defu from 'defu';
import { MODULE_CONFIG_KEY, MODULE_NAME } from './runtime/helpers/module-info';
import type { ModuleOptions } from './runtime/types/ModuleOptions';
import type { DeepPartial } from './runtime/types';

export default defineNuxtModule<DeepPartial<ModuleOptions>>({
  meta: {
    name: MODULE_NAME,
    configKey: MODULE_CONFIG_KEY,
  },

  defaults: {
    authMode: 'cookie',
    userStateKey: 'sanctum.authenticated.user',
    token: {
      storageKey: 'AUTH_TOKEN',
      provider: 'cookie',
      responseKey: 'token',
    },
    fetchClientOptions: {
      retryAttempts: false,
    },
    csrf: {
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    },
    sanctumEndpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/login',
      logout: '/logout',
      user: '/api/user',
    },
    redirect: {
      enableIntendedRedirect: false,
      loginPath: '/login',
      guestOnlyRedirect: '/',
      redirectToAfterLogin: '/',
      redirectToAfterLogout: '/',
    },
    middlewareNames: {
      auth: '$auth',
      guest: '$guest',
    },
    logLevel: 3,
  },

  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    const runtimeDir = resolver.resolve('./runtime');
    _nuxt.options.build.transpile.push(runtimeDir);

    const sanctumOptions = defu(
      _nuxt.options.runtimeConfig.public[MODULE_CONFIG_KEY] as any,
      _options,
    );
    _nuxt.options.runtimeConfig.public[MODULE_CONFIG_KEY] = sanctumOptions;

    const logger = useLogger(MODULE_NAME, {
      level: sanctumOptions.logLevel,
    });

    logger.start(`Initialize "${MODULE_NAME}" Module...`);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'));
    addImportsDir(resolver.resolve('./runtime/composables'));

    addRouteMiddleware({
      name: sanctumOptions.middlewareNames.auth,
      path: resolver.resolve('./runtime/middleware/auth'),
    });
    addRouteMiddleware({
      name: sanctumOptions.middlewareNames.guest,
      path: resolver.resolve('./runtime/middleware/guest'),
    });
  },
});
