import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const buildcontrols = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((ctrl) => (
      <BuildControl key={ctrl.label} label={ctrl.label}></BuildControl>
    ))}
  </div>
);

export default buildcontrols;
