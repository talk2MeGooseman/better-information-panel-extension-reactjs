import React from "react";
import { shallow, mount } from "enzyme";

import ColorPicker from "../ColorPicker";

describe('ColorPicker', () => {
  let fnSpy;

  beforeEach(() => {
    fnSpy = jest.fn();
  })

  it('matches default state snapshot', () => {
    const wrapper = mount(<ColorPicker handleChange={fnSpy} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('displays prop color swatch #ffffff', () => {
    const wrapper = mount(<ColorPicker color="#ffffff" handleChange={fnSpy} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should open the ChromePicker on swatch click', () => {
    const wrapper = mount(<ColorPicker color="#ffffff" handleChange={fnSpy} />);
    expect(wrapper.find('.popover').length).toEqual(0);
    wrapper.find('.color-swatch').simulate('click');
    expect(wrapper.find('.popover').length).toEqual(1);
  });


  it('should open and close the ChromePicker onClick', () => {
    const wrapper = mount(<ColorPicker color="#ffffff" handleChange={fnSpy} />);
    expect(wrapper.find('.popover').length).toEqual(0);
    wrapper.find('.color-swatch').simulate('click');
    expect(wrapper.find('.popover').length).toEqual(1);
    wrapper.find('.closePopover').simulate('click');
    expect(wrapper.find('.popover').length).toEqual(0);
  });

});