import React from "react";
import "./Swtich.css";

const Switch = (props) => {
  return (
    <label className="switch-container">
      <input
        type="checkbox"
        className="switch-checkbox"
        checked={props.isSwitchOn}
        onChange={props.toggleSwitch}
      />
      <div className={`switch-label ${props.isSwitchOn ? "switch-on" : ""}`}>
        <div className="switch-handle"></div>
      </div>
    </label>
  );
};

export default Switch;
