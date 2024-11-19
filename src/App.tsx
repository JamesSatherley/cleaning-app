import React from "react";
import "./index.css";
import Schedule from "./components/Schedule";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Cleaning Schedule</h1>
      <Schedule />
    </div>
  );
};

export default App;
