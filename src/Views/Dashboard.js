import React, { Component } from 'react';
import PropTypes from "prop-types";
import TabsEditor from '../components/TabsEditor';
import '../Dashboard.css';
import { SAVE_PENDING, SAVE_DONE, SAVE_ERROR } from "../services/constants";
import { observer } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

@observer
class Dashboard extends Component {
  static propTypes = {
    tabsStore: PropTypes.object.isRequired,
  }

  onClickSave = () => {
    const { tabsStore } = this.props;
    tabsStore.saveTabs();
  }

  renderSaveState() {
    const { tabsStore } = this.props;
    let jsx = null;
    switch (tabsStore.saveState) {
      case SAVE_PENDING:
        jsx = <CachedIcon />
        break;
      case SAVE_DONE:
        jsx = <DoneIcon />
        break;
      case SAVE_ERROR:
        jsx = <ErrorIcon />
        break;
      default:
        jsx = <SaveIcon />
        break;
    }

    return jsx;
  }

  render() {
    const { tabsStore, classes } = this.props;
    return (
      <React.Fragment>
        <TabsEditor tabsStore={tabsStore} allowPreview={true} />
        <Button onClick={this.onClickSave} variant="fab" className={classes.fab} color="primary">
          { this.renderSaveState() }
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);