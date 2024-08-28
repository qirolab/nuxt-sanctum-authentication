import type { ModuleOptions } from '../types/ModuleOptions';
import { useRuntimeConfig } from '#app';

/**
 * Returns the Sanctum module options.
 *
 * @returns {ModuleOptions} The Sanctum module options.
 */
export const useSanctumOptions = (): ModuleOptions => {
  return useRuntimeConfig().public.sanctum as ModuleOptions;
};
