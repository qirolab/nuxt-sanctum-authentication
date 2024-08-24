import { getOptions } from '../helpers';
import { unref } from '#imports';
import { useCookie, useNuxtApp, useState } from '#app';

export function useTokenStorage() {
  const nuxtApp = useNuxtApp();
  const { tokenStorageKey } = getOptions();
  const tokenState = useState<string | undefined | null>(
    tokenStorageKey,
    () => null,
  );

  async function get() {
    return await nuxtApp.runWithContext(() => {
      const cookie = useCookie(tokenStorageKey, { readonly: true });

      return unref(cookie.value) ?? tokenState.value;
    });
  }

  async function set(token?: string) {
    await nuxtApp.runWithContext(() => {
      const cookie = useCookie(tokenStorageKey, { secure: true });

      cookie.value = token;
      tokenState.value = token;
    });
  }

  return {
    get,
    set,
  };
}
