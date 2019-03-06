import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from 'api';
import { navigate } from 'gatsby';

export const SideBar = [
  {
    id: 'Main',
    children: [
      { id: 'Home', icon: <HomeIcon />, destination: '/panel' },
    ],
  },
  {
    id: 'Site Stuff',
    children: [
      { id: 'Overview', icon: <SettingsIcon /> },
      { id: 'Domains', icon: <SettingsIcon /> },
      { id: 'Shit', icon: <SettingsIcon /> },
    ],
  },
  {
    id: 'Settings',
    children: [
      { id: 'Settings', icon: <SettingsIcon /> },
      { id: 'Account', icon: <AccountCircleIcon /> },
      {
        id: 'Log Out', icon: <AccountCircleIcon />, click: () => {
          logout();
          navigate('/auth#/panel');
        },
      },
    ],
  },
];

export const MainTabs = [
  {
    id: 'Overview',
    url: '/panel',
  },
  {
    id: 'Sites',
    url: '/panel/site',
  },
  {
    id: 'Domains',
    url: '/panel/domains',
  },
  {
    id: 'Whatever Else',
    url: '/panel/whatever',
  },
];
