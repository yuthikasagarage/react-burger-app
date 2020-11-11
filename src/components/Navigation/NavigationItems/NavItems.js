import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem";

const navItems = (props) => (
  <ul className={classes.Navitems}>
    <NavItem link="/" exact>
      Burger Builder
    </NavItem>
    {props.isAuthenticated ? (
      <NavItem link="/orders" exact>
        Orders
      </NavItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavItem link="/auth" exact>
        Authentication
      </NavItem>
    ) : (
      <NavItem link="/logout" exact>
        Logout
      </NavItem>
    )}
  </ul>
);

export default navItems;
