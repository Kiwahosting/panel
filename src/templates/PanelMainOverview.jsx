import React, { Component } from 'react';
import {
  withStyles,
  createStyles,
  Typography,
  Paper,
  ButtonBase,
} from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { navigate } from 'gatsby';
import { getSiteList } from 'api';
import Loading from 'components/Loading';
import PanelContent from 'components/PanelContent';
import { MainTabs } from 'navigation';

const styles = (theme) => createStyles({
  paper: {
    minHeight: '100px',
  },
  loading: {
    height: '100px',
  },
});

const stylesButton = (theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 3,
    width: '100%',
    display: 'block',
    textAlign: 'left',
  },
  description: {
    opacity: 0.4,
  },
});

const SiteButton = withStyles(stylesButton, {name:'SiteButton'})(
  ({ classes: c, site: { name, domains, id } }) => {
    return <ButtonBase
      className={c.root}
      onClick={() => navigate('/panel/site/' + id)}
    >
      <Typography variant='h5' component='h2'>
        {name}
      </Typography>
      <Typography variant='body1' component='p' className={c.description}>
        {domains.join(', ')}
      </Typography>
    </ButtonBase>;
  });

class PanelMainPage extends Component {
  state = {
    sites: null,
  }

  componentDidMount() {
    getSiteList().then(sites => {
      this.setState({ sites });
    });
  }

  render() {
    const { classes: c } = this.props;

    return <PanelContent
      title='Main'
      activeTab={0}
      tabs={MainTabs}
    >
      <Typography variant='h4' component='h1' paragraph>
        Your Sites
      </Typography>
      <Paper className={c.paper}>
        {
          this.state.sites
            ? this.state.sites.map(site => {
              return <SiteButton key={site.id} site={site} />;
            })
            : <Loading className={c.loading} />
        }
      </Paper>
    </PanelContent>;
  }
}

export default hot(withStyles(styles)(PanelMainPage));
