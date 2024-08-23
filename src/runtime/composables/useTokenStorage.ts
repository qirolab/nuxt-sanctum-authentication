import { getOptions } from '../helpers';
import { unref } from '#imports';
import { useCookie, useNuxtApp } from '#app';

export function useTokenStorage() {
  const { tokenStorageKey } = getOptions();
  const nuxtApp = useNuxtApp();

  async function get() {
    return await nuxtApp.runWithContext(() => {
      const cookie = useCookie(tokenStorageKey, { readonly: true });

      return unref(cookie.value) ?? undefined;
    });
  }

  async function set(token?: string) {
    await nuxtApp.runWithContext(() => {
      const cookie = useCookie(tokenStorageKey, { secure: true });

      cookie.value = token;
    });
  }

  return {
    get,
    set,
  };
}
