import React from "react";
import { createShallow, createMount} from '@material-ui/core/test-utils';

import TabsEditor from "../TabsEditor";
import TabsStore from "../../mobx/state/TabsStore";

describe('TabsEditor', () => {
  let tabsStore, tab, shallow, mount;

  afterEach(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    shallow = createShallow({
      untilSelector: 'Tab'
    });
    mount = createMount();
    tabsStore = new TabsStore();
    tabsStore.addTab();
    tab = tabsStore.tabs[0];
    tab.id = "1";
  });

  it('match snapshot in default state', () => {
    let wrapper = shallow(<TabsEditor tabsStore={tabsStore} />)
    expect(wrapper).toMatchSnapshot();
  });

  it("should display tab with its title and editor", () => {
    let wrapper = shallow(<TabsEditor tabsStore={tabsStore} />)
    expect(wrapper.find({ label: 'Add Title' }).exists()).toBeTruthy();
    tab.title = 'Lame';
    wrapper.update();
    expect(wrapper.find({ label: 'Lame' }).exists()).toBeTruthy();
    expect(wrapper.find('Editor').length).toEqual(1);
  });

  it("should display a tab and editor for each tab in store", () => {
    tabsStore.addTab();
    let wrapper = shallow(<TabsEditor tabsStore={tabsStore} />)
    expect(wrapper.find({ label: 'Add Title' }).length).toEqual(2);
    expect(wrapper.find('Editor').length).toEqual(2);
  });
});