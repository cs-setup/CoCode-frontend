function useLogin() {
  const token = localStorage.getItem("token");
  return !!token;
}

export default useLogin;

