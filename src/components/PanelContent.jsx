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
  refScroll = (ref) => {
    if (ref) {
      ref.onscroll = () => {
        this.setHeaderShadow(ref.scrollTop !== 0);
      };
    }
  }
  render() {
    const { classes: c, title, tabs, bare } = this.props;

    return <PanelStateContext.Consumer>
      {({ setHeaderShadow }) => {
        this.setHeaderShadow = setHeaderShadow;
        return <>
          <PanelHeader
            title={title}
            tabs={tabs}
            bare={bare}
            onDrawerToggle={this.handleDrawerToggle}
          />
        <main className={c.mainContent} ref={this.refScroll}>
          {this.props.children}
        </main>
        </>;
      }}
    </PanelStateContext.Consumer>;
  }
}

export default hot(withStyles(styles)(Panel404));
