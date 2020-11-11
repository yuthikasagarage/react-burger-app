import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavItems from "../../Navigation/NavigationItems/NavItems";
import Menu from "../Menu/Menu";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Menu clicked={props.visibleSideDrawer}></Menu>
    <Logo height="40%" />
    <nav className={classes.DesktopOnly}>
      <NavItems isAuthenticated={props.isAuth}></NavItems>
    </nav>
  </header>
);

export default toolbar;
