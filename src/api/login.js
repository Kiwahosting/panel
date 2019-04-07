import { setCurrentUser, isLoggedIn } from './session';
import { uselessDelay } from './useless';

import { apiBaseUrl } from '../../config';

export async function emailExists({ email }) {
  // TODO: Actually Work
  await uselessDelay(400);
  return true;
}

export function logout() {
  setCurrentUser({});
}

export { isLoggedIn };
