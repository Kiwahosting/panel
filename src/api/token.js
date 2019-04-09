// Handles generating a token for the OC-AUTH System (Overwhelmingly Complex Authorization System)

// sha1(sha1(sha256(password)+device)+roundedTime):device

import { sha256 } from 'js-sha256';
import sha1 from 'js-sha1';
import { getCurrentUser, setCurrentUser } from './session';
import { apiBaseUrl } from '../config';

function getLocalAuthToken() {
  const user = getCurrentUser();
  if (user.LocalAuthToken) {
    return user.LocalAuthToken;
  } else {
    return null;
  }
}

export async function getDeviceToken() {
  const user = getCurrentUser();
  if (user.LocalDeviceID) {
    return user.LocalDeviceID;
  } else {
    // Generate it
    const json = fetch(`${apiBaseUrl}/auth/device`).then(x => x.json());
    if(json.status === 0) {
      user.LocalDeviceID = json.device;
      return json.device;
    } else if(json.status === 2) {
      throw new Error('API Error: SQL Error');
    } else {
      throw new Error('API Error: Unknown API Response');
    }
  }
}

export async function createLocalAuthToken(email, password) {
  const device = getDeviceToken();
  const user = getCurrentUser();
  user.localAuthToken = sha1(sha256(password) + device);
  setCurrentUser(user);
}

export function getAPIToken() {
  return sha1(getLocalAuthToken() + getTime());
}

function getTime() {
  let time = Math.floor((new Date).getTime() / 10000) * 10000;
  return [time];
}
