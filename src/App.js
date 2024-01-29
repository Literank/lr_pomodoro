import { useEffect, useRef, useState } from "react";
import "./App.css";
import { formatTime } from "./util";

const POMODORO_SECONDS = 25 * 60;

function App() {
  const [seconds, setSeconds] = useState(POMODORO_SECONDS);
  const [ticking, setTicking] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      stopTimer();
      alarm();
    }
  }, [seconds]);

  // use the `useRef` hook to create a mutable object that persists across renders
  const intervalIdRef = useRef(null);

  const startTimer = () => {
    setTicking(true);
    intervalIdRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
  };

  const stopTimer = () => {
    setTicking(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(POMODORO_SECONDS);
  };

  const toggleTimer = () => {
    if (ticking) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const alarm = () => {
    // TODO: play some sound
    console.log("Time's up!");
  };
  return (
    <div className="app">
      <h1 className="app-name">
        Literank
        <br />
        Pomodoro
      </h1>
      <div className="segments">
        <span className="segment left-seg picked">Pomodoro</span>
        <span className="segment right-seg">Break</span>
      </div>
      <div className="card">
        <h1 className="timer">{formatTime(seconds)}</h1>
        <button className="control-btn" onClick={toggleTimer}>
          {ticking ? "Pause" : "Start"}
        </button>
      </div>
      <div className="settings">
        <span className="setting-btn" onClick={resetTimer}>
          Reset
        </span>
        <span className="setting-btn">Settings</span>
      </div>
    </div>
  );
}

export default App;
