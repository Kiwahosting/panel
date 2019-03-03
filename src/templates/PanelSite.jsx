import React, { Component } from 'react';
import {
  withStyles,
  createStyles,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { getSiteInfo } from 'api';
import Loading from 'components/Loading';
import Panel404 from './Panel404';

const styles = (theme) => createStyles({
  paper: {
    position: 'relative',
    padding: theme.spacing.unit * 3,
  },
  loading: {
    flex: 1,
  },
});

class PanelSite extends Component {

  state = { site: null, is404: false };

  componentDidMount() {
    getSiteInfo(this.props.siteId).then((site) => {
      this.setState({ site });
    }).catch((err) => {
      this.setState({ is404: true });
    });
  }

  render() {
    const { classes: c, siteId } = this.props;

    if(this.state.is404) {
      return <Panel404 />;
    }

    if(!this.state.site) {
      return <Loading className={c.loading} />;
    }

    return <>
      <Typography variant='h4' component='h1' paragraph>
        Manage Site {siteId}
      </Typography>
      <Paper className={c.paper} style={{ whiteSpace: 'pre' }}>
        JSON DATA{'\n\n'}
        {
          JSON.stringify(this.state.site, null, '\t')
        }
      </Paper>
    </>;
  }
}

export default hot(withStyles(styles)(PanelSite));
