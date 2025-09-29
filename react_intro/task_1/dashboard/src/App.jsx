import React from "react";
import holbertonLogo from "./assets/holberton-logo.jpg";
import "./App.css";
import Notifications from "./Notifications";
import { getCurrentYear, getFooterCopy } from "./utils";

function App() {
  return (
    <>
      <div className="App-header">
        <img src={holbertonLogo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <div className="root-notifications">
        <Notifications />
      </div>

      <div className="App-footer">
        <p>
          Copyright {getCurrentYear()} - {getFooterCopy(true)}
        </p>
      </div>
    </>
  );
}

export default App;
