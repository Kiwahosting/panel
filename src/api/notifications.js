import { uselessDelay } from './useless';
import { isLoggedIn } from './session';

export async function getNotifications() {
  if (!isLoggedIn()) {
    throw new Error('Not Logged In');
  }

  await uselessDelay(700);

  return [
    {
      id: 'world-end',
      text: 'Example: Password is Insecure',
      url: '/panel/account',
    },
    {
      id: 'other',
      text: 'Example: davecode is not properly configured',
      url: '/panel/8152314231244',
    },
  ];
}
