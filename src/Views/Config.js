import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import '../App.css';
import '../Config.css'
import { SAVE_DONE, SAVE_ERROR, SAVE_PENDING } from "../services/constants";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import CachedIcon from '@material-ui/icons/Cached';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';

import * as Showdown from "showdown";
import ProgressBar from '../components/ProgressBar';
import InfoTabForm from '../components/InfoTabForm';
import TabsEditor from '../components/TabsEditor';
import BetterInformationPanel from './BetterInformationPanel';
import { FormControl } from '../../node_modules/@material-ui/core';

// import DevTools from 'mobx-react-devtools';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  rootPaper: {
    height: '100%',
    background: theme.palette.background.default,
    paddingLeft: theme.spacing.unit,
  },
  paper: {
    textAlign: 'left',
  },
  panelPreviewPaper: {
    width: '327px',
    height: '502px',
    overflowX: 'hidden',
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
  doneIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 5,
  },
  divider: {
    marginBottom: theme.spacing.unit,
  },
  settingsAndSave: {
    marginTop: theme.spacing.unit * 5,
  }
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

  onClickSave = () => {
    const { tabsStore } = this.props;
    tabsStore.saveTabs();
  }

  handleVisibilityChange = (event) => {
    const { tabsStore } = this.props;
    tabsStore.setVideoComponentVisability(event.target.checked);
  }

  handleTransparentChange = (event) => {
    const { tabsStore } = this.props;
    tabsStore.setVideoComponentTransparency(event.target.checked);
  }

  renderSaveState() {
    const { tabsStore, classes } = this.props;
    let jsx = null;
    switch (tabsStore.saveState) {
      case SAVE_PENDING:
        jsx = <CachedIcon className={classes.doneIcon} />
        break;
      case SAVE_DONE:
        jsx = <Done className={classes.doneIcon} />
        break;
      case SAVE_ERROR:
        jsx = <ErrorIcon className={classes.doneIcon} />
        break;
      default:
        break;
    }

    return jsx;
  }

  render() {
    const { classes, tabsStore } = this.props;

    return (
      <div className={classes.root}>
        <ProgressBar tabsStore={tabsStore} />
        <Paper className={classes.rootPaper}>
          {/* Tabs Creation */}
          <Typography variant="headline" gutterBottom>
            Add Tab
          </Typography>
          <Divider className={classes.divider} />
          <Grid container spacing={8}>
            <InfoTabForm tabsStore={tabsStore} />
          </Grid>
          <Grid container spacing={8}>
            {/* Markdown Editor Step*/}
            <Grid item md={4}>
              <Typography variant="headline" gutterBottom>
                Enter Markdown Text - <a href="https://simplemde.com/markdown-guide" target="_blank" rel="noopener noreferrer">Help</a>
              </Typography>
              <Divider className={classes.divider} />
              <section className={classes.editorSection}>
                <TabsEditor tabsStore={tabsStore} />
              </section>
            </Grid>
            {/* Extension Preview */}
            <Grid item md={4}>
              <Typography variant="headline" gutterBottom>
                Preview
              </Typography>
              <Divider className={classes.divider} />
              <Paper className={classes.panelPreviewPaper}>
                <BetterInformationPanel configPreview={true} tabsStore={tabsStore} />
              </Paper>
            </Grid>
            {/* Configuration and Saving */}
            <Grid item md={2} className={classes.settingsAndSave}>
              <FormControl>
                <FormLabel component="legend">Video Component Settings:</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tabsStore.videoComponentVisibility}
                      onChange={this.handleVisibilityChange}
                      value="videoComponentVisibility"
                      color="primary"
                    />
                  }
                  label="Show on Channel Load"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tabsStore.videoComponentTransparent}
                      onChange={this.handleTransparentChange}
                      value="videoComponentTransparent"
                      color="primary"
                    />
                  }
                  label="Make transparent when not in focus"
                />
              </FormControl>
              <Divider />
              <Button onClick={this.onClickSave} className={classes.button} variant="raised" color="primary">
                Save
                {this.renderSaveState()}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ConfigView);

