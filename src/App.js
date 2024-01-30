import { useEffect, useRef, useState } from "react";
import "./App.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import { Howl, Howler } from "howler";

const POMODORO_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;
const PHASE_POMODORO = 0;
const PHASE_BREAK = 1;

// Sounds from https://pixabay.com/sound-effects/search/tick-tock/
const SOUNDS = {
  tick: process.env.PUBLIC_URL + "/tick.mp3",
  alarm: process.env.PUBLIC_URL + "/alarm.mp3",
  button: process.env.PUBLIC_URL + "/button.mp3",
};
const DEFAULT_SETTING = {
  useCircle: true,
  soundOn: true,
};

function App() {
  const [seconds, setSeconds] = useState(POMODORO_SECONDS);
  const [ticking, setTicking] = useState(false);
  const [phase, setPhase] = useState(PHASE_POMODORO);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTING);

  useEffect(() => {
    if (seconds === 0) {
      stopTimer();
      // Hacking for Howler.stop() method
      setTimeout(() => {
        // alarm
        playShortSound(SOUNDS.alarm);
      }, 10);
    }
  }, [seconds]);

  useEffect(() => {
    if (ticking) {
      playLoopSound(SOUNDS.tick);
    } else {
      stopSound(tickSoundIdRef.current);
    }
  }, [ticking]);

  useEffect(() => {
    Howler.mute(!settings.soundOn);
  }, [settings.soundOn]);

  // use the `useRef` hook to create a mutable object that persists across renders
  const intervalIdRef = useRef(null);
  const tickSoundIdRef = useRef(null);

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
    playShortSound(SOUNDS.button);
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

  const calcPercentage = () => {
    const duration =
      phase === PHASE_POMODORO ? POMODORO_SECONDS : BREAK_SECONDS;
    return seconds / duration;
  };

  const skippable = () => {
    const percentage = calcPercentage();
    return percentage < 1 && percentage > 0;
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
    playShortSound(SOUNDS.button);
    const newPhase = (phase + 1) % 2;
    pickPhase(newPhase);
  };

  const playLoopSound = (url) => {
    const sound = new Howl({
      src: [url],
      loop: true,
    });
    tickSoundIdRef.current = sound.play();
  };

  const playShortSound = (url) => {
    const sound = new Howl({
      src: [url],
    });
    sound.play();
  };

  const stopSound = (soundId) => {
    if (soundId) {
      Howler.stop(soundId);
    }
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
        <Timer
          seconds={seconds}
          percentage={calcPercentage()}
          useCircle={settings.useCircle}
        />
        <div>
          <button
            className={`control-btn ${
              phase === PHASE_BREAK ? "secondary-control-btn" : ""
            } ${ticking ? "pushed" : ""}`}
            onClick={toggleTimer}
          >
            {ticking ? "Pause" : seconds === 0 ? "Next" : "Start"}
          </button>
        </div>
        <span hidden={!skippable()} className="skip-btn" onClick={skipPhase}>
          skip
        </span>
      </div>
      <div className="settings">
        <span className="setting-btn" onClick={() => resetTimer(phase)}>
          Reset
        </span>
        <span className="setting-btn" onClick={() => setShowSettings(true)}>
          Settings
        </span>
      </div>
      <Settings
        show={showSettings}
        settings={settings}
        setSettings={setSettings}
        hideIt={() => {
          setShowSettings(false);
        }}
      />
    </div>
  );
}

export default App;
