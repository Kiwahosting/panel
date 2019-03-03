import { setCurrentUser, isLoggedIn } from './session';
import { uselessDelay } from './useless';

export async function login({ email, password }) {
  if (isLoggedIn()) return;

  await uselessDelay(700);

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
  await uselessDelay(200);
  setCurrentUser({});
}

export { isLoggedIn };
