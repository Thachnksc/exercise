export const setToken = (token, role, userName) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("userName", userName);
};

export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");
export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
