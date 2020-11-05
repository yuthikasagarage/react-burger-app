import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../../containers/Checkout/ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  CheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to="/"></Redirect>;

    if (this.props.ings) {
      const purchasedRiderct = this.props.purchased ? (
        <Redirect to="/"></Redirect>
      ) : null;
      summary = (
        <div>
          {purchasedRiderct}
          <CheckoutSummary
            ingredients={this.props.ings}
            CheckoutContinued={this.CheckoutContinuedHandler}
            CheckoutCancelled={this.CheckoutCancelledHandler}
          ></CheckoutSummary>
        </div>
      );
    }
    return (
      <div>
        {summary}

        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
