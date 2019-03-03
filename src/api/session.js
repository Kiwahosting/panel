const isBrowser = typeof window !== 'undefined';

const getUser = () =>
  window.localStorage.kiwahosting
    ? JSON.parse(window.localStorage.kiwahosting)
    : {};

const setUser = user => (window.localStorage.kiwahosting = JSON.stringify(user));

export function isLoggedIn() {
  if (!isBrowser) return false;

  const user = getUser();

  return !!user.email;
}

export function getCurrentUser() {
  return isBrowser && getUser();
}

export function setCurrentUser(data) {
  if (!isBrowser) return;

  setUser(data);
}
