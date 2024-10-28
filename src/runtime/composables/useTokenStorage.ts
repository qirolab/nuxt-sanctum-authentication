import { useSanctumOptions } from './useSanctumOptions';
import { unref } from '#imports';
import { useCookie, useState, type NuxtApp } from '#app';

const cookieTokenProvider = {
  get(tokenKey: string) {
    const cookie = useCookie(tokenKey, { readonly: true });
    return unref(cookie.value);
  },

  set(tokenKey: string, token?: string) {
    const cookie = useCookie(tokenKey, { secure: true });
    cookie.value = token;
  },
};

const localStorageTokenProvider = {
  get(tokenKey: string) {
    if (import.meta.server) {
      return undefined;
    }
    return window.localStorage.getItem(tokenKey) ?? undefined;
  },

  set(tokenKey: string, token?: string) {
    if (import.meta.server) {
      return;
    }

    if (!token) {
      window.localStorage.removeItem(tokenKey);
      return;
    }

    window.localStorage.setItem(tokenKey, token);
  },
};

export function useTokenStorage(nuxtApp: NuxtApp): {
  get(): Promise<string | undefined>;
  set(tokenData?: string | null): Promise<void>;
} {
  const { token } = useSanctumOptions();

  const tokenProvider =
    token.provider === 'localStorage'
      ? localStorageTokenProvider
      : cookieTokenProvider;

  const tokenState = useState<string | undefined>(
    token.storageKey,
    () => undefined,
  );

  return {
    get: async () => {
      return await nuxtApp.runWithContext(() => {
        return tokenProvider.get(token.storageKey) ?? tokenState.value;
      });
    },

    set: async (tokenData?: string) => {
      await nuxtApp.runWithContext(() => {
        tokenProvider.set(token.storageKey, tokenData);
        tokenState.value = tokenData;
      });
    },
  };
}
