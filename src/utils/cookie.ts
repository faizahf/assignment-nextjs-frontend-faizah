import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setAuthToken = (key: string, value: string): void => {
  cookies.set(key, value, { path: "/" });
};

export const getAuthToken = (key: string): string | undefined => {
  return cookies.get(key);
};

export const removeAuthToken = (key: string): void => {
  cookies.remove(key, { path: "/" });

  console.log(cookies.getAll());
};