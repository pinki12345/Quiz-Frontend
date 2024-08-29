import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import QuizAnalysis from "../components/QuizAnalysis";
import QuizQuestionAnalysis from "../components/QuizQuestionAnalysis";
import styles from "./Home.module.css";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [showQuizQuestionAnalysis, setShowQuizQuestionAnalysis] = useState(false);

  const handleSidebarClick = (component) => {
    setActiveComponent(component);
    setShowQuizQuestionAnalysis(false); 
  };

  const handleShowQuizQuestionAnalysis = () => {
    setShowQuizQuestionAnalysis(true);
    setActiveComponent(null); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarData}>
        <Sidebar onSidebarClick={handleSidebarClick} />
      </div>
      <div className={styles.mainContent}>
        {showQuizQuestionAnalysis ? (
          <QuizQuestionAnalysis />
        ) : (
          <>
            {activeComponent === "dashboard" && <Dashboard />}
            {activeComponent === "analytics" && (
              <QuizAnalysis onQuestionWiseAnalysisClick={handleShowQuizQuestionAnalysis} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

