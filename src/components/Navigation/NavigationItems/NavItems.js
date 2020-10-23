import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem";

const navItems = () => (
  <ul className={classes.Navitems}>
    <NavItem link="/" activated="true">
      Burger Builder
    </NavItem>
    <NavItem link="/" activated="false">
      Checkout
    </NavItem>
  </ul>
);

export default navItems;
