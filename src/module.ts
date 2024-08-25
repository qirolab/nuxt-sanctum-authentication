import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  useLogger,
  addImportsDir,
  addRouteMiddleware,
} from '@nuxt/kit';
import defu from 'defu';
import { type DeepPartial } from './types';
import type { ModuleOptions } from './types/ModuleOptions';
import { MODULE_CONFIG_KEY, MODULE_NAME, MODULE_VERSION } from './module-info';

export default defineNuxtModule<DeepPartial<ModuleOptions>>({
  meta: {
    name: MODULE_NAME,
    version: MODULE_VERSION,
    configKey: MODULE_CONFIG_KEY,
  },

  defaults: {
    authMode: 'cookie',
    userIdentityStateKey: 'user.identity',
    tokenStorageKey: 'AUTH-API-TOKEN',
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
    logLevel: 3,
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const runtimeDir = resolver.resolve('./runtime');
    nuxt.options.build.transpile.push(runtimeDir);

    const moduleOptions = defu(
      nuxt.options.runtimeConfig.public[MODULE_CONFIG_KEY] as any,
      options,
    );
    nuxt.options.runtimeConfig.public[MODULE_CONFIG_KEY] = moduleOptions;

    const logger = useLogger(MODULE_NAME, {
      level: moduleOptions.logLevel,
    });

    logger.start(`Initializing ${MODULE_NAME} module...`);

    addPlugin(resolver.resolve('./runtime/plugin'));
    addImportsDir(resolver.resolve('./runtime/composables'));

    addRouteMiddleware({
      name: 'sanctum:auth',
      path: resolver.resolve('./runtime/middleware/sanctum.auth'),
    });

    addRouteMiddleware({
      name: 'sanctum:guest',
      path: resolver.resolve('./runtime/middleware/sanctum.guest'),
    });
  },
});
