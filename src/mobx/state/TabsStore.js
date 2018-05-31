import {
  observable,
  computed,
  reaction
} from "mobx"
import TabModel from "../model/TabModel";
import { uuid } from "../../services/Utils";

export default class TabsStore {
  @observable tabs = [];

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

  toJS() {
    return this.tabs.map((tab) => {
      return tab.toJS();
    });
  }
}
