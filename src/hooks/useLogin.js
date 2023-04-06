
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';

function useLogin() {
  const { isLoggedIn } = useContext(LoginContext);
  return isLoggedIn;
}

export default useLogin;