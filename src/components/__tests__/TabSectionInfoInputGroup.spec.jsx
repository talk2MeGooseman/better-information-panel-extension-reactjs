import React from "react";
import { createShallow, createMount} from '@material-ui/core/test-utils';

import TabSectionInfoInputGroup from "../TabSectionInfoInputGroup";
import TabsStore from "../../mobx/state/TabsStore";

describe('TabSectionInfoInputGroup', () => {
  let tabsStore, tab, shallow, mount;

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
    tab = tabsStore.tabs[0];
  });

  it('matches default state snapshot', () => {
    const wrapper = shallow(<TabSectionInfoInputGroup index={1} tabData={tab} tabsStore={tabsStore} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('sets form values from tab settings', () => {
    tab.title = "Hey";
    tab.textColor = "#505050";
    tab.bgColor = "#444444";

    const wrapper = shallow(<TabSectionInfoInputGroup tabData={tab} tabsStore={tabsStore} />);
    expect(wrapper.find('TextField').prop('value')).toEqual('Hey');
    expect(wrapper.find('ColorPicker').at(0).prop('color')).toEqual('#505050');
    expect(wrapper.find('ColorPicker').at(1).prop('color')).toEqual('#444444');
  });

  it('title onChange updates store tab title', () => {
    tab.title = "Hey";

    const wrapper = shallow(<TabSectionInfoInputGroup tabData={tab} tabsStore={tabsStore} />);
    let field = wrapper.find('TextField').first()
    field.simulate('change', {
      target: {
        value: "Bubba Gump Shrimp"
      }
    });
    expect(tab.title).toEqual("Bubba Gump Shrimp");
  });

  it('delete should be disabled if only 1 tab', () => {
    const wrapper = mount(<TabSectionInfoInputGroup tabData={tab} tabsStore={tabsStore} />);
    expect(wrapper.find('CardHeader').first().prop('action')).toBeNull();
  });

  it('delete should be enabled if more then one tab', () => {
    tabsStore.addTab();
    const wrapper = mount(<TabSectionInfoInputGroup tabData={tab} tabsStore={tabsStore} />);
    expect(wrapper.find('CardHeader').first().prop('action')).not.toBeNull();
  });

  it('click delete should remove tab', () => {
    tabsStore.addTab();
    const wrapper = mount(<TabSectionInfoInputGroup tabData={tab} tabsStore={tabsStore} />);
    expect(tabsStore.tabCount).toEqual(2);
    wrapper.find('IconButton').simulate('click');
    expect(tabsStore.tabCount).toEqual(1);
  });
});