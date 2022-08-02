import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { LOAD_DONE, LOAD_PENDING } from "../services/constants";

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: '80vh',
  },
  paper: {
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

@observer
class AuthWrapper extends Component {
  static propTypes = {
    tabsStore: PropTypes.object.isRequired,
    ignoreBroadcasts: PropTypes.bool,
  };

  componentDidMount() {
    let shouldFetch = false;
    // Listen to on Auth callback to get token
    window.Twitch.ext.onAuthorized((auth) => {
      // If token is null then that means this is the first load
      if (!this.props.tabsStore.token) {
        shouldFetch = true;
      }
      this.props.tabsStore.token = auth.token;

      if (shouldFetch) {
        this.props.tabsStore.fetchTabs();
      }
    });

    if (!this.props.ignoreBroadcasts) {
      window.Twitch.ext.listen('broadcast', (target, contentType, message) => {
        this.props.tabsStore.updateTabs();
      });
    }
  }

  renderLoading() {
    const { classes } = this.props;

    return(
      <Grid container className={classes.root}
        alignItems='center'
        justify='center'>
        <Grid item className={classes.demo}>
            <Paper elevation={2} className={classes.paper}>
              <CircularProgress className={this.props.classes.progress} />
            </Paper>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { tabsStore } = this.props;
    if (tabsStore.loadingState === LOAD_PENDING) {
      return this.renderLoading();
    } else if(tabsStore.loadingState === LOAD_DONE) {
      return this.props.children;
    }
  }
}

export default withStyles(styles)(AuthWrapper);
