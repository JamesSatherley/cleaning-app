import React, { useState } from "react";
import Schedule from "./components/Schedule";
import Money from "./components/Money";
import Info from "./components/Info";
import "./index.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "information" | "cleaning" | "bills"
  >("information");

  const renderTabContent = () => {
    switch (activeTab) {
      case "information":
        return <Info />;
      case "cleaning":
        return <Schedule />;
      case "bills":
        return <Money />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1>Household Manager</h1>
      <div className="tabs">
        <button
          className={activeTab === "information" ? "active" : ""}
          onClick={() => setActiveTab("information")}
        >
          Information
        </button>
        <button
          className={activeTab === "cleaning" ? "active" : ""}
          onClick={() => setActiveTab("cleaning")}
        >
          Cleaning
        </button>
        <button
          className={activeTab === "bills" ? "active" : ""}
          onClick={() => setActiveTab("bills")}
        >
          Bills
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default App;
