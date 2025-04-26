export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = async () => {
  return localStorage.removeItem("token");
};
