import React from "react";
import { shallow, mount } from "enzyme";

import ProgressBar from "../ProgressBar";

describe('ProgressBar', () => {
  it('matches default state snapshot', () => {
    const wrapper = mount(<ProgressBar tabsStore={{}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set step 2 active', () => {
    let tabsStore = {
      activeStep: 2
    };
    const wrapper = mount(<ProgressBar tabsStore={tabsStore} />);
    expect(wrapper).toMatchSnapshot();
  });
});