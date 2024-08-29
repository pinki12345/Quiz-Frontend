// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Dashboard from "../components/Dashboard";
// import QuizAnalysis from "../components/QuizAnalysis";
// import styles from "./Home.module.css"; // Import CSS Module
// import { Outlet } from "react-router-dom";

// const Home = () => {
//   const [activeComponent, setActiveComponent] = useState("dashboard");
//   const [quizAnalysis, setQuizAnalysis] = useState(true);

//   const handleSidebarClick = (component) => {
//     setActiveComponent(component);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.sidebarData}>
//         <Sidebar onSidebarClick={handleSidebarClick} />
//       </div>
//       <div className={styles.mainContent}>
//         {activeComponent === "dashboard" && <Dashboard />}
//         {activeComponent === "analytics" && <QuizAnalysis />}
//       </div>

//     </div>
//   );
// };

// export default Home;

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
    setShowQuizQuestionAnalysis(false); // Reset to ensure the default components are shown
  };

  const handleShowQuizQuestionAnalysis = () => {
    setShowQuizQuestionAnalysis(true);
    setActiveComponent(null); // Hide the other components
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

