import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import '../Config.css'
import 'typeface-roboto'
import 'react-mde/lib/styles/css/react-mde-all.css';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ReactMde, {ReactMdeTypes} from "react-mde";
import * as Showdown from "showdown";
import Stepper from '../components/Stepper';
import InfoTabForm from '../components/InfoTabForm';

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
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          mdeState: null,
      };
      this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
  }

  handleValueChange = (mdeState) => {
    this.setState({mdeState});
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Stepper /> 
        <Paper className={classes.rootPaper}>
          <Grid container justify="center" spacing={8}>
            <Grid item xs={2} justify="center">
              <Typography variant="headline" gutterBottom>
                Add Tab
              </Typography>
              <InfoTabForm /> 
            </Grid>
            <Grid item xs={6}>
              <ReactMde
                onChange={this.handleValueChange}
                editorState={this.state.mdeState}
              />
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                Preview
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);

