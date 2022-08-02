import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../App.css';
import '../Config.css';
import { SAVE_DONE, SAVE_ERROR, SAVE_PENDING } from "../services/constants";

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import Done from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';

import * as Showdown from "showdown";
import PanelTabsConfig from '../components/PanelTabsConfig';
import ProgressBar from '../components/ProgressBar';
import TabsEditor from '../components/TabsEditor';
import VideoComponentPreviewDialog from '../components/VideoComponentPreviewDialog';
import BetterInformationPanel from './BetterInformationPanel';


import { arrayMove } from 'react-sortable-hoc';

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
    marginTop: theme.spacing.unit * 2,
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
  },
  avatarTextField: {
    width: 200,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
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

  componentDidMount() {
    this.props.tabsStore.videoOverlayHeight = '230px';
  }

  onClickSave = () => {
    const { tabsStore } = this.props
    tabsStore.saveTabs();
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

  onSortEnd = ({oldIndex, newIndex}) => {
    let { tabsStore } = this.props;
    tabsStore.tabs = arrayMove(tabsStore.tabs, oldIndex, newIndex);
  };

  render() {
    const { classes, tabsStore } = this.props;

    return (
      <div className={classes.root}>
        <ProgressBar tabsStore={tabsStore} />
        <Paper elevation={2} className={classes.rootPaper}>
          {/* Tabs Creation */}
          <Typography variant="h5" gutterBottom>
            Add Tab
          </Typography>
          <Divider className={classes.divider} />
          <PanelTabsConfig tabsStore={tabsStore} axis="xy" onSortEnd={this.onSortEnd} useDragHandle={true} />
          <Grid container spacing={8}>
            {/* Markdown Editor Step*/}
            <Grid item md={4}>
              <Typography variant="h5" gutterBottom>
                Enter Markdown Text - <a href="https://simplemde.com/markdown-guide" target="_blank" rel="noopener noreferrer">Help</a>
              </Typography>
              <Divider className={classes.divider} />
              <section className={classes.editorSection}>
                <TabsEditor tabsStore={tabsStore} />
              </section>
            </Grid>
            {/* Extension Preview */}
            <Grid item md={4}>
              <Typography variant="h5" gutterBottom>
                Preview
              </Typography>
              <Divider className={classes.divider} />
              {/* VIDEO COMPONENT PREVIEW */}
              <div style={{ textAlign: 'center' }}>
                <VideoComponentPreviewDialog tabsStore={tabsStore} />
              </div>
              {/* PANEL PREVIEW */}
              <Paper elevation={2} className={classes.panelPreviewPaper}>
                <BetterInformationPanel configPreview={true} tabsStore={tabsStore} />
              </Paper>
            </Grid>
            {/* Configuration and Saving */}
            <Grid item md={2} className={classes.settingsAndSave}>
              <Button onClick={this.onClickSave} className={classes.button} variant="contained" color="primary">
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

