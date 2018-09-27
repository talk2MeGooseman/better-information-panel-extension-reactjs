import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import {
  COMPONENT_ANCHOR,
  TABS_HEIGHT,
  CONFIG_PREVIEW_HEIGHT,
  PANEL_FADE_OUT_DELAY,
  WEB_PLATFORM,
} from "../services/constants";
import MarkdownToHtml from "../services/MarkdownToHtml";

import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AvatarButton from '../components/AvatarButton';

const styles = theme => ({
  root: {
    background: '#fff'
  },
  tabRoot: {
    minWidth: theme.spacing.unit * 8,
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
    this.componentRoot = React.createRef();
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

  componentWillUnmount() {
    this.componentRoot.current.removeEventListener("mouseenter", this.onMouseEnter);
    this.componentRoot.current.removeEventListener("mouseleave", this.onMouseLeave);
    this.componentRoot.current.classList.remove('transparent');
  }

  onMouseEnter = (event) => {
    window.Twitch.ext.rig.log('Mouse Entered');

    // Clear the timer if the user interacts with the component
    // Before it fires off
    if (this.timerID)
    {
      clearTimeout(this.timerID);
    }

    if (this.componentRoot) {
      this.componentRoot.current.classList.remove('transparent');
    }
  }

  onMouseLeave = (event) => {
    window.Twitch.ext.rig.log('Mouse Exit');

    if (this.componentRoot) {
      this.componentRoot.current.classList.add('transparent');
    }
  }

  initOnEnterHandler() {
    this.componentRoot.current.addEventListener("mouseenter", this.onMouseEnter);
  }

  initOnLeaveHandler() {
    this.componentRoot.current.addEventListener("mouseleave", this.onMouseLeave);
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
        this.componentRoot.current.classList.add("transparent");
      }, PANEL_FADE_OUT_DELAY);

      this.initOnEnterHandler();
      this.initOnLeaveHandler();
    }
  }

  componentDidMount() {
    let { viewAnchor, viewPlatform } = this.props;

    if (viewAnchor === COMPONENT_ANCHOR && viewPlatform === WEB_PLATFORM) {
      this.setComponentTransparency();
      this.setComponentVisibility();
    }
  }

  handleChange = (event, value) => {
    let { tabsStore } = this.props;
    // this.setState({ value });
    tabsStore.tabIndex = value;
  };

  handleChangeIndex = index => {
    let { tabsStore } = this.props;
    tabsStore.tabIndex = index;
  };

  handleToggleShow = () => {
    this.setState({
      isVisible: !this.state.isVisible, 
    });
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
          {MarkdownToHtml(tab.body)}
        </div>
      );
    });
  }

  renderToggleShowButton() {
    const { viewAnchor, viewPlatform, tabsStore } = this.props;

    if (viewAnchor !== COMPONENT_ANCHOR || viewPlatform !== WEB_PLATFORM) {
      return;
    }

    return (
      <AvatarButton
        handleToggleShow={this.handleToggleShow}
        videoToggleImageUrl ={tabsStore.videoToggleImageUrl}
        isVisible={this.state.isVisible}
        fab={tabsStore.videoToggleButtonPosition}
      />
    );
  }

  render() {
    const { classes, theme, tabsStore } = this.props;
    const { isVisible } = this.state;
    const selectedTab = tabsStore.tabs[tabsStore.tabIndex];

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
      <div ref={this.componentRoot}>
        <div className={classes.root} style={styles}>
          <AppBar position="static" color="default">
            <Tabs
              value={tabsStore.tabIndex}
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
            index={tabsStore.tabIndex}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={slideStyles}
          >
            {this.renderTabBody()}
          </SwipeableViews>
        </div>
        {this.renderToggleShowButton()}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BetterInformationPanel);
