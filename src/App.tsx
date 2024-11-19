import React from "react";
import Schedule from "./components/Schedule";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Cleaning Schedule</h1>
      <Schedule />
    </div>
  );
};

export default App;
