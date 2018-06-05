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
    background: '#fff'
  },
  tabRoot: {
    minWidth: theme.spacing.unit * 8,
  },
  tabBody: {
    height: '431px',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  }
});

const SHOWDOWN_CONFIG = {
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  parseImgDimensions: true,
  smoothLivePreview: true,
  openLinksInNewWindow: true,
  emoji: true,
  simpleLineBreaks: true,
};

@observer
class BetterInformationPanel extends Component {
  static propTypes = {
    tabsStore: PropTypes.object.isRequired,
  };

  state = {
    value: 0,
  };

  constructor(props) {
    super(props);
    this.converter = new Showdown.Converter(SHOWDOWN_CONFIG);
  }

  componentDidMount() {
    const { tabsStore } = this.props;

    if (tabsStore.tabCount === 0) {
      tabsStore.addTab();
    }
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
      return <Tab key={tab.id} label={tab.title} classes={{ root: classes.tabRoot }} />
    });
  }

  renderTabBody() {
    const { tabsStore, classes} = this.props;
    return tabsStore.tabs.map((tab) => {
      let styles = {
        color: tab.textColor,
        background: tab.bgColor,
      };

      return (
        <div key={tab.id} style={styles} className={classes.tabBody}>
          {ReactHtmlParser(this.converter.makeHtml(tab.body))}
        </div>
      );
    });
  }

  render() {
    const { classes, theme, tabsStore } = this.props;
    const { value } = this.state;
    const selectedTab = tabsStore.tabs[value];
    if (!selectedTab) {
      return null;
    }

    const styles = {
      background: selectedTab.bgColor,
    }

    const slideStyles = {
      maxHeight: '452px',
    }

    return(
      <div className={classes.root} style={styles}>
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
          slideStyle={slideStyles}
        >
          {this.renderTabBody()}
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BetterInformationPanel);
