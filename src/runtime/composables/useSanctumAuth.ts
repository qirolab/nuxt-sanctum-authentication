import { computed } from 'vue';
import { useSanctumUser } from './useSanctumUser';
import { getOptions } from '../helpers';

export const useSanctumAuth = <T>() => {
  const user = useSanctumUser<T>();

  // Computed property for login status
  const isLoggedIn = computed(() => user.value !== null);

  return {
    config: getOptions(),
    user,
    isLoggedIn,
  };
};
