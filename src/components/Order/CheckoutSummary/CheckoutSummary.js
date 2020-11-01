import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.checkoutSummary}>
      <h1 style={{ textAlign: "center" }}>We Hope You Enjoy</h1>

      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button buttonType="Danger" clicked={props.CheckoutCancelled}>
          Cancel
        </Button>
        <Button buttonType="Success" clicked={props.CheckoutContinued}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
