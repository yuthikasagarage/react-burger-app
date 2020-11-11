import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../../Navigation/NavigationItems/NavItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop shows={props.open} clicked={props.closed}></Backdrop>
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <Logo height="6%"></Logo>

        <nav>
          <NavItems isAuthenticated={props.isAuth}></NavItems>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
