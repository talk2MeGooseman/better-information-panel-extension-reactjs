import { observable, makeObservable } from 'mobx';

export default class TabModel {
  store;
  id;
  title;
  textColor;
  bgColor;
  body;

  constructor(store, id, title, textColor, bgColor, body) {
    this.store = store;
    this.id = id;
    this.title = title;
    this.textColor = textColor;
    this.bgColor = bgColor;
    this.body = body;

    makeObservable(this, {
      title: observable,
      textColor: observable,
      bgColor: observable,
      body: observable
    });
  }

  static fromJS(store, {id, title, textColor, bgColor, body}) {
    return new TabModel(store, id, title, textColor, bgColor, body);
  }

  canDestroy() {
    return this.store.tabs.length > 1;
  }

  destroy() {
    this.store.tabs.remove(this);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      textColor: this.textColor,
      bgColor: this.bgColor,
      body: this.body,
    };
  }
}
