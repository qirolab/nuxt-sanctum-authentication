import { type Ref } from 'vue';
import { getOptions } from '../helpers';
import { useState } from '#app';

/**
 * Returns a ref to the current Sanctum user.
 *
 * @template T The type of the user object.
 * @returns {Ref<T | null>} A ref to the current user.
 */
export const useSanctumUser = <T>(): Ref<T | null> => {
  const { userIdentityStateKey } = getOptions();
  const user = useState<T | null>(userIdentityStateKey, () => null);

  return user;
};
