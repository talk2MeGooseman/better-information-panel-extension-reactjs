import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import '../App.css';
import '../Config.css'
import 'typeface-roboto'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import * as Showdown from "showdown";
import Stepper from '../components/Stepper';
import InfoTabForm from '../components/InfoTabForm';
import TabsStore from '../mobx/state/TabsStore';
import TabbedInformation from '../components/TabbedInformation';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  rootPaper: {
    height: '100vh',
  },
  paper: {
    textAlign: 'left',
  },
  spacedContent: {
    marginLeft: theme.spacing.unit,
  },
  editorSection: {
    width: theme.spacing.unit * 40,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

@observer
class ConfigView extends Component {
  propsTypes = {
    tabsStore: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);
      this.state = {
          mdeState: null,
      };
      this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
  }


  render() {
    const { classes, tabsStore } = this.props;

    return (
      <div className={classes.root}>
        <Stepper /> 
        <Paper className={classes.rootPaper}>
          <Grid container spacing={8}>
            <Grid item xs={2} justify="center">
              <section className={classes.spacedContent}>
                <Typography variant="headline" gutterBottom>
                  Add Tab
                </Typography>
                <InfoTabForm tabsStore={tabsStore} /> 
              </section>
            </Grid>

            <Grid item xs={3}>
              <section className={classes.editorSection}>
                <TabbedInformation tabsStore={tabsStore} />

              </section>
            </Grid>

            <Grid item xs={4}>
              <Paper className={classes.paper}>
                Preview
                {JSON.stringify(tabsStore.tabs)}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ConfigView);

