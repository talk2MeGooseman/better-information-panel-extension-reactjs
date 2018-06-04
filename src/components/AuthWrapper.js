import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

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

class AuthWrapper extends PureComponent {
  static propTypes = {
    tabsStore: PropTypes.object.isRequired,
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    window.Twitch.ext.onAuthorized((auth) => {
      this.props.tabsStore.token = auth.token;

      this.props.tabsStore.fetchTabs();

      // TODO Only set this to false once we fetch data from server
      this.setState({
        loading: false
      });
    });
  }

  renderLoading() {
    const { classes } = this.props;

    return(
      <Grid container className={classes.root}
        alignItems='center'
        justify='center'>
        <Grid item className={classes.demo}>
            <Paper className={classes.paper}>
              <CircularProgress className={this.props.classes.progress} />
            </Paper>
        </Grid>
      </Grid>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else {
      return this.props.children;
    }
  }
}

export default withStyles(styles)(AuthWrapper);