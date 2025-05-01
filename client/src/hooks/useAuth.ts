import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const { user, isLoading, login, logout,refreshUser, isLoggedIn } = useAuthContext();
  

  return { user, isLoggedIn, isLoading, login, logout,refreshUser };
};
