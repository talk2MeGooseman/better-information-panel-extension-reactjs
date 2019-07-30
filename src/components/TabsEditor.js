import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Editor from './Editor';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: '500px',
  },
  tabRoot: {
    minWidth: theme.spacing.unit * 8,
  },
});

@observer
class TabsEditor extends React.Component {
  static propTypes = {
    tabsStore: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    allowPreview: PropTypes.bool,
  };

  state = {
    value: 0,
  };

  // componentWillReact() {
  //   // let { tabsStore } = this.props;

  //   if (this.state.value >= tabsStore.tabCount) {
  //     this.setState({ value: tabsStore.tabCount - 1 });
  //   }
  // }

  handleChange = (event, value) => {
    let { tabsStore } = this.props;
    tabsStore.tabIndex = value;
  };

  handleChangeIndex = index => {
    let { tabsStore } = this.props;
    tabsStore.tabIndex = index;
  };

  renderTabs() {
    let { classes, tabsStore } = this.props;
    return tabsStore.tabs.map(tab => {
      return (
        <Tab
          key={tab.id}
          label={tab.title}
          classes={{ root: classes.tabRoot }}
        />
      );
    });
  }

  renderEditor() {
    let { tabsStore, allowPreview } = this.props;

    return tabsStore.tabs.map(tab => (
      <Editor
        key={tab.id}
        tab={tab}
        tabsStore={tabsStore}
        allowPreview={allowPreview}
      />
    ));
  }

  render() {
    const { classes, theme, tabsStore } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabsStore.tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
            variant="scrollable"
          >
            {this.renderTabs()}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabsStore.tabIndex}
          enableMouseEvents={true}
          onChangeIndex={this.handleChangeIndex}>
          {this.renderEditor()}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TabsEditor);
