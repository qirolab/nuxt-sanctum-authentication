import { computed } from 'vue';
import { useSanctumUser } from './useSanctumUser';
import { getOptions } from '../helpers';
import { useSanctumFetch } from './useSanctumFetch';

export const useSanctumAuth = <T>() => {
  const options = getOptions();

  // Initialize fetch client and user state
  const client = useSanctumFetch();
  const user = useSanctumUser<T>();

  // Computed property for login status
  const isLoggedIn = computed(() => user.value !== null);

  // Refresh user function
  async function refreshUser() {
    user.value = await client<T>(options.sanctumEndpoints.user);
  }

  return {
    config: getOptions(),
    user,
    isLoggedIn,
    refreshUser,
  };
};
