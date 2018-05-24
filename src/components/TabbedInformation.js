import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMde from "react-mde";
import {EditorState} from "draft-js";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    minWidth: theme.spacing.unit * 8,
  }
});

@observer
class TabbedInformation extends React.Component {

  propTypes = {
    tabsStore: PropTypes.object.isRequired,
  };

  state = {
    value: 0,
    mdeState: null,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  renderTabs() {
    let { classes, tabsStore } = this.props;
    return tabsStore.tabs.map((tab) => {
      return <Tab label={tab.title} classes={{ root: classes.tabRoot }} />
    });
  }

  async createMdeState(tabData) {
    let editorState = {
      html: "",
      markdown: tabData.body,
      draftEditorState: EditorState.createEmpty(),
    };

    return editorState;
  }

  // TODO Need to add this whole thing into its on stateful compoenent
  // SO the the editor doesnt struggle to keep state
  renderBodyEditor() {
    let { tabsStore } = this.props;
    return tabsStore.tabs.map((tab) => {
      let mdeState = this.createMdeState(tab);

      const handleValueChange = (mdeState) => {
        tab.body = mdeState.markdown;
      }

      return (
        <ReactMde
          onChange={handleValueChange}
          editorState={mdeState}
        />
      );
    });
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            {this.renderTabs()}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {this.renderBodyEditor()}
        </SwipeableViews>
      </div>
    );
  }
}

TabbedInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TabbedInformation);