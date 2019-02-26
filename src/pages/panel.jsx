import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { Router } from '@reach/router';

import { isLoggedIn } from 'session';
import withRoot from 'withRoot';
import PanelLayout from 'layouts/PanelLayout';

import PanelMainPage from 'templates/PanelMainPage';
import Panel404 from 'templates/Panel404';

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
        <PanelMainPage path='/panel' />
        <Panel404 default />
      </Router>
    </PanelLayout>;
  }
}

export default withRoot(Panel);
