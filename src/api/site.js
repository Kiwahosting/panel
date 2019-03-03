import { isLoggedIn } from './session';

export async function getSiteList() {
  if(!isLoggedIn()) {
    throw new Error('Not Logged In');
  }
  return [
    {
      id: '2438243982143',
      name: 'Filip Kin\'s Site',
      domains: ['filipkin.com', 'filipk.in'],
      plan: 'the good one',
    },
    {
      id: '8152314231244',
      name: 'davecode',
      domains: ['davecode.me'],
      plan: 'the free cheap and garbage one',
    },
  ];
}

export async function getSiteInfo(siteId) {
  if (!isLoggedIn()) {
    throw new Error('Not Logged In');
  }

  if (siteId === '2438243982143') {
    return {
      id: '2438243982143',
      name: 'Filip Kin\'s Site',
      domains: ['filipkin.com', 'filipk.in'],
      plan: 'the good one',
    };
  }
  if (siteId === '8152314231244') {
    return {
      id: '8152314231244',
      name: 'davecode',
      domains: ['davecode.me'],
      plan: 'the free cheap and garbage one',
    };
  }

  throw new Error('404');
}
