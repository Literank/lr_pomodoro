import { useEffect, useRef, useState } from "react";
import "./App.css";
import { formatTime } from "./util";

const POMODORO_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;
const PHASE_POMODORO = 0;
const PHASE_BREAK = 1;

function App() {
  const [seconds, setSeconds] = useState(POMODORO_SECONDS);
  const [ticking, setTicking] = useState(false);
  const [phase, setPhase] = useState(PHASE_POMODORO);

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

  const resetTimer = (phase) => {
    stopTimer();
    setSeconds(phase === PHASE_POMODORO ? POMODORO_SECONDS : BREAK_SECONDS);
  };

  const toggleTimer = () => {
    if (ticking) {
      // Clicked "Pause"
      stopTimer();
    } else {
      if (seconds === 0) {
        // Clicked "Next"
        skipPhase();
      } else {
        // Clicked "Start"
        startTimer();
      }
    }
  };

  const pickPhase = (phase) => {
    const secBg = "secondary-bg";
    if (phase === PHASE_POMODORO) {
      document.body.classList.remove(secBg);
    } else {
      document.body.classList.add(secBg);
    }
    setPhase(phase);
    resetTimer(phase);
  };

  const skipPhase = () => {
    const newPhase = (phase + 1) % 2;
    pickPhase(newPhase);
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
        <span
          className={`segment left-seg ${
            phase === PHASE_POMODORO ? "picked" : ""
          }`}
          onClick={() => pickPhase(PHASE_POMODORO)}
        >
          Pomodoro
        </span>
        <span
          className={`segment right-seg ${
            phase === PHASE_BREAK ? "picked" : ""
          }`}
          onClick={() => pickPhase(PHASE_BREAK)}
        >
          Break
        </span>
      </div>
      <div className="card">
        <h1 className="timer">{formatTime(seconds)}</h1>
        <div>
          <button
            className={`control-btn ${
              phase === PHASE_BREAK ? "secondary-control-btn" : ""
            }`}
            onClick={toggleTimer}
          >
            {ticking ? "Pause" : seconds === 0 ? "Next" : "Start"}
          </button>
        </div>
        <span className="skip-btn" onClick={skipPhase}>
          skip
        </span>
      </div>
      <div className="settings">
        <span className="setting-btn" onClick={() => resetTimer(phase)}>
          Reset
        </span>
        <span className="setting-btn">Settings</span>
      </div>
    </div>
  );
}

export default App;
