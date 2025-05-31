// composables/useAuth.ts
import { ref, computed } from 'vue';

export const useAuth = () => {
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24, // 1 day in seconds
    secure: true,
    sameSite: 'strict',
  });

  const isLoggedIn = computed(() => !!token.value);

    const storeLoggedInUserToken = async (suppliedToken: string) => {
    try {

      token.value = suppliedToken;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const deleteLoggedInUserToken = () => {
    token.value = null;
  };

  return {
    token,
    isLoggedIn,
    storeLoggedInUserToken,
    deleteLoggedInUserToken,
  };
};
