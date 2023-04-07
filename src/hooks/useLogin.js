import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';

function useLogin() {
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useContext(LoginContext);
  return isLoggedIn || !!token;
}

export default useLogin;

