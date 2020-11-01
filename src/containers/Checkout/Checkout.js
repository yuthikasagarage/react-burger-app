import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../../containers/Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPricey: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPricey: price });
  }

  CheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          CheckoutContinued={this.CheckoutContinuedHandler}
          CheckoutCancelled={this.CheckoutCancelledHandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients_={this.state.ingredients}
              price={this.state.totalPricey}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
