import { apiBaseUrl } from '../config';

export async function emailExists(email) {
  const json = await fetch(`${apiBaseUrl}/auth/email/${email}`).then(x => x.json());
  if (json.status === 0) {
    return false;
  } if (json.status === 1) {
    throw new Error('API Error: Unknown Request Error');
  } else if (json.status === 3) {
    return true;
  } else {
    throw new Error('API Error: Unknown API Response ' + json.status);
  }  
}
