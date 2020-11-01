import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem";

const navItems = () => (
  <ul className={classes.Navitems}>
    <NavItem link="/" exact>
      Burger Builder
    </NavItem>
    <NavItem link="/orders" exact>
      Orders
    </NavItem>
  </ul>
);

export default navItems;
