import { createConsola } from 'consola';
import type { ModuleOptions } from '../types/ModuleOptions';
import { useRuntimeConfig } from '#app';
import { MODULE_CONFIG_KEY, MODULE_NAME } from '../module-info';

export function getOptions(): ModuleOptions {
  return useRuntimeConfig().public[MODULE_CONFIG_KEY] as ModuleOptions;
}

export function createLogger(logLevel: number = 3) {
  const envSuffix = import.meta.env.SSR ? 'ssr' : 'csr';
  const loggerName = MODULE_NAME + ':' + envSuffix;

  return createConsola({ level: logLevel }).withTag(loggerName);
}

export function trimTrailingSlash(path: string): string {
  return path.replace(/(?<!^)\/$/, '');
}
