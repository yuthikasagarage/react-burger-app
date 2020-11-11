import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";
import classesB from "./OrderButton.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const buildcontrols = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price = <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        substracted={() => props.ingredientSubstracted(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      ></BuildControl>
    ))}

    <button
      className={classesB.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP"}
    </button>
  </div>
);

export default buildcontrols;
