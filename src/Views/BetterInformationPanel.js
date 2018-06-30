import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import {
  COMPONENT_ANCHOR,
  SHOWDOWN_CONFIG,
  TABS_HEIGHT,
  CONFIG_PREVIEW_HEIGHT,
  PANEL_FADE_OUT_DELAY,
  WEB_PLATFORM,
} from "../services/constants";

import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Tooltip from '@material-ui/core/Tooltip';

import * as Showdown from "showdown";
import ReactHtmlParser from 'react-html-parser';

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
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  }
});

@observer
class BetterInformationPanel extends Component {
  static propTypes = {
    tabsStore: PropTypes.object.isRequired,
    viewAnchor: PropTypes.string,
    configPreview: PropTypes.bool,
    viewPlatform: PropTypes.string,
  };

  state = {
    value: 0,
    isVisible: true,
  };

  constructor(props) {
    super(props);
    this.converter = new Showdown.Converter(SHOWDOWN_CONFIG);
  }


  /**
   *Life cycle handler for mobx state changes
   *
   * @memberof BetterInformationPanel
   */
  componentWillReact() {
    let { tabsStore } = this.props;

    // Check if the user deleted the tab index we are currently focused on
    // If they did then move to the next tab over
    if (this.state.value >= tabsStore.tabCount) {
      this.setState({ value: tabsStore.tabCount - 1 });
    }
  }

  initOnEnterHandler() {
    document.body.addEventListener("mouseenter", (event) => {
      window.Twitch.ext.rig.log('Mouse Entered');

      // Clear the timer if the user interacts with the component
      // Before it fires off
      if (this.timerID) {
        clearTimeout(this.timerID);
      }

      document.body.classList.remove('transparent');
    });
  }

  initOnLeaveHandler() {
    document.body.addEventListener("mouseleave", (event) => {
      window.Twitch.ext.rig.log('Mouse Exit');
      document.body.classList.add('transparent');
    });
  }

  setComponentVisibility() {
    let { tabsStore } = this.props;

    let isVisible = tabsStore.videoComponentVisibility;

    this.setState({
      isVisible: isVisible,
    });
  }

  setComponentTransparency() {
    let { tabsStore } = this.props;

    if (tabsStore.videoComponentTransparent) {
      // Make transparent after a fixed amount of time after first load
      this.timerID = setTimeout(() => {
        this.timerID = null;
        document.body.classList.add("transparent");
      }, PANEL_FADE_OUT_DELAY);

      this.initOnEnterHandler();
      this.initOnLeaveHandler();
    }
  }

  componentWillMount() {
    let { viewAnchor, viewPlatform } = this.props;

    if (viewAnchor === COMPONENT_ANCHOR && viewPlatform === WEB_PLATFORM) {
      this.setComponentTransparency();
      this.setComponentVisibility();
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleToggleShow = () => {
    this.setState({
      isVisible: !this.state.isVisible, 
    });
  }

  markdownToHtml(markdown) {
    return ReactHtmlParser(this.converter.makeHtml(markdown), {
      transform: (node) => {
        if (node.type === 'tag' && node.name === 'a')
        {
          return <p>Sorry links not allowed, Twitch Rules :(</p>;
        }
        if (node.type === 'script' && node.name === 'script')
        {
          return <p>No Scripts Tags Allowed!</p>;
        }
      }
    })
  }

  renderTabs() {
    let { classes, tabsStore } = this.props;
    return tabsStore.tabs.map((tab) => {
      return <Tab key={tab.id} label={tab.title} classes={{ root: classes.tabRoot }} />
    });
  }

  renderTabBody() {
    const { tabsStore, classes, configPreview, viewAnchor, viewPlatform } = this.props;
    
    return tabsStore.tabs.map((tab) => {
      let styles = {
        color: tab.textColor,
        background: tab.bgColor,
      };

      if (viewAnchor === COMPONENT_ANCHOR && viewPlatform === WEB_PLATFORM) {
        styles['height'] = tabsStore.videoOverlayHeight;
      } else if (configPreview) {
        styles['height'] = CONFIG_PREVIEW_HEIGHT;
      } else {
        let totalHeight = window.innerHeight;
        styles['height'] = totalHeight - TABS_HEIGHT + 'px';
      }

      return (
        <div key={tab.id} style={styles} className={classes.tabBody}>
          {this.markdownToHtml(tab.body)}
        </div>
      );
    });
  }

  renderToggleShowButton() {
    const { classes, viewAnchor, viewPlatform } = this.props;
    let icon = <VisibilityIcon />;
    let tooltipText = "Hide";

    if (viewAnchor !== COMPONENT_ANCHOR || viewPlatform !== WEB_PLATFORM) {
      return;
    }

    if (!this.state.isVisible) {
      icon = <VisibilityOffIcon />;
      tooltipText = "Show";
    }

    return (
      <Tooltip id="tooltip-top" title={tooltipText} placement="top">
        <Button mini onClick={this.handleToggleShow} variant="fab" className={classes.fab} color="primary">
          {icon}
        </Button>
      </Tooltip>
    );
  }

  render() {
    const { classes, theme, tabsStore } = this.props;
    const { value, isVisible } = this.state;
    const selectedTab = tabsStore.tabs[value];

    if (!selectedTab) {
      return <p>Couldn't find configuration</p>;
    }

    const styles = {
      background: selectedTab.bgColor,
      visibility: `${ isVisible ? '' : 'hidden' }`
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
              scrollable={true}
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
