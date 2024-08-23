import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';
import { MODULE_CONFIG_KEY, MODULE_NAME, MODULE_VERSION } from './module-info';

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: MODULE_NAME,
    version: MODULE_VERSION,
    configKey: MODULE_CONFIG_KEY,
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'));
  },
});
