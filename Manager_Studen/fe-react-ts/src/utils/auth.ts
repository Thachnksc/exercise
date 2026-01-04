export const setAuth = (token: string, role: string, userName: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("userName", userName);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const getRole = () => localStorage.getItem("role");

