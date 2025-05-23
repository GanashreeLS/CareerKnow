export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = async () => {
  return localStorage.removeItem("token");
};

export const isUser = () => {
  return localStorage.getItem("role") === "user";
};

export const isAdmin = () => {
  console.log(localStorage.getItem("role"));
  return localStorage.getItem("role") === "admin";
};
