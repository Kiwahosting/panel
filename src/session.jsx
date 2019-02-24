const isBrowser = typeof window !== 'undefined';

const getUser = () =>
  window.localStorage.kiwahosting
    ? JSON.parse(window.localStorage.kiwahosting)
    : {};

const setUser = user => (window.localStorage.kiwahosting = JSON.stringify(user));

export const handleLogin = ({ email, password }) => {
  if (!isBrowser) return false;

  if (email === 'dave@davecode.me' && password === 'demo') {
    setUser({
      name: 'Dave',
      email: 'dave@davecode.me',
      token: null,
    });
    return true;
  }

  return false;
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const user = getUser();

  return !!user.email;
};

export const getCurrentUser = () => isBrowser && getUser();

export const logout = () => {
  if (!isBrowser) return;

  setUser({});
};
