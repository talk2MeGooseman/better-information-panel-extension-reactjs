import { observable, computed, reaction } from "mobx"

export default class TabsStore {
    @observable tabs = [];

    @computed get tabCount() {
        return this.tabs.length;
    }

    addTab(tabData) {
        this.tabs.push(tabData);
    }
}