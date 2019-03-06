import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';
import { PanelHeader } from 'components';
import { PanelStateContext } from 'layouts/PanelLayout';

const styles = (theme) => createStyles({
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
});

class Panel404 extends Component {
  state = { headerShadow: false }
  refScroll = (ref) => {
    if (ref) {
      ref.onscroll = () => {
        this.setState({ headerShadow: ref.scrollTop !== 0 });
      };
    }
  }
  render() {
    const { classes: c, title, tabs, bare, activeTab } = this.props;

    return <>
      <PanelHeader
        title={title}
        activeTab={activeTab}
        tabs={tabs}
        bare={bare}
        headerShadow={this.state.headerShadow}
        onDrawerToggle={this.handleDrawerToggle}
      />
      <main className={c.mainContent} ref={this.refScroll}>
        {this.props.children}
      </main>
    </>;
  }
}

export default hot(withStyles(styles)(Panel404));
