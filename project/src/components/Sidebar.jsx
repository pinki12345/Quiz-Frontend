import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import QuizModal from "./modal/QuizModal";
import { toast } from "react-hot-toast";
import QuizLinkShareModal from "./modal/QuizLinkShareModal";
import { useNavigate } from "react-router-dom";
import QuizOrPollType from "./modal/QuizOrPollType";

const Sidebar = ({ onSidebarClick }) => {
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState(0);
  const [selectedQuizType, setSelectedQuizType] = useState("");
  const [quizName, setQuizName] = useState("");
  const [quizLink, setQuizLink] = useState("");

  const handleCreateQuizClick = () => {
    setModalStep(1);
  };

  const handleCloseModal = () => {
    setModalStep(0);
  };

  const handleNextModal = (quizType, quizName) => {
    if (modalStep === 1) {
      if (!quizName || !quizType) {
        toast.error("Please provide all required fields");
        return;
      }
      setSelectedQuizType(quizType);
      setQuizName(quizName);
      setModalStep(2);
    } else if (modalStep === 2) {
      if (!quizType) {
        toast.error("Failed to create quiz");
        return;
      }
      setQuizLink(quizType);
      setModalStep(3);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarSide}>
        <div className={styles.logo}>QUIZZIE</div>
        <nav className={styles.navbar}>
          <ul>
            {/* <li>
              <Link to="/home/dashboard" className={styles.active}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/home/quizAnalysis">Analytics</Link>
            </li> */}

            <li onClick={() => onSidebarClick("dashboard")}>Dashboard</li>
            <li onClick={() => onSidebarClick("analytics")}>Analytics</li>
            <li onClick={handleCreateQuizClick}>Create Quiz</li>
          </ul>
        </nav>
        <div className={styles.logout}>
          <div className={styles.logoutLine}></div>
          <p onClick={handleLogout}>LOGOUT</p>
        </div>
      </div>
      {/* <div className={styles.content}>
        <Outlet />
      </div> */}
      {modalStep === 1 && (
        <QuizModal
          onClose={handleCloseModal}
          onNext={handleNextModal}
          setQuizName={setQuizName}
        />
      )}
      {modalStep === 2 && (
        <QuizOrPollType
          quizName={quizName}
          quizType={selectedQuizType}
          onClose={handleCloseModal}
          onNext={handleNextModal}
        />
      )}
      {modalStep === 3 && (
        <QuizLinkShareModal quizLink={quizLink} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Sidebar;
