import { createConsola } from 'consola';
import { MODULE_NAME } from './module-info';

export function createLogger(logLevel: number = 3) {
  const envSuffix = import.meta.env.SSR ? 'ssr' : 'csr';
  const loggerName = MODULE_NAME + ':' + envSuffix;

  return createConsola({ level: logLevel }).withTag(loggerName);
}
