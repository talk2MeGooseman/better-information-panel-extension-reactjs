import {
  observable,
  computed,
  reaction,
  action
} from "mobx"
import TabModel from "../model/TabModel";
import { uuid } from "../../services/Utils";
import {
  setPanelInformation,
  getPanelInformation
} from "../../services/Ebs";

export default class TabsStore {
  @observable tabs = [];
  @observable token;
  @observable saveState = "pending";

  @computed get tabCount() {
    return this.tabs.length;
  }

  addTab() {
    this.tabs.push(TabModel.fromJS(this, {
      id: uuid(),
      title: 'Title',
      textColor: '#000000',
      bgColor: '#ffffff',
      body: 'Info Here',
    }));
  }

  @action
  fetchTabs() {
    this.state = "pending"
    getPanelInformation(this.token).then(
      // inline created action
      action("fetchSuccess", result => {
        this.tabs = result.tabs.map((tab) => {
          return TabModel.fromJS(this, tab);
        })

        this.state = "done"
      }),
      // inline created action
      action("fetchError", error => {
        this.state = "error"
      })
    )
  }

  @action
  saveTabs() {
    this.state = "pending"
    setPanelInformation(this.token, this.toJS()).then(
      // inline created action
      action("fetchSuccess", result => {
        this.state = "done"
      }),
      // inline created action
      action("fetchError", error => {
        this.state = "error"
      })
    )
  }

  toJS() {
    return this.tabs.map((tab) => {
      return tab.toJS();
    });
  }
}
