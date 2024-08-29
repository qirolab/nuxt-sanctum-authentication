import type { ModuleOptions } from '../types/ModuleOptions';
import { MODULE_CONFIG_KEY } from '../helpers/module-info';
import { useRuntimeConfig } from '#app';

/**
 * Returns the Sanctum module options.
 *
 * @returns {ModuleOptions} The Sanctum module options.
 */
export const useSanctumOptions = (): ModuleOptions => {
  return useRuntimeConfig().public[MODULE_CONFIG_KEY] as ModuleOptions;
};
