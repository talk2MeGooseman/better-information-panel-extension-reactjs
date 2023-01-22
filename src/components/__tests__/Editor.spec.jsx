import React from "react";
import { createShallow, createMount} from '@material-ui/core/test-utils';


import Editor from "../Editor";
import TabsStore from "../../mobx/state/TabsStore";

describe('Editor', () => {
  let tabsStore, shallow, mount;

  afterEach(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    shallow = createShallow({
      dive: true
    });
    mount = createMount();
    tabsStore = new TabsStore();
    tabsStore.addTab();
    tabsStore.tabs[0].body = "";
  });

  it('matches default state snapshot', () => {
    const wrapper = shallow(<Editor tab={tabsStore.tabs[0]} tabsStore={tabsStore} />);
    expect(wrapper).toMatchSnapshot();
  });

  xit('should not add preview to toolbar by default', () => {
    const wrapper = shallow(<Editor tab={tabsStore.tabs[0]} tabsStore={tabsStore} />);
    let props = wrapper.find('SimpleMDEEditor').props();
    expect(props).toEqual();
  });

});