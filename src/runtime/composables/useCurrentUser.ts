import type { Ref } from 'vue';
import { useSanctumOptions } from './useSanctumOptions';
import { useState } from '#app';

/**
 * Returns a ref to the current Authenticated user.
 *
 * @template T The type of the user object.
 * @returns {Ref<T | null>} A ref to the current user.
 */
export const useCurrentUser = <T>(): Ref<T | null> => {
  const { userStateKey } = useSanctumOptions();
  const user = useState<T | null>(userStateKey, () => null);

  return user;
};
