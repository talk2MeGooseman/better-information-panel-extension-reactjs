import { observable, computed, action, makeObservable } from "mobx";
import TabModel from "../model/TabModel";
import { uuid } from "../../services/Utils";
import {
  setPanelInformation,
  getPanelInformation
} from "../../services/Ebs";
import {
  DEFAULT_BODY_TEXT,
  ACTIVE_STEP_1,
  ACTIVE_STEP_2,
  ACTIVE_STEP_3,
  ACTIVE_STEP_4,
} from "../../services/constants";

export default class TabsStore {
  tabs = [];
  token = null;
  saveState = "";
  loadingState = "pending";
  activeStep = ACTIVE_STEP_1;
  videoOverlayHeight = '80vh';
  videoComponentVisibility = true;
  videoComponentTransparent = true;
  videoToggleImageUrl = '';
  videoToggleButtonPosition = '';
  tabIndex = 0;

  constructor() {
    makeObservable(this, {
      tabs: observable,
      token: observable,
      saveState: observable,
      loadingState: observable,
      activeStep: observable,
      videoOverlayHeight: observable,
      videoComponentVisibility: observable,
      videoComponentTransparent: observable,
      videoToggleImageUrl: observable,
      videoToggleButtonPosition: observable,
      tabIndex: observable,
      tabCount: computed,
      fetchTabs: action,
      updateTabs: action,
      saveTabs: action
    });
  }

  get tabCount() {
    return this.tabs.length;
  }

  setVideoComponentVisability(value) {
    this.saveState = '';
    this.videoComponentVisibility = value;
  }

  setVideoComponentTransparency(value) {
    this.saveState = '';
    this.videoComponentTransparent = value;
  }

  setVideoToggleImageUrl(value) {
    this.saveState = '';
    this.videoToggleImageUrl = value;
  }

  setVideoToggleButtonPosition(value) {
    this.saveState = '';
    this.videoToggleButtonPosition = value;
  }

  addTab() {
    this.saveState = '';

    if (this.activeStep === ACTIVE_STEP_1) {
      this.activeStep = ACTIVE_STEP_2;
    }

    this.tabs.push(TabModel.fromJS(this, {
      id: uuid(),
      title: 'Add Title',
      textColor: '#000000',
      bgColor: '#ffffff',
      body: DEFAULT_BODY_TEXT,
    }));
  }

  fetchTabs() {
    this.loadingState = "pending"
    getPanelInformation(this.token).then(
      // inline created action
      action("fetchSuccess", result => {
        this.loadingState = "done"
        if (!result.tabs) {
          this.addTab();
          return;
        }

        this.activeStep = ACTIVE_STEP_4;

        // Check if the setting are defined from server, could be undefined
        // And screw shit up, use default state
        if (result.videoComponentTransparent !== undefined) {
          this.videoComponentTransparent = result.videoComponentTransparent;
        }
        if (result.videoComponentVisibility !== undefined) {
          this.videoComponentVisibility = result.videoComponentVisibility;
        }
        if (result.videoToggleButtonPosition !== undefined) {
          this.videoToggleButtonPosition = result.videoToggleButtonPosition;
        }
        if (result.videoToggleImageUrl !==  undefined) {
          this.videoToggleImageUrl = result.videoToggleImageUrl;
        }

        this.tabs = result.tabs.map((tab) => {
          return TabModel.fromJS(this, tab);
        })
      }),
      // inline created action
      action("fetchError", error => {
        this.loadingState = "error"
      })
    )
  }

  updateTabs() {
    getPanelInformation(this.token).then(
      // inline created action
      action("fetchSuccess", result => {
        if (!result.tabs) {
          this.addTab();
          return;
        }
        this.activeStep = ACTIVE_STEP_4;
        this.tabs = result.tabs.map((tab) => {
          return TabModel.fromJS(this, tab);
        })
      }),
      // inline created action
      action("fetchError", error => {
        this.loadingState = "error"
      })
    )
  }

  saveTabs() {
    this.saveState = "pending"
    setPanelInformation(this.token, this.toJSON()).then(
      // inline created action
      action("fetchSuccess", result => {
        this.saveState = "done"
        this.activeStep = ACTIVE_STEP_4;
      }),
      // inline created action
      action("fetchError", error => {
        this.saveState = "error"
      })
    )
  }

  toJSON() {
    let jTabs = this.tabs.map((tab) => {
      return tab.toJSON();
    });

    return {
      tabs: jTabs,
      videoComponentVisibility: this.videoComponentVisibility,
      videoComponentTransparent: this.videoComponentTransparent,
      videoToggleImageUrl: this.videoToggleImageUrl,
      videoToggleButtonPosition: this.videoToggleButtonPosition,
    };
  }
}
