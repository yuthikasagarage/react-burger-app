import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
export const addIngredient = (name) => {
  return {
    ingredientName: name,
    type: actionTypes.ADD_INGREDIENT,
  };
};

export const removeIngredient = (name) => {
  return {
    ingredientName: name,
    type: actionTypes.REMOVE_INGREDIENT,
  };
};

export const setIngredients = (name) => {
  return {
    ingredientNames: name,
    type: actionTypes.SET_INGREDIENT,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-my-burger-7b9ce.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};
