import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { Link } from 'components';
import PanelContent from 'components/PanelContent';

class Panel404 extends Component {
  render() {

    return <PanelContent bare>
      <Typography variant='h4' component='h1' paragraph>
        404 Not Found
      </Typography>
      <Typography variant='body1' component='p' paragraph>
        That page of the Panel was not found. <Link to='/panel'>Return to Main Page</Link>
      </Typography>
    </PanelContent>;
  }
}

export default hot(Panel404);
