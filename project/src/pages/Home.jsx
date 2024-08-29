import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import QuizAnalysis from "../components/QuizAnalysis";
import styles from "./Home.module.css"; // Import CSS Module

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleSidebarClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarData}>
        <Sidebar onSidebarClick={handleSidebarClick} />
      </div>
      <div className={styles.mainContent}>
        {activeComponent === "dashboard" && <Dashboard />}
        {activeComponent === "analytics" && <QuizAnalysis />}
      </div>
    </div>
  );
};

export default Home;
