import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as Showdown from "showdown";
import ReactHtmlParser from 'react-html-parser';

// TODO Look in to prevent XSS in the markdown
// TODO Wire in colors to change text and background

const styles = theme => ({
  root: {
  },
  tabRoot: {
    minWidth: theme.spacing.unit * 8,
  },
  tabBody: {
    height: '436px'
  }
});

@observer
class BetterInformationPanel extends Component {
  propTypes = {
    tabsStore: PropTypes.object.isRequired,
  };

  state = {
    value: 0,
  };

  constructor(props) {
    super(props);
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
      parseImgDimensions: true,
      smoothLivePreview: true,
      openLinksInNewWindow: true,
      emoji: true,
      simpleLineBreaks: true,
    });
  }

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

  renderTabBody() {
    const { tabsStore, classes} = this.props;
    return tabsStore.tabs.map((tab) => (
      <div className={classes.tabBody}>
        {ReactHtmlParser(this.converter.makeHtml(tab.body))}
      </div>
    ));
  }

  render() {
    const { classes, theme, tabsStore } = this.props;
    return(
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
          {this.renderTabBody()}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BetterInformationPanel);
