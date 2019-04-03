import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';

import { isLoggedIn } from 'api';

import PanelMainPage from 'templates/PanelMainOverview';
import Panel404 from 'templates/Panel404';
import PanelLayout from 'layouts/PanelLayout';

class Panel extends Component {
  state = {  }

  render() {
    if (typeof location === 'undefined') {
      return <PanelLayout>
        <noscript>Enable JavaScript to use Kiwahosting Panel</noscript>
      </PanelLayout>;
    }
    if (!isLoggedIn() && location.pathname !== '/auth') {
    // If we’re not logged in, redirect to the home page.
      setTimeout(() => {
        navigate('/auth#' + location.pathname);
      }, 10);
      return null;
    }

    return <PanelLayout>
      <Router style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <PanelMainPage path='/panel' />
        <Panel404 default />
      </Router>
    </PanelLayout>;
  }
}

export default Panel;
