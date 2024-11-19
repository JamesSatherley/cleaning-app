// src/App.tsx
import React from "react";
import Schedule from "./components/Schedule";

const App: React.FC = () => {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Cleaning Schedule</h1>
      <Schedule />
    </div>
  );
};

export default App;
