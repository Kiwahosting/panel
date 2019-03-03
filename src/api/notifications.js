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
      text: 'The world is going to end, fix that now!',
      url: '/panel/site-id/fix-end-world',
    },
    {
      id: 'other',
      text: 'Other notif',
      url: '/',
    },
  ];
}
