import type { FetchContext } from 'ofetch';
import type { ConsolaInstance } from 'consola';
import type { NuxtApp } from '#app';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

/**
 * Interceptor definition type.
 */
export type SanctumInterceptor = (
  app: NuxtApp,
  ctx: FetchContext,
  logger: ConsolaInstance,
) => Promise<void>;

/**
 * Interceptors to be used by the ofetch client.
 */
export interface SanctumInterceptors {
  /**
   * Function to execute before sending a request.
   */
  onRequest?: SanctumInterceptor;
  /**
   * Function to execute after receiving a response.
   */
  onResponse?: SanctumInterceptor;
}

/**
 * Sanctum configuration for the application side with user-defined handlers.
 */
export interface SanctumAppConfig {
  /**
   * Interceptors to be used by the client.
   */
  interceptors?: SanctumInterceptors;
}
