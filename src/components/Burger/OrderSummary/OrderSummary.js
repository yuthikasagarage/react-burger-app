import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igkey) => {
    return (
      <li key={igkey}>
        {" "}
        <span style={{ textTransform: "capitalize" }}>{igkey}</span> :{" "}
        {props.ingredients[igkey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3> Your Order</h3>
      <p> A delicious order</p>
      <ul>{ingredientSummary}</ul>
      <p> Continue to Checkout</p>
      <div>
        <strong> Total Price : {props.price.toFixed(2)}</strong>
      </div>

      <Button buttonType="Danger" clicked={props.purchaseCancelled}>
        {" "}
        Cancel
      </Button>
      <Button buttonType="Success" clicked={props.purchaseContinued}>
        {" "}
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
