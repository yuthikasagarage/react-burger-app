import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.8,
  cheese: 0.7,
  bacon: 0.8,
  meat: 0.9,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasesState(updatedIngredients);
  };

  substractIngredients = (type) => {
    let updatedCount;
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceSubtract = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtract;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasesState(updatedIngredients);
  };

  updatePurchasesState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    console.log("this is the sum" + sum);

    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("Continue");
  };

  render() {
    const disableInfo = { ...this.state.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          ></OrderSummary>
        </Modal>

        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          ingredientAdded={this.addIngredientsHandler}
          ingredientSubstracted={this.substractIngredients}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        ></BuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;
