import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavItems from "./NavItems";
import NavItem from "./NavItem";
import React from "react";

configure({ adapter: new Adapter() });

describe("<NavItems test/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it("should render two navItem elements if not authenticated", () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it("should render three navItem elements if not authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it("should render three navItem elements if not authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(
        <NavItem link="/logout" exact>
          Logout
        </NavItem>
      )
    ).toEqual(true);
  });
});
