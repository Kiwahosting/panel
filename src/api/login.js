import { setCurrentUser, isLoggedIn } from './session';

export async function login({ email, password }) {
  if (isLoggedIn()) return;

  if(email !== 'dave') {
    return false;
  }
  if(password !== 'demo') {
    return false;
  }

  setCurrentUser({
    email,
    name: 'Dave',
  });

  return true;
}

export async function logout() {
  setCurrentUser({});
}

export { isLoggedIn };
