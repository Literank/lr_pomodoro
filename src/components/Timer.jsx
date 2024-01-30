import React from "react";
import "./Timer.css";
import { formatTime } from "../util";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = (props) => {
  const primaryColor = "coral";
  return (
    <div>
      {props.useCircle ? (
        <div className="circle-wrapper">
          <CircularProgressbar
            value={props.percentage}
            maxValue={1}
            text={formatTime(props.seconds)}
            styles={{
              path: {
                stroke: primaryColor,
              },
              trail: {
                stroke: "rgba(255, 255, 255, 0.5)",
              },
              text: {
                fill: "white",
              },
            }}
          />
        </div>
      ) : (
        <h1 className="timer">{formatTime(props.seconds)}</h1>
      )}
    </div>
  );
};

export default Timer;
