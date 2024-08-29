// import React, { useState } from "react";
// import styles from "./Sidebar.module.css";
// import QuizModal from "./modal/QuizModal";
// import { toast } from "react-hot-toast";
// import QuizLinkShareModal from "./modal/QuizLinkShareModal";
// import { useNavigate,Link,Outlet} from "react-router-dom";
// import QuizOrPollType from "./modal/QuizOrPollType";

// const Sidebar = ({ onSidebarClick }) => {
//   const navigate = useNavigate();
//   const [modalStep, setModalStep] = useState(0);
//   const [selectedQuizType, setSelectedQuizType] = useState("");
//   const [quizName, setQuizName] = useState("");
//   const [quizLink, setQuizLink] = useState("");
//   const [activeItem, setActiveItem] = useState("dashboard");

//   const handleCreateQuizClick = () => {
//     setActiveItem("createQuiz");
//     setModalStep(1);
//   };

//   const handleCloseModal = () => {
//     setModalStep(0);
//   };

//   const handleNextModal = (quizType, quizName) => {
//     if (modalStep === 1) {
//       if (!quizName || !quizType) {
//         toast.error("Please provide all required fields");
//         return;
//       }
//       setSelectedQuizType(quizType);
//       setQuizName(quizName);
//       setModalStep(2);
//     } else if (modalStep === 2) {
//       if (!quizType) {
//         toast.error("Failed to create quiz");
//         return;
//       }
//       setQuizLink(quizType);
//       setModalStep(3);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.sidebarSide}>
//         <div className={styles.logo}>QUIZZIE</div>
//         <nav className={styles.navbar}>
//           <ul>
//             <li>
//               <Link to="/home/dashboard" className={styles.active}>
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link to="/home/quizAnalysis">Analytics</Link>
//             </li>

//             {/* <li onClick={() => onSidebarClick("dashboard")} className={activeItem === "dashboard" ? styles.active : ""}>Dashboard</li>
//             <li onClick={() => onSidebarClick("analytics")}  className={activeItem === "analytics" ? styles.active : ""}>Analytics</li>
//             <li onClick={handleCreateQuizClick} className={activeItem === "createQuiz" ? styles.active : ""}>Create Quiz</li> */}
//           </ul>
//         </nav>
//         <div className={styles.logout}>
//           <div className={styles.logoutLine}></div>
//           <p onClick={handleLogout}>LOGOUT</p>
//         </div>
//       </div>
//       <div className={styles.content}>
//         <Outlet />
//       </div>
//       {modalStep === 1 && (
//         <QuizModal
//           onClose={handleCloseModal}
//           onNext={handleNextModal}
//           setQuizName={setQuizName}
//         />
//       )}
//       {modalStep === 2 && (
//         <QuizOrPollType
//           quizName={quizName}
//           quizType={selectedQuizType}
//           onClose={handleCloseModal}
//           onNext={handleNextModal}
//         />
//       )}
//       {modalStep === 3 && (
//         <QuizLinkShareModal quizLink={quizLink} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default Sidebar;




// import React, { useState } from "react";
// import styles from "./Sidebar.module.css";
// import QuizModal from "./modal/QuizModal";
// import { toast } from "react-hot-toast";
// import QuizLinkShareModal from "./modal/QuizLinkShareModal";
// import { useNavigate } from "react-router-dom";
// import QuizOrPollType from "./modal/QuizOrPollType";

// const Sidebar = ({ onSidebarClick }) => {
//   const navigate = useNavigate();
//   const [modalStep, setModalStep] = useState(0);
//   const [selectedQuizType, setSelectedQuizType] = useState("");
//   const [quizName, setQuizName] = useState("");
//   const [quizLink, setQuizLink] = useState("");
//   const [activeItem, setActiveItem] = useState("dashboard");

//   const handleSidebarItemClick = (item) => {
//     setActiveItem(item);
//     onSidebarClick(item); // This should not reset or override activeItem
//   };

//   const handleCreateQuizClick = () => {
//     setActiveItem("createQuiz");
//     setModalStep(1);
//   };

//   const handleCloseModal = () => {
//     setModalStep(0);
//   };

//   const handleNextModal = (quizType, quizName) => {
//     if (modalStep === 1) {
//       if (!quizName || !quizType) {
//         toast.error("Please provide all required fields");
//         return;
//       }
//       setSelectedQuizType(quizType);
//       setQuizName(quizName);
//       setModalStep(2);
//     } else if (modalStep === 2) {
//       if (!quizType) {
//         toast.error("Failed to create quiz");
//         return;
//       }
//       setQuizLink(quizType);
//       setModalStep(3);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.sidebarSide}>
//         <div className={styles.logo}>QUIZZIE</div>
//         <nav className={styles.navbar}>
//           <ul>
//             <li
//               onClick={() => handleSidebarItemClick("dashboard")}
//               className={activeItem === "dashboard" ? styles.active : ""}
//             >
//               Dashboard
//             </li>
//             <li
//               onClick={() => handleSidebarItemClick("analytics")}
//               className={activeItem === "analytics" ? styles.active : ""}
//             >
//               Analytics
//             </li>
//             <li
//               onClick={handleCreateQuizClick}
//               className={activeItem === "createQuiz" ? styles.active : ""}
//             >
//               Create Quiz
//             </li>
//           </ul>
//         </nav>
//         <div className={styles.logout}>
//           <div className={styles.logoutLine}></div>
//           <p onClick={handleLogout}>LOGOUT</p>
//         </div>
//       </div>
//       {modalStep === 1 && (
//         <QuizModal
//           onClose={handleCloseModal}
//           onNext={handleNextModal}
//           setQuizName={setQuizName}
//         />
//       )}
//       {modalStep === 2 && (
//         <QuizOrPollType
//           quizName={quizName}
//           quizType={selectedQuizType}
//           onClose={handleCloseModal}
//           onNext={handleNextModal}
//         />
//       )}
//       {modalStep === 3 && (
//         <QuizLinkShareModal quizLink={quizLink} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default Sidebar;

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
  const [activeItem, setActiveItem] = useState("dashboard");
  const [previousActiveItem, setPreviousActiveItem] = useState(""); 

  const handleSidebarItemClick = (item) => {
    setActiveItem(item);
    onSidebarClick(item); 
  };

  const handleCreateQuizClick = () => {
    setPreviousActiveItem(activeItem); 
    setActiveItem("createQuiz");
    setModalStep(1);
  };

  const handleCloseModal = () => {
    setModalStep(0);
    setActiveItem(previousActiveItem); 
    onSidebarClick(previousActiveItem); 
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

  const handleCancel = () => {
    setModalStep(0);
    setActiveItem(previousActiveItem); 
    onSidebarClick(previousActiveItem); 
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
            <li
              onClick={() => handleSidebarItemClick("dashboard")}
              className={activeItem === "dashboard" ? styles.active : ""}
            >
              Dashboard
            </li>
            <li
              onClick={() => handleSidebarItemClick("analytics")}
              className={activeItem === "analytics" ? styles.active : ""}
            >
              Analytics
            </li>
            <li
              onClick={handleCreateQuizClick}
              className={activeItem === "createQuiz" ? styles.active : ""}
            >
              Create Quiz
            </li>
          </ul>
        </nav>
        <div className={styles.logout}>
          <div className={styles.logoutLine}></div>
          <p onClick={handleLogout}>LOGOUT</p>
        </div>
      </div>
      {modalStep === 1 && (
        <QuizModal
          onClose={handleCloseModal}
          onNext={handleNextModal}
          onCancel={handleCancel} 
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
