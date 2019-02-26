import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';

import { isLoggedIn } from 'session';
import withRoot from 'withRoot';

import PanelMainPage from 'templates/PanelMainPage';
import Panel404 from 'templates/Panel404';
import PanelAccountSettings from 'templates/PanelAccountSettings';
import PanelSite from 'templates/PanelSite';
import PanelLayout from 'layouts/PanelLayout';

class Panel extends Component {
  state = {  }
  render() {
    if (!isLoggedIn() && location.pathname !== '/auth') {
      // If we’re not logged in, redirect to the home page.
      navigate('/auth');
      return null;
    }

    return <PanelLayout>
      <Router>
        <PanelAccountSettings path='/panel/account' />
        <PanelMainPage path='/panel' />
        <PanelSite path='/panel/:siteId' />
        <Panel404 default />
      </Router>
    </PanelLayout>;
  }
}

export default withRoot(Panel);
