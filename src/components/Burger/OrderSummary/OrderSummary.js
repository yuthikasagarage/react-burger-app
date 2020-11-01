import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("[OrderSummar] will update");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igkey) => {
        return (
          <li key={igkey}>
            {" "}
            <span style={{ textTransform: "capitalize" }}>{igkey}</span> :{" "}
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3> Your Order</h3>
        <p> A delicious order</p>
        <ul>{ingredientSummary}</ul>
        <p> Continue to Checkout</p>
        <div>
          <strong> Total Price : {this.props.price.toFixed(2)}</strong>
        </div>

        <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>
          {" "}
          Cancel
        </Button>
        <Button buttonType="Success" clicked={this.props.purchaseContinued}>
          {" "}
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
