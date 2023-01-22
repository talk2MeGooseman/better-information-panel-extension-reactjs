import React, { Children } from "react";
import { createShallow, createMount} from '@material-ui/core/test-utils';


import InfoTabForm from "../InfoTabForm";
import TabsStore from "../../mobx/state/TabsStore";

describe('InfoTabForm', () => {
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
  });

  it('matches default state snapshot', () => {
    const wrapper = mount(<InfoTabForm tabsStore={tabsStore} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('adds a tab on button press', () => {
    const wrapper = mount(<InfoTabForm tabsStore={tabsStore} />);
    expect(wrapper.find('FormControl').children().length).toEqual(1);
    expect(tabsStore.tabCount).toEqual(0);
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('FormControl').children().length).toEqual(2);
    expect(tabsStore.tabCount).toEqual(1);
  });

});