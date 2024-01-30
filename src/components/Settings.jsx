import React from "react";
import "./Settings.css";
import Switch from "./Switch";

const Settings = (props) => {
  return (
    <div className="wrapper" hidden={!props.show}>
      <div className="settings-container">
        <h2>Settings</h2>
        <div className="setting-item-container">
          <span className="item-title">Timer</span>
          <div>
            <label>
              <input
                type="radio"
                name="timerStyle"
                value="numbers"
                checked={!props.settings.useCircle}
                onChange={(e) =>
                  props.setSettings({ ...props.settings, useCircle: false })
                }
              />
              Numbers
            </label>
            <label className="label">
              <input
                type="radio"
                name="timerStyle"
                value="circles"
                checked={props.settings.useCircle}
                onChange={(e) =>
                  props.setSettings({ ...props.settings, useCircle: true })
                }
              />
              Circles
            </label>
          </div>
        </div>
        <div className="setting-item-container">
          <span className="item-title">Sound</span>
          <div>
            <Switch
              isSwitchOn={props.settings.soundOn}
              toggleSwitch={() => {
                props.setSettings({
                  ...props.settings,
                  soundOn: !props.settings.soundOn,
                });
              }}
            />
          </div>
        </div>
        <button
          className="control-btn small-btn"
          onClick={() => props.hideIt()}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Settings;
