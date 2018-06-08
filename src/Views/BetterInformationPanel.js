import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { COMPONENT_ANCHOR } from "../services/constants";

import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  tabBody: {
    height: '85vh',
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
    viewAnchor: PropTypes.string,
  };

  state = {
    value: 0,
    hidden: false,
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

  handleToggleShow = () => {
    let hidden = this.state.hidden;

    this.setState({
      hidden: !hidden, 
    });
  }

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

      if (tabsStore.videoOverlayHeight) {
        styles['height'] = tabsStore.videoOverlayHeight;
      }

      return (
        <div key={tab.id} style={styles} className={classes.tabBody}>
          {ReactHtmlParser(this.converter.makeHtml(tab.body))}
        </div>
      );
    });
  }

  renderToggleShowButton() {
    const { classes, viewAnchor } = this.props;
    let icon = <VisibilityIcon />;

    if (viewAnchor !== COMPONENT_ANCHOR) {
      return;
    }

    if (this.state.hidden) {
      icon = <VisibilityOffIcon />;
    }

    return (
      <Button mini onClick={this.handleToggleShow} variant="fab" className={classes.fab} color="primary">
        {icon}
      </Button>
    );
  }

  render() {
    const { classes, theme, tabsStore } = this.props;
    const { value, hidden } = this.state;
    const selectedTab = tabsStore.tabs[value];
    if (!selectedTab) {
      return null;
    }

    const styles = {
      background: selectedTab.bgColor,
      display: `${ hidden ? 'none' : '' }`
    }

    const slideStyles = {
    }

    return(
      <React.Fragment>
        <div className={classes.root} style={styles}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="on"
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
        {this.renderToggleShowButton()}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BetterInformationPanel);
