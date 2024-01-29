import "./App.css";

function App() {
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
        <h1 className="timer">25:00</h1>
        <button className="control-btn">Start</button>
      </div>
      <div className="settings">
        <span className="setting-btn">Settings</span>
      </div>
    </div>
  );
}

export default App;
