import {
  observable,
  computed,
  action,
} from "mobx"
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
  @observable tabs = [];
  @observable token;
  @observable saveState = "";
  @observable loadingState = "pending";
  @observable activeStep = ACTIVE_STEP_1;
  @observable videoOverlayHeight = '80vh';
  @observable videoComponentVisibility = true;

  @computed get tabCount() {
    return this.tabs.length;
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

  @action
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

  @action
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

  @action
  saveTabs() {
    this.saveState = "pending"
    setPanelInformation(this.token, this.toJS()).then(
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

  toJS() {
    return this.tabs.map((tab) => {
      return tab.toJS();
    });
  }
}
