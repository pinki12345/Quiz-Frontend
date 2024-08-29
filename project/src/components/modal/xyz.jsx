// // import React, { useState } from "react";
// // import axios from "axios";
// // import styles from "./QNAModal.module.css";
// // import deleteIcon from "../../assets/deleteIcon.png";
// // import QuizLinkShareModal from "./QuizLinkShareModal";

// // const QNAModal = ({ setShowModal, closeModal, quizName }) => {
// //   const [questions, setQuestions] = useState([{ id: 1 }]);
// //   const [options, setOptions] = useState([{ id: 1 }, { id: 2 }]);
// //   const [optionType, setOptionType] = useState("text");
// //   const [isPublishedModalOpen, setIsPublishedModalOpen] = useState(false);
// //   const [pollQuestion, setPollQuestion] = useState(""); 
// //   const [correctOptionId, setCorrectOptionId] = useState(null); 
// //   const [quizLink, setQuizLink] = useState(""); 


// //   const handleAddQuestion = () => {
// //     if (questions.length < 5) {
// //       setQuestions([...questions, { id: questions.length + 1 }]);
// //     }
// //   };

// //   const handleRemoveQuestion = () => {
// //     setQuestions(questions.slice(0, -1));
// //   };

// //   const handleRemoveOption = (id) => {
// //     setOptions(options.filter((option) => option.id !== id));
// //   };

// //   const handleAddOption = () => {
// //     if (options.length < 4) {
// //       setOptions([...options, { id: options.length + 1 }]);
// //     }
// //   };

// //   const handleOptionTypeChange = (event) => {
// //     setOptionType(event.target.value);
// //   };

// //   const handleInputChange = (id, field, value) => {
// //     setOptions(options.map(option =>
// //       option.id === id ? { ...option, [field]: value } : option
// //     ));
// //   };

// //   const handleOptionCorrectChange = (id) => {
// //     setOptions(options.map(option =>
// //       ({ ...option, isCorrect: option.id === id })
// //     ));
// //     setCorrectOptionId(id);
// //   };

// //   const handleCreateQuiz = async () => {
// //     const preparedOptions = options.map((option) => {
// //       return {
// //         type: optionType === "textImageURL" ? "Text & Image URL" : optionType === "imageURL" ? "Image URL" : "Text",
// //         text: option.text || "",
// //         imageUrl: option.imageUrl || "",
// //         isCorrect: option.id === correctOptionId 
// //       };
// //     });

// //     const quizData = {
// //       quizName: quizName,
// //       quizType: "Q&A",
// //       questions: [
// //         {
// //           questionText: pollQuestion, 
// //           options: preparedOptions
// //         }
// //       ]
// //     };
   
// //     console.log("quizData", quizData);
// //     try {
// //       const response = await axios.post("http://localhost:3000/api/v1/quizzes", quizData);
// //       console.log("Quiz created successfully:", response.data);
// //       setQuizLink(response.data.quizLink);
// //       setIsPublishedModalOpen(true);
       
// //     } catch (error) {
// //       console.error("Failed to create quiz:", error.response ? error.response.data : error.message);
// //     }
// //   };

// //   const handleClosePublishedModal = () => {
// //     setIsPublishedModalOpen(false);
// //   };

// //   return (
// //     <>
// //       <div className={styles.modalOverlay}>
// //         <div className={styles.modalContent}>
// //           <div className={styles.header}>
// //             <div className={styles.number}>
// //               {questions.map((question) => (
// //                 <div key={question.id} className={styles.questionNumber}>
// //                   <span>{question.id}</span>
// //                   {question.id > 1 && (
// //                     <button
// //                       className={styles.removeQuestion}
// //                       onClick={handleRemoveQuestion}
// //                     >
// //                       ✕
// //                     </button>
// //                   )}
// //                 </div>
// //               ))}
// //               {questions.length < 5 && (
// //                 <button
// //                   className={styles.addQuestion}
// //                   onClick={handleAddQuestion}
// //                 >
// //                   +
// //                 </button>
// //               )}
// //             </div>
// //             <p>Max 5 questions</p>
// //           </div>

// //           <input
// //             type="text"
// //             placeholder="Poll Question"
// //             className={styles.inputTypePollQuestion}
// //             value={pollQuestion} 
// //             onChange={(e) => setPollQuestion(e.target.value)} 
// //           />

// //           <div className={styles.optionType}>
// //             <h3>Option Type</h3>
// //             <label>
// //               <input
// //                 type="radio"
// //                 value="text"
// //                 checked={optionType === "text"}
// //                 onChange={handleOptionTypeChange}
// //               />
// //               Text
// //             </label>
// //             <label>
// //               <input
// //                 type="radio"
// //                 value="imageURL"
// //                 checked={optionType === "imageURL"}
// //                 onChange={handleOptionTypeChange}
// //               />
// //               Image URL
// //             </label>
// //             <label>
// //               <input
// //                 type="radio"
// //                 value="textImageURL"
// //                 checked={optionType === "textImageURL"}
// //                 onChange={handleOptionTypeChange}
// //               />
// //               Text & Image URL
// //             </label>
// //           </div>
// //           <div className={styles.InputfieldAndTimer}>
// //             <div className={styles.options}>
// //               {options.map((option) => (
// //                 <div key={option.id} className={styles.optionContainer}>
// //                   <label>
// //                     <input
// //                       type="radio"
// //                       name={`correctOption${option.id}`}
// //                       checked={option.id === correctOptionId}
// //                       onChange={() => handleOptionCorrectChange(option.id)}
// //                     />
// //                     {optionType === "text" && (
// //                       <input
// //                         type="text"
// //                         placeholder="Text Option"
// //                         className={styles.inputField}
// //                         value={option.text || ""}
// //                         onChange={(e) => handleInputChange(option.id, 'text', e.target.value)}
// //                       />
// //                     )}
// //                     {optionType === "imageURL" && (
// //                       <input
// //                         type="text"
// //                         placeholder="Image URL"
// //                         className={styles.inputField}
// //                         value={option.imageUrl || ""}
// //                         onChange={(e) => handleInputChange(option.id, 'imageUrl', e.target.value)}
// //                       />
// //                     )}
// //                     {optionType === "textImageURL" && (
// //                       <>
// //                         <input
// //                           type="text"
// //                           placeholder="Text Option"
// //                           className={styles.inputFieldText}
// //                           value={option.text || ""}
// //                           onChange={(e) => handleInputChange(option.id, 'text', e.target.value)}
// //                         />
// //                         <input
// //                           type="text"
// //                           placeholder="Image URL"
// //                           className={styles.inputFieldImageUrl}
// //                           value={option.imageUrl || ""}
// //                           onChange={(e) => handleInputChange(option.id, 'imageUrl', e.target.value)}
// //                         />
// //                       </>
// //                     )}
// //                   </label>
// //                   {option.id > 2 && (
// //                     <button
// //                       className={`${styles.removeOption} ${
// //                         optionType === "text"
// //                           ? styles.removeOptionText
// //                           : optionType === "imageURL"
// //                           ? styles.removeOptionImageURL
// //                           : styles.removeOptionTextImageURL
// //                       }`}
// //                       onClick={() => handleRemoveOption(option.id)}
// //                     >
// //                       <img src={deleteIcon} alt="Delete Option" />
// //                     </button>
// //                   )}
// //                 </div>
// //               ))}
// //               {options.length < 4 && (
// //                 <button className={styles.addOption} onClick={handleAddOption}>
// //                   Add Option
// //                 </button>
// //               )}
// //             </div>

// //             <div className={styles.timer}>
// //               <h3>Timer</h3>
// //               <button
// //                 className={styles.timerButton}
// //                 style={{ backgroundColor: "#F44336" }}
// //               >
// //                 OFF
// //               </button>
// //               <button
// //                 className={styles.timerButton}
// //                 style={{ backgroundColor: "#ccc" }}
// //               >
// //                 5 sec
// //               </button>
// //               <button
// //                 className={styles.timerButton}
// //                 style={{ backgroundColor: "#ccc" }}
// //               >
// //                 10 sec
// //               </button>
// //             </div>
// //           </div>
// //           <div className={styles.modalActions}>
// //             <button className={styles.cancelButton} onClick={closeModal}>
// //               Cancel
// //             </button>
// //             <button
// //               className={styles.continueButton}
// //               onClick={handleCreateQuiz}
// //             >
// //               Create Quiz
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {isPublishedModalOpen && (
// //         <QuizLinkShareModal
// //           quizLink={quizLink}
// //           isClose={handleClosePublishedModal}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default QNAModal;



// //____________________________________________

// // import React, { useState } from "react";
// // import styles from "./Sidebar.module.css";
// // import QuizAnalysis from "./QuizAnalysis";
// // import QuizModal from "./modal/QuizModal";
// // import QNAModal from "./modal/QNAModal";
// // import QuizLinkShareModal from "./modal/QuizLinkShareModal";

// // const Sidebar = () => {
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const handleCreateQuizClick = () => {
// //     setIsModalOpen(true);
// //   };

// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //   };
  
// //   return (
// //       <div className={styles.container}>
// //         <aside className={styles.sidebar}>
// //           <div className={styles.logo}>QUIZZIE</div>
// //           <nav className={styles.nav}>
// //             <ul>
// //               <li className={styles.active}>Dashboard</li>
// //               <li>Analytics</li>
// //               <li onClick={handleCreateQuizClick}>Create Quiz</li>
// //             </ul>
// //           </nav>
// //           <div className={styles.logout}>
// //             <div className={styles.logoutLine}></div>
// //             <p>LOGOUT</p>
// //           </div>
// //         </aside>
// //          {/* <Dashboard></Dashboard> */}
// //         <QuizAnalysis></QuizAnalysis>
// //         <QuizModal isOpen={isModalOpen} onClose={handleCloseModal} />
// //         {/* <QNAModal></QNAModal>
// //         <QuizLinkShareModal></QuizLinkShareModal> */}
// //       </div>
// //   );
// // };

// // export default Sidebar;

// //_____________________________________________________

// // import React, { useState, useEffect } from "react";
// // import styles from "./QuizModal.module.css";
// // import QNAModal from "./QNAModal";
// // import PollTypeModal from "./PollTypeModal";

// // const QuizModal = ({ isOpen, onClose }) => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [quizType, setQuizType] = useState("");
// //   const [quizName, setQuizName] = useState(""); // State for the quiz name

// //   useEffect(() => {
// //     if (isOpen) {
// //       setShowModal(false);
// //       setQuizType("");
// //       setQuizName(""); // Reset quiz name when modal opens
// //     }
// //   }, [isOpen]);

// //   const handleContinue = () => {
// //     if (!quizType) {
// //       alert("Please select a quiz type before continuing.");
// //       return;
// //     }
// //     setShowModal(true);
// //     setTimeout(() => {
// //       onClose();
// //     }, 100);
// //   };

// //   return (
// //     <>
// //       {isOpen && (
// //         <div className={styles.modalOverlay}>
// //           <div className={styles.modalContent}>
// //             <input
// //               type="text"
// //               placeholder="Quiz Name"
// //               value={quizName} 
// //               onChange={(e) => setQuizName(e.target.value)}
// //             />
// //             <div className={styles.quizType}>
// //               <h3>Quiz Type</h3>
// //               <button
// //                 className={`${styles.qna} ${
// //                   quizType === "Q&A" ? styles.selected : ""
// //                 }`}
// //                 onClick={() => setQuizType("Q&A")}
// //               >
// //                 Q & A
// //               </button>
// //               <button
// //                 className={`${styles.poll} ${
// //                   quizType === "Poll" ? styles.selected : ""
// //                 }`}
// //                 onClick={() => setQuizType("Poll")}
// //               >
// //                 Poll Type
// //               </button>
// //             </div>
// //             <div className={styles.modalActions}>
// //               <button className={styles.cancelButton} onClick={onClose}>
// //                 Cancel
// //               </button>
// //               <button
// //                 className={styles.continueButton}
// //                 onClick={handleContinue}
// //               >
// //                 Continue
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //       {showModal && quizType === "Q&A" && (
// //         <QNAModal closeModal={() => setShowModal(false)} quizName={quizName}/> 
// //       )}
// //       {showModal && quizType === "Poll" && (
// //         <PollTypeModal closeModal={() => setShowModal(false)} quizName={quizName} />
// //       )}
// //     </>
// //   );
// // };

// // export default QuizModal;

// //_______________________________________________________

// // import React, { useState } from "react";
// // import styles from "./QNAModal.module.css";
// // import deleteIcon from "../../assets/deleteIcon.png";
// // import QuizLinkShareModal from "./QuizLinkShareModal";

// // const QNAModal = ({closeModal }) => {
// //   const [questions, setQuestions] = useState([{ id: 1 }]);
// //   const [options, setOptions] = useState([{ id: 1 }, { id: 2 }]);
// //   const [optionType, setOptionType] = useState("text");
// //   const [isPublishedModalOpen, setIsPublishedModalOpen] = useState(false);
// //   const [quizLink, setQuizLink] = useState("");

// //   const handleAddQuestion = () => {
// //     if (questions.length < 5) {
// //       setQuestions([...questions, { id: questions.length + 1 }]);
// //     }
// //   };

// //   const handleRemoveQuestion = () => {
// //     setQuestions(questions.slice(0, -1));
// //   };

// //   const handleRemoveOption = (id) => {
// //     setOptions(options.filter((option) => option.id !== id));
// //   };

// //   const handleAddOption = () => {
// //     if (options.length < 4) {
// //       setOptions([...options, { id: options.length + 1 }]);
// //     }
// //   };

// //   const handleOptionTypeChange = (event) => {
// //     setOptionType(event.target.value);
// //   };

// //   const handleCreateQuiz = () => {
// //     console.log("Creating");
// //     setIsPublishedModalOpen(true);
// //     setTimeout(() => {
// //       closeModal();
// //     }, 1000);
// //   };

// //   const handleClosePublishedModal = () => {
// //     setIsPublishedModalOpen(false);
// //   };

// //   return (
// //     <>
// //       <div className={styles.modalOverlay}>
// //         <div className={styles.modalContent}>
// //           <div className={styles.header}>
// //             <div className={styles.number}>
// //               {questions.map((question) => (
// //                 <div key={question.id} className={styles.questionNumber}>
// //                   <span>{question.id}</span>
// //                   {question.id > 1 && (
// //                     <button
// //                       className={styles.removeQuestion}
// //                       onClick={handleRemoveQuestion}
// //                     >
// //                       ✕
// //                     </button>
// //                   )}
// //                 </div>
// //               ))}
// //               {questions.length < 5 && (
// //                 <button
// //                   className={styles.addQuestion}
// //                   onClick={handleAddQuestion}
// //                 >
// //                   +
// //                 </button>
// //               )}
// //             </div>
// //             <p>Max 5 questions</p>
// //           </div>

// //           <input
// //             type="text"
// //             placeholder="Poll Question"
// //             className={styles.inputTypePollQuestion}
// //           />

// //           <div className={styles.optionType}>
// //             <h3>Option Type</h3>
// //             <label>
// //               <input
// //                 type="radio"
// //                 value="text"
// //                 checked={optionType === "text"}
// //                 onChange={handleOptionTypeChange}
// //               />
// //               Text
// //             </label>
// //             <label>
// //               <input
// //                 type="radio"
// //                 value="imageURL"
// //                 checked={optionType === "imageURL"}
// //                 onChange={handleOptionTypeChange}
// //               />
// //               Image URL
// //             </label>
// //             <label>
// //               <input
// //                 type="radio"
// //                 value="textImageURL"
// //                 checked={optionType === "textImageURL"}
// //                 onChange={handleOptionTypeChange}
// //               />
// //               Text & Image URL
// //             </label>
// //           </div>
// //           <div className={styles.InputfieldAndTimer}>
// //             <div className={styles.options}>
// //               {options.map((option) => (
// //                 <div key={option.id} className={styles.optionContainer}>
// //                   <label>
// //                     <input type="radio" name={`option${option.id}`} />
// //                     {optionType === "text" && (
// //                       <input
// //                         type="text"
// //                         placeholder="Text Option"
// //                         className={styles.inputField}
// //                       />
// //                     )}
// //                     {optionType === "imageURL" && (
// //                       <input
// //                         type="text"
// //                         placeholder="Image URL"
// //                         className={styles.inputField}
// //                       />
// //                     )}
// //                     {optionType === "textImageURL" && (
// //                       <>
// //                         <input
// //                           type="text"
// //                           placeholder="Text Option"
// //                           className={styles.inputFieldText}
// //                         />
// //                         <input
// //                           type="text"
// //                           placeholder="Image URL"
// //                           className={styles.inputFieldImageUrl}
// //                         />
// //                       </>
// //                     )}
// //                   </label>
// //                   {option.id > 2 && (
// //                     <button
// //                       className={`${styles.removeOption} ${
// //                         optionType === "text"
// //                           ? styles.removeOptionText
// //                           : optionType === "imageURL"
// //                           ? styles.removeOptionImageURL
// //                           : styles.removeOptionTextImageURL
// //                       }`}
// //                       onClick={() => handleRemoveOption(option.id)}
// //                     >
// //                       <img src={deleteIcon} alt="Delete Option" />
// //                     </button>
// //                   )}
// //                 </div>
// //               ))}
// //               {options.length < 4 && (
// //                 <button className={styles.addOption} onClick={handleAddOption}>
// //                   Add Option
// //                 </button>
// //               )}
// //             </div>

// //             <div className={styles.timer}>
// //               <h3>Timer</h3>
// //               <button
// //                 className={styles.timerButton}
// //                 style={{ backgroundColor: "#F44336" }}
// //               >
// //                 OFF
// //               </button>
// //               <button
// //                 className={styles.timerButton}
// //                 style={{ backgroundColor: "#ccc" }}
// //               >
// //                 5 sec
// //               </button>
// //               <button
// //                 className={styles.timerButton}
// //                 style={{ backgroundColor: "#ccc" }}
// //               >
// //                 10 sec
// //               </button>
// //             </div>
// //           </div>
// //           <div className={styles.modalActions}>
// //             <button className={styles.cancelButton} onClick={closeModal}>
// //               Cancel
// //             </button>
// //             <button
// //               className={styles.continueButton}
// //               onClick={handleCreateQuiz}
// //             >
// //               Create Quiz
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {isPublishedModalOpen && (
// //         <QuizLinkShareModal
// //           quizLink={quizLink}
// //           isClose={handleClosePublishedModal}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default QNAModal;


// //____________________________*****_______________________________________

// import React, { useState } from "react";
// import axios from "axios";
// import styles from "./QNAModal.module.css";
// import deleteIcon from "../../assets/deleteIcon.png";

// const QNAModal = ({ quizName,onClose,onNext }) => {
//   const [questions, setQuestions] = useState([{ id: 1 }]);
//   const [options, setOptions] = useState([{ id: 1 }, { id: 2 }]);
//   const [optionType, setOptionType] = useState("text");
//   const [isPublishedModalOpen, setIsPublishedModalOpen] = useState(false);
//   const [pollQuestion, setPollQuestion] = useState(""); 
//   const [correctOptionId, setCorrectOptionId] = useState(null); 
//   const [quizLink, setQuizLink] = useState(""); 


//   const handleAddQuestion = () => {
//     if (questions.length < 5) {
//       setQuestions([...questions, { id: questions.length + 1 }]);
//     }
//   };

//   const handleRemoveQuestion = () => {
//     setQuestions(questions.slice(0, -1));
//   };

//   const handleRemoveOption = (id) => {
//     setOptions(options.filter((option) => option.id !== id));
//   };

//   const handleAddOption = () => {
//     if (options.length < 4) {
//       setOptions([...options, { id: options.length + 1 }]);
//     }
//   };

//   const handleOptionTypeChange = (event) => {
//     setOptionType(event.target.value);
//   };

//   const handleInputChange = (id, field, value) => {
//     setOptions(options.map(option =>
//       option.id === id ? { ...option, [field]: value } : option
//     ));
//   };

//   const handleOptionCorrectChange = (id) => {
//     setOptions(options.map(option =>
//       ({ ...option, isCorrect: option.id === id })
//     ));
//     setCorrectOptionId(id);
//   };

//   const handleCreateQuiz = async () => {
//     const preparedOptions = options.map((option) => {
//       return {
//         type: optionType === "textImageURL" ? "Text & Image URL" : optionType === "imageURL" ? "Image URL" : "Text",
//         text: option.text || "",
//         imageUrl: option.imageUrl || "",
//         isCorrect: option.id === correctOptionId 
//       };
//     });

//     const quizData = {
//       quizName: quizName,
//       quizType: "Q&A",
//       questions: [
//         {
//           questionText: pollQuestion, 
//           options: preparedOptions
//         }
//       ]
//     };
   
//     console.log("quizData", quizData);
//     try {
//       const response = await axios.post("http://localhost:3000/api/v1/quizzes", quizData);
//       console.log("Quiz created successfully:", response.data);
//       setQuizLink(response.data.quizLink);
//       onNext(response.data.quizLink);
//     } catch (error) {
//       console.error("Failed to create quiz:", error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//       <div className={styles.modalOverlay}>
//         <div className={styles.modalContent}>
//           <div className={styles.header}>
//             <div className={styles.number}>
//               {questions.map((question) => (
//                 <div key={question.id} className={styles.questionNumber}>
//                   <span>{question.id}</span>
//                   {question.id > 1 && (
//                     <button
//                       className={styles.removeQuestion}
//                       onClick={handleRemoveQuestion}
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//               ))}
//               {questions.length < 5 && (
//                 <button
//                   className={styles.addQuestion}
//                   onClick={handleAddQuestion}
//                 >
//                   +
//                 </button>
//               )}
//             </div>
//             <p>Max 5 questions</p>
//           </div>

//           <input
//             type="text"
//             placeholder="Poll Question"
//             className={styles.inputTypePollQuestion}
//             value={pollQuestion} 
//             onChange={(e) => setPollQuestion(e.target.value)} 
//           />

//           <div className={styles.optionType}>
//             <h3>Option Type</h3>
//             <label>
//               <input
//                 type="radio"
//                 value="text"
//                 checked={optionType === "text"}
//                 onChange={handleOptionTypeChange}
//               />
//               Text
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="imageURL"
//                 checked={optionType === "imageURL"}
//                 onChange={handleOptionTypeChange}
//               />
//               Image URL
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="textImageURL"
//                 checked={optionType === "textImageURL"}
//                 onChange={handleOptionTypeChange}
//               />
//               Text & Image URL
//             </label>
//           </div>
//           <div className={styles.InputfieldAndTimer}>
//             <div className={styles.options}>
//               {options.map((option) => (
//                 <div key={option.id} className={styles.optionContainer}>
//                   <label>
//                     <input
//                       type="radio"
//                       name={`correctOption${option.id}`}
//                       checked={option.id === correctOptionId}
//                       onChange={() => handleOptionCorrectChange(option.id)}
//                     />
//                     {optionType === "text" && (
//                       <input
//                         type="text"
//                         placeholder="Text Option"
//                         className={styles.inputField}
//                         value={option.text || ""}
//                         onChange={(e) => handleInputChange(option.id, 'text', e.target.value)}
//                       />
//                     )}
//                     {optionType === "imageURL" && (
//                       <input
//                         type="text"
//                         placeholder="Image URL"
//                         className={styles.inputField}
//                         value={option.imageUrl || ""}
//                         onChange={(e) => handleInputChange(option.id, 'imageUrl', e.target.value)}
//                       />
//                     )}
//                     {optionType === "textImageURL" && (
//                       <>
//                         <input
//                           type="text"
//                           placeholder="Text Option"
//                           className={styles.inputFieldText}
//                           value={option.text || ""}
//                           onChange={(e) => handleInputChange(option.id, 'text', e.target.value)}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Image URL"
//                           className={styles.inputFieldImageUrl}
//                           value={option.imageUrl || ""}
//                           onChange={(e) => handleInputChange(option.id, 'imageUrl', e.target.value)}
//                         />
//                       </>
//                     )}
//                   </label>
//                   {option.id > 2 && (
//                     <button
//                       className={`${styles.removeOption} ${
//                         optionType === "text"
//                           ? styles.removeOptionText
//                           : optionType === "imageURL"
//                           ? styles.removeOptionImageURL
//                           : styles.removeOptionTextImageURL
//                       }`}
//                       onClick={() => handleRemoveOption(option.id)}
//                     >
//                       <img src={deleteIcon} alt="Delete Option" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//               {options.length < 4 && (
//                 <button className={styles.addOption} onClick={handleAddOption}>
//                   Add Option
//                 </button>
//               )}
//             </div>

//             <div className={styles.timer}>
//               <h3>Timer</h3>
//               <button
//                 className={styles.timerButton}
//                 style={{ backgroundColor: "#F44336" }}
//               >
//                 OFF
//               </button>
//               <button
//                 className={styles.timerButton}
//                 style={{ backgroundColor: "#ccc" }}
//               >
//                 5 sec
//               </button>
//               <button
//                 className={styles.timerButton}
//                 style={{ backgroundColor: "#ccc" }}
//               >
//                 10 sec
//               </button>
//             </div>
//           </div>
//           <div className={styles.modalActions}>
//             <button className={styles.cancelButton} onClick={onClose}>
//               Cancel
//             </button>
//             <button
//               className={styles.continueButton}
//               onClick={handleCreateQuiz}
//             >
//               Create Quiz
//             </button>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default QNAModal;


//___________________old __________________
// import React, { useState } from "react";
// import axios from "axios";
// import styles from "./QNAModal.module.css";
// import deleteIcon from "../../assets/deleteIcon.png";

// const QNAModal = ({ quizName,onClose,onNext }) => {
//   const [questions, setQuestions] = useState([{ id: 1 }]);
//   const [options, setOptions] = useState([{ id: 1 }, { id: 2 }]);
//   const [optionType, setOptionType] = useState("text");
//   const [isPublishedModalOpen, setIsPublishedModalOpen] = useState(false);
//   const [pollQuestion, setPollQuestion] = useState(""); 
//   const [correctOptionId, setCorrectOptionId] = useState(null); 
//   const [quizLink, setQuizLink] = useState(""); 


//   const handleAddQuestion = () => {
//     if (questions.length < 5) {
//       setQuestions([...questions, { id: questions.length + 1 }]);
//     }
//   };

//   const handleRemoveQuestion = () => {
//     setQuestions(questions.slice(0, -1));
//   };

//   const handleRemoveOption = (id) => {
//     setOptions(options.filter((option) => option.id !== id));
//   };

//   const handleAddOption = () => {
//     if (options.length < 4) {
//       setOptions([...options, { id: options.length + 1 }]);
//     }
//   };

//   const handleOptionTypeChange = (event) => {
//     setOptionType(event.target.value);
//   };

//   const handleInputChange = (id, field, value) => {
//     setOptions(options.map(option =>
//       option.id === id ? { ...option, [field]: value } : option
//     ));
//   };

//   const handleOptionCorrectChange = (id) => {
//     setOptions(options.map(option =>
//       ({ ...option, isCorrect: option.id === id })
//     ));
//     setCorrectOptionId(id);
//   };

//   const handleCreateQuiz = async () => {
//     const preparedOptions = options.map((option) => {
//       return {
//         type: optionType === "textImageURL" ? "Text & Image URL" : optionType === "imageURL" ? "Image URL" : "Text",
//         text: option.text || "",
//         imageUrl: option.imageUrl || "",
//         isCorrect: option.id === correctOptionId 
//       };
//     });

//     const quizData = {
//       quizName: quizName,
//       quizType: "Q&A",
//       questions: [
//         {
//           questionText: pollQuestion, 
//           options: preparedOptions
//         }
//       ]
//     };
   
//     console.log("quizData", quizData);
//     try {
//       const response = await axios.post("http://localhost:3000/api/v1/quizzes", quizData);
//       console.log("Quiz created successfully:", response.data);
//       setQuizLink(response.data.quizLink);
//       onNext(response.data.quizLink);
//     } catch (error) {
//       console.error("Failed to create quiz:", error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//       <div className={styles.modalOverlay}>
//         <div className={styles.modalContent}>
//           <div className={styles.header}>
//             <div className={styles.number}>
//               {questions.map((question) => (
//                 <div key={question.id} className={styles.questionNumber}>
//                   <span>{question.id}</span>
//                   {question.id > 1 && (
//                     <button
//                       className={styles.removeQuestion}
//                       onClick={handleRemoveQuestion}
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//               ))}
//               {questions.length < 5 && (
//                 <button
//                   className={styles.addQuestion}
//                   onClick={handleAddQuestion}
//                 >
//                   +
//                 </button>
//               )}
//             </div>
//             <p>Max 5 questions</p>
//           </div>

//           <input
//             type="text"
//             placeholder="Poll Question"
//             className={styles.inputTypePollQuestion}
//             value={pollQuestion} 
//             onChange={(e) => setPollQuestion(e.target.value)} 
//           />

//           <div className={styles.optionType}>
//             <h3>Option Type</h3>
//             <label>
//               <input
//                 type="radio"
//                 value="text"
//                 checked={optionType === "text"}
//                 onChange={handleOptionTypeChange}
//               />
//               Text
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="imageURL"
//                 checked={optionType === "imageURL"}
//                 onChange={handleOptionTypeChange}
//               />
//               Image URL
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="textImageURL"
//                 checked={optionType === "textImageURL"}
//                 onChange={handleOptionTypeChange}
//               />
//               Text & Image URL
//             </label>
//           </div>
//           <div className={styles.InputfieldAndTimer}>
//             <div className={styles.options}>
//               {options.map((option) => (
//                 <div key={option.id} className={styles.optionContainer}>
//                   <label>
//                     <input
//                       type="radio"
//                       name={`correctOption${option.id}`}
//                       checked={option.id === correctOptionId}
//                       onChange={() => handleOptionCorrectChange(option.id)}
//                     />
//                     {optionType === "text" && (
//                       <input
//                         type="text"
//                         placeholder="Text Option"
//                         className={styles.inputField}
//                         value={option.text || ""}
//                         onChange={(e) => handleInputChange(option.id, 'text', e.target.value)}
//                       />
//                     )}
//                     {optionType === "imageURL" && (
//                       <input
//                         type="text"
//                         placeholder="Image URL"
//                         className={styles.inputField}
//                         value={option.imageUrl || ""}
//                         onChange={(e) => handleInputChange(option.id, 'imageUrl', e.target.value)}
//                       />
//                     )}
//                     {optionType === "textImageURL" && (
//                       <>
//                         <input
//                           type="text"
//                           placeholder="Text Option"
//                           className={styles.inputFieldText}
//                           value={option.text || ""}
//                           onChange={(e) => handleInputChange(option.id, 'text', e.target.value)}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Image URL"
//                           className={styles.inputFieldImageUrl}
//                           value={option.imageUrl || ""}
//                           onChange={(e) => handleInputChange(option.id, 'imageUrl', e.target.value)}
//                         />
//                       </>
//                     )}
//                   </label>
//                   {option.id > 2 && (
//                     <button
//                       className={`${styles.removeOption} ${
//                         optionType === "text"
//                           ? styles.removeOptionText
//                           : optionType === "imageURL"
//                           ? styles.removeOptionImageURL
//                           : styles.removeOptionTextImageURL
//                       }`}
//                       onClick={() => handleRemoveOption(option.id)}
//                     >
//                       <img src={deleteIcon} alt="Delete Option" />
//                     </button>
//                   )}
//                 </div>
//               ))}
//               {options.length < 4 && (
//                 <button className={styles.addOption} onClick={handleAddOption}>
//                   Add Option
//                 </button>
//               )}
//             </div>

//             <div className={styles.timer}>
//               <h3>Timer</h3>
//               <button
//                 className={styles.timerButton}
//                 style={{ backgroundColor: "#F44336" }}
//               >
//                 OFF
//               </button>
//               <button
//                 className={styles.timerButton}
//                 style={{ backgroundColor: "#ccc" }}
//               >
//                 5 sec
//               </button>
//               <button
//                 className={styles.timerButton}
//                 style={{ backgroundColor: "#ccc" }}
//               >
//                 10 sec
//               </button>
//             </div>
//           </div>
//           <div className={styles.modalActions}>
//             <button className={styles.cancelButton} onClick={onClose}>
//               Cancel
//             </button>
//             <button
//               className={styles.continueButton}
//               onClick={handleCreateQuiz}
//             >
//               Create Quiz
//             </button>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default QNAModal;


//____________________new_____________________

// import React, { useState } from "react";
// import axios from "axios";
// import styles from "./QNAModal.module.css";
// import deleteIcon from "../../assets/deleteIcon.png";

// const QNAModal = ({ quizName, onClose, onNext }) => {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       pollQuestion: "",
//       options: [{ id: 1 }, { id: 2 }],
//       optionType: "text",
//       correctOptionId: null,
//     },
//   ]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [errorMessage, setErrorMessage] = useState("");

//   const currentQuestion = questions[currentQuestionIndex];

//   const handleAddQuestion = () => {
//     if (questions.length < 5) {
//       setQuestions([
//         ...questions,
//         {
//           id: questions.length + 1,
//           pollQuestion: "",
//           options: [{ id: 1 }, { id: 2 }],
//           optionType: "text",
//           correctOptionId: null,
//         },
//       ]);
//       setCurrentQuestionIndex(questions.length);
//     }
//   };

//   const handleRemoveQuestion = (id) => {
//     setQuestions(questions.filter((question) => question.id !== id));
//     setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
//   };

//   const handleRemoveOption = (id) => {
//     setQuestions(
//       questions.map((question, index) => {
//         if (index === currentQuestionIndex) {
//           return {
//             ...question,
//             options: question.options.filter((option) => option.id !== id),
//           };
//         }
//         return question;
//       })
//     );
//   };

//   const handleAddOption = () => {
//     if (currentQuestion.options.length < 4) {
//       setQuestions(
//         questions.map((question, index) => {
//           if (index === currentQuestionIndex) {
//             return {
//               ...question,
//               options: [
//                 ...question.options,
//                 { id: question.options.length + 1 },
//               ],
//             };
//           }
//           return question;
//         })
//       );
//     }
//   };

//   const handleOptionTypeChange = (event) => {
//     setQuestions(
//       questions.map((question, index) => {
//         if (index === currentQuestionIndex) {
//           return { ...question, optionType: event.target.value };
//         }
//         return question;
//       })
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setQuestions(
//       questions.map((question, index) => {
//         if (index === currentQuestionIndex) {
//           return {
//             ...question,
//             options: question.options.map((option) =>
//               option.id === id ? { ...option, [field]: value } : option
//             ),
//           };
//         }
//         return question;
//       })
//     );
//   };

//   const handleOptionCorrectChange = (id) => {
//     setQuestions(
//       questions.map((question, index) => {
//         if (index === currentQuestionIndex) {
//           return {
//             ...question,
//             correctOptionId: id,
//             options: question.options.map((option) => ({
//               ...option,
//               isCorrect: option.id === id,
//             })),
//           };
//         }
//         return question;
//       })
//     );
//   };

//   const handlePollQuestionChange = (value) => {
//     setQuestions(
//       questions.map((question, index) => {
//         if (index === currentQuestionIndex) {
//           return { ...question, pollQuestion: value };
//         }
//         return question;
//       })
//     );
//   };

//   const validateQuizCreation = () => {
//     const allQuizzesCreated = questions.every(
//       (question) =>
//         question.pollQuestion &&
//         question.options.length >= 2 &&
//         question.correctOptionId !== null
//     );
//     if (!allQuizzesCreated) {
//       setErrorMessage(
//         "Please create a quiz for each question and select a correct option before proceeding."
//       );
//       return false;
//     }
//     setErrorMessage("");
//     return true;
//   };

//   const handleCreateQuiz = async () => {
//     if (!validateQuizCreation()) return;

//     const quizData = questions.map((question) => {
//       const preparedOptions = question.options.map((option) => ({
//         type:
//           question.optionType === "textImageURL"
//             ? "Text & Image URL"
//             : question.optionType === "imageURL"
//             ? "Image URL"
//             : "Text",
//         text: option.text || "",
//         imageUrl: option.imageUrl || "",
//         isCorrect: option.id === question.correctOptionId,
//       }));

//       return {
//         questionText: question.pollQuestion,
//         options: preparedOptions,
//       };
//     });

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/quizzes",
//         {
//           quizName,
//           quizType: "Q&A",
//           questions: quizData,
//         }
//       );

//       console.log("Quiz created successfully:", response.data);
//       // setQuizLink(response.data.quizLink);
//       onNext(response.data.quizLink);
//     } catch (error) {
//       console.error(
//         "Failed to create quiz:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <div className={styles.header}>
//           <div className={styles.number}>
//             {questions.map((question, index) => (
//               <div
//                 key={question.id}
//                 className={`${styles.questionNumber} ${
//                   index === currentQuestionIndex ? styles.activeQuestion : ""
//                 }`}
//                 onClick={() => setCurrentQuestionIndex(index)}
//               >
//                 <span>{question.id}</span>
//                 {question.id > 1 && (
//                   <button
//                     className={styles.removeQuestion}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemoveQuestion(question.id);
//                     }}
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             ))}
//             {questions.length < 5 && (
//               <button
//                 className={styles.addQuestion}
//                 onClick={handleAddQuestion}
//               >
//                 +
//               </button>
//             )}
//           </div>
//           <p>Max 5 questions</p>
//         </div>

//         <input
//           type="text"
//           placeholder="Poll Question"
//           className={styles.inputTypePollQuestion}
//           value={currentQuestion.pollQuestion}
//           onChange={(e) => handlePollQuestionChange(e.target.value)}
//         />

//         <div className={styles.optionType}>
//           <h3>Option Type</h3>
//           <label>
//             <input
//               type="radio"
//               value="text"
//               checked={currentQuestion.optionType === "text"}
//               onChange={handleOptionTypeChange}
//             />
//             Text
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="imageURL"
//               checked={currentQuestion.optionType === "imageURL"}
//               onChange={handleOptionTypeChange}
//             />
//             Image URL
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="textImageURL"
//               checked={currentQuestion.optionType === "textImageURL"}
//               onChange={handleOptionTypeChange}
//             />
//             Text & Image URL
//           </label>
//         </div>

//         <div className={styles.InputfieldAndTimer}>
//           <div className={styles.options}>
//             {currentQuestion.options.map((option) => (
//               <div key={option.id} className={styles.optionContainer}>
//                 <label>
//                   <input
//                     type="radio"
//                     name={`correctOption${option.id}`}
//                     checked={option.id === currentQuestion.correctOptionId}
//                     onChange={() => handleOptionCorrectChange(option.id)}
//                   />
//                   {currentQuestion.optionType === "text" && (
//                     <input
//                       type="text"
//                       placeholder="Text Option"
//                       className={styles.inputField}
//                       value={option.text || ""}
//                       onChange={(e) =>
//                         handleInputChange(option.id, "text", e.target.value)
//                       }
//                     />
//                   )}
//                   {currentQuestion.optionType === "imageURL" && (
//                     <input
//                       type="text"
//                       placeholder="Image URL"
//                       className={styles.inputField}
//                       value={option.imageUrl || ""}
//                       onChange={(e) =>
//                         handleInputChange(option.id, "imageUrl", e.target.value)
//                       }
//                     />
//                   )}
//                   {currentQuestion.optionType === "textImageURL" && (
//                     <>
//                       <input
//                         type="text"
//                         placeholder="Text Option"
//                         className={styles.inputFieldText}
//                         value={option.text || ""}
//                         onChange={(e) =>
//                           handleInputChange(option.id, "text", e.target.value)
//                         }
//                       />
//                       <input
//                         type="text"
//                         placeholder="Image URL"
//                         className={styles.inputFieldImageUrl}
//                         value={option.imageUrl || ""}
//                         onChange={(e) =>
//                           handleInputChange(
//                             option.id,
//                             "imageUrl",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </>
//                   )}
//                 </label>
//                 {option.id > 2 && (
//                   <button
//                     className={`${styles.removeOption} ${
//                       currentQuestion.optionType === "text"
//                         ? styles.removeOptionText
//                         : currentQuestion.optionType === "imageURL"
//                         ? styles.removeOptionImageURL
//                         : styles.removeOptionTextImageURL
//                     }`}
//                     onClick={() => handleRemoveOption(option.id)}
//                   >
//                     <img src={deleteIcon} alt="Delete Option" />
//                   </button>
//                 )}
//               </div>
//             ))}
//             {currentQuestion.options.length < 4 && (
//               <button className={styles.addOption} onClick={handleAddOption}>
//                 + Add Option
//               </button>
//             )}
//           </div>
//           <div className={styles.timer}>
//             <h3>Timer</h3>
//             <button
//               className={styles.timerButton}
//               style={{ backgroundColor: "#F44336" }}
//             >
//               OFF
//             </button>
//             <button
//               className={styles.timerButton}
//               style={{ backgroundColor: "#ccc" }}
//             >
//               5 sec
//             </button>
//             <button
//               className={styles.timerButton}
//               style={{ backgroundColor: "#ccc" }}
//             >
//               10 sec
//             </button>
//           </div>
//         </div>
//         <div className={styles.modalActions}>
//           <button className={styles.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//           <button className={styles.continueButton} onClick={handleCreateQuiz}>
//             Create Quiz
//           </button>
//         </div>
//         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default QNAModal;

//______________________________________________________________

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import styles from "./QuizInterface.module.css";

// const QuizInterface = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [responses, setResponses] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(0);

//   useEffect(() => {
//     const incrementImpression = async () => {
//       try {
//         await axios.get(
//           `http://localhost:3000/api/v1/calculateImpression/${id}`
//         );
//       } catch (err) {
//         console.error("Error incrementing impression:", err);
//       }
//     };
//     incrementImpression();
//   }, [id]);

//   // useEffect(() => {
//   //   const fetchQuiz = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:3000/api/v1/getQuizById/${id}`
//   //       );
//   //       setQuiz(response.data.quiz);
//   //       setLoading(false);
//   //       setCurrentQuestionIndex(0);

//   //       if (response.data.quiz.quizType === "Q&A") {
//   //         const initialTimeLimit =
//   //           response.data.quiz.questions[0].timeLimit || 0;
//   //         setTimeLeft(initialTimeLimit);
//   //       }
//   //     } catch (err) {
//   //       console.error("Error fetching quiz:", err);
//   //       setError("Failed to fetch quiz");
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchQuiz();
//   // }, [id]);
  
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/v1/getQuizById/${id}`
//         );
//         setQuiz(response.data.quiz);
//         setLoading(false);
//         setCurrentQuestionIndex(0);
  
//         if (response.data.quiz.quizType === "Q&A") {
//           const initialTimeLimit =
//             response.data.quiz.questions[0].timeLimit || 0;
//           setTimeLeft(initialTimeLimit);
//         }
//       } catch (err) {
//         console.error("Error fetching quiz:", err);
//         setError("Failed to fetch quiz");
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

  
//   useEffect(() => {
//     if (quiz?.quizType === "Q&A" && timeLeft > 0) {
//       const timer = setTimeout(
//         () => setTimeLeft((prevTime) => prevTime - 1),
//         1000
//       );
//       return () => clearTimeout(timer);
//     } else if (timeLeft === 0) {
//       handleNextQuestion();
//     }
//   }, [timeLeft, quiz]);

//   useEffect(() => {
//     if (quiz && quiz.questions.length > 0 && quiz.quizType === "Q&A") {
//       const newTimeLimit = quiz.questions[currentQuestionIndex].timeLimit || 0;
//       setTimeLeft(newTimeLimit);
//     }
//   }, [currentQuestionIndex, quiz]);

//   const handleOptionClick = (optionIndex) => {
//     if (quiz) {
//       setSelectedOption(optionIndex);
//       const currentQuestionId = quiz.questions[currentQuestionIndex]._id;

//       if (quiz.quizType === "Q&A") {
//         const isCorrect =
//           quiz.questions[currentQuestionIndex].options[optionIndex].isCorrect;
//         const updatedResponses = [...responses];
//         updatedResponses[currentQuestionIndex] = {
//           questionId: currentQuestionId,
//           isCorrect: isCorrect,
//         };
//         setResponses(updatedResponses);
//       } else if (quiz.quizType === "Poll") {
//         const selectedOptionId =
//           quiz.questions[currentQuestionIndex].options[optionIndex]._id;
//         const updatedResponses = [...responses];
//         updatedResponses[currentQuestionIndex] = {
//           questionId: currentQuestionId,
//           selectedOptionId: selectedOptionId,
//         };
//         setResponses(updatedResponses);
//       }
//     }
//   };

//   // const handleNextQuestion = () => {
//   //   if (quiz) {
//   //     if (selectedOption !== null || timeLeft === 0) {
//   //       if (currentQuestionIndex < quiz.questions.length - 1) {
//   //         setCurrentQuestionIndex((prevIndex) => prevIndex + 1); 
//   //         setSelectedOption(null); 
//   //         if (quiz.quizType === "Q&A") {
//   //           const newTimeLimit =
//   //             quiz.questions[currentQuestionIndex + 1].timeLimit || 0;
//   //           setTimeLeft(newTimeLimit);
//   //         }
//   //       } else {
//   //         handleSubmitQuiz(); 
//   //       }
//   //     } else {
//   //       console.log("Please select an option or wait for the time to run out.");
//   //     }
//   //   }
//   // };
  
//   const handleNextQuestion = () => {
//     if (quiz) {
//       if (quiz.quizType === "Poll" && selectedOption === null) {
//         console.log("Please select an option before proceeding.");
//         return; 
//       }
//       if (selectedOption !== null || (quiz.quizType === "Q&A" && timeLeft === 0)) {
//         if (currentQuestionIndex < quiz.questions.length - 1) {
//           setCurrentQuestionIndex((prevIndex) => prevIndex + 1); 
//           setSelectedOption(null); 
//           if (quiz.quizType === "Q&A") {
//             const newTimeLimit = quiz.questions[currentQuestionIndex + 1].timeLimit || 0;
//             setTimeLeft(newTimeLimit);
//           }
//         } else {
//           handleSubmitQuiz(); 
//         }
//       } else {
//         console.log("Please select an option or wait for the time to run out.");
//       }
//     }
//   };
//   useEffect(() => {
//     console.log(`Current Question Index: ${currentQuestionIndex}`);
//   }, [currentQuestionIndex]);

//   const handleSubmitQuiz = async () => {
//     try {
//       const responsePayload = {
//         quizId: id,
//         responses: responses.filter((response) => response !== null),
//       };
//       console.log("responsePayload", responsePayload);
//       await axios.post(
//         "http://localhost:3000/api/v1/quiz/response",
//         responsePayload
//       );

//       if (quiz.quizType === "Q&A") {
//         const correctAnswersCount = responses.filter(
//           (response) => response && response.isCorrect
//         ).length;
//         const totalQuestions = quiz.questions.length;
//         navigate("/feedback", {
//           state: { score: correctAnswersCount, totalQuestions },
//         });
//       } else if (quiz.quizType === "Poll") {
//         navigate("/pollFeedback", {
//           state: { message: "Thank you for voting!" },
//         });
//       }
//     } catch (err) {
//       console.error("Error submitting quiz:", err);
//       setError("Failed to submit quiz");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   if (!quiz || !quiz.questions || quiz.questions.length === 0) {
//     return <div>No questions available.</div>;
//   }

//   const currentQuestion = quiz.questions[currentQuestionIndex];

//   return (
//     <div className={styles.quizContainerbody}>
//       <div className={styles.quizContainer}>
//         <div className={styles.quizHeader}>
//           <div className={styles.quizProgress}>
//             {currentQuestionIndex + 1}/{quiz.questions.length}
//           </div>
//           {quiz.quizType === "Q&A" && currentQuestion.timeLimit > 0 && (
//             <div className={styles.quizTimer}>{timeLeft} sec</div>
//           )}
//         </div>
//         <div className={styles.quizQuestions}>
//           <div key={currentQuestion._id} className={styles.quizQuestion}>
//             <p>{currentQuestion.questionText}</p>
//             <div className={styles.quizOptions}>
//               {currentQuestion.options.map((option, optionIndex) => (
//                 <button
//                   key={option._id}
//                   className={`${styles.quizOption} ${
//                     selectedOption === optionIndex
//                       ? styles.quizOptionSelected
//                       : ""
//                   }`}
//                   onClick={() => handleOptionClick(optionIndex)}
//                 >
//                   {option.text}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//         <button
//           className={styles.quizNextButton}
//           onClick={handleNextQuestion}
//           disabled={selectedOption === null && timeLeft > 0}
//         >
//           {currentQuestionIndex < quiz.questions.length - 1 ? "NEXT" : "SUBMIT"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizInterface;

//____________________________________________________________________

import React, { useState } from "react";
import axios from "axios";
import styles from "./QuizOrPollType.module.css";
import deleteIcon from "../../assets/deleteIcon.png";

const QuizOrPollType = ({ quizType, quizName, onClose, onNext }) => {
  console.log("QuizOrPollType________________", quizType);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      pollQuestion: "",
      options: [{ id: 1 }, { id: 2 }],
      optionType: "text",
      correctOptionId: null,
      ...(quizType === "Q&A" && { timeLimit: 0 }),
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        {
          id: questions.length + 1,
          pollQuestion: "",
          options: [{ id: 1 }, { id: 2 }],
          optionType: "text",
          correctOptionId: null,
          ...(quizType === "Q&A" && { timeLimit: 0 }),
        },
      ]);
      setCurrentQuestionIndex(questions.length);
    }
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  const handleRemoveOption = (id) => {
    setQuestions(
      questions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return {
            ...question,
            options: question.options.filter((option) => option.id !== id),
          };
        }
        return question;
      })
    );
  };

  const handleAddOption = () => {
    if (currentQuestion.options.length < 4) {
      setQuestions(
        questions.map((question, index) => {
          if (index === currentQuestionIndex) {
            return {
              ...question,
              options: [
                ...question.options,
                { id: question.options.length + 1 },
              ],
            };
          }
          return question;
        })
      );
    }
  };

  const handleOptionTypeChange = (event) => {
    setQuestions(
      questions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return { ...question, optionType: event.target.value };
        }
        return question;
      })
    );
  };

  const handleInputChange = (id, field, value) => {
    setQuestions(
      questions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return {
            ...question,
            options: question.options.map((option) =>
              option.id === id ? { ...option, [field]: value } : option
            ),
          };
        }
        return question;
      })
    );
  };

  const handleOptionCorrectChange = (id) => {
    setQuestions(
      questions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return {
            ...question,
            correctOptionId: id,
            options: question.options.map((option) => ({
              ...option,
              isCorrect: option.id === id,
            })),
          };
        }
        return question;
      })
    );
  };

  const handlePollQuestionChange = (value) => {
    setQuestions(
      questions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return { ...question, pollQuestion: value };
        }
        return question;
      })
    );
  };

  const handleTimerChange = (value) => {
    if (quizType === "Q&A") {
      setQuestions(
        questions.map((question, index) => {
          if (index === currentQuestionIndex) {
            return { ...question, timeLimit: value };
          }
          return question;
        })
      );
    }
  };
  
  // const validateQuizCreation = () => {
  //   const allQuizzesCreated = questions.every(
  //     (question) =>
  //       question.pollQuestion &&
  //       question.options.length >= 2 &&
  //       question.correctOptionId !== null &&
  //       [0,5,10].includes(question.timeLimit)
  //   );
  //   if (!allQuizzesCreated) {
  //     setErrorMessage(
  //       "Please create a quiz for each question, select a correct option, and choose a valid time limit before proceeding."
  //     );
  //     return false;
  //   }
  //   setErrorMessage("");
  //   return true;
  // };

  const validateQuizCreation = () => {
    const allQuizzesCreated = questions.every((question) => {
      const hasCorrectOption = quizType === "Q&A" ? question.correctOptionId !== null : true;
      const hasValidTimeLimit = quizType === "Q&A" ? [0, 5, 10].includes(question.timeLimit) : true;
  
      return (
        question.pollQuestion &&
        question.options.length >= 2 &&
        hasCorrectOption &&
        hasValidTimeLimit
      );
    });
  
    if (!allQuizzesCreated) {
      setErrorMessage(
        "Please create a quiz for each question, select a correct option (for Q&A), and choose a valid time limit (for Q&A) before proceeding."
      );
      return false;
    }
  
    setErrorMessage("");
    return true;
  };

  // const validateQuizCreation = () => {
  //   const allQuizzesCreated = questions.every((question) => {
  //     // Check conditions only if the quiz type is Q&N
  //     const hasValidTimeLimit =
  //       quizType === "Poll" || [0, 5, 10].includes(question.timeLimit);
  //     const hasCorrectOption =
  //       quizType === "Poll" || question.correctOptionId !== null;

  //     return (
  //       question.pollQuestion &&
  //       question.options.length >= 2 &&
  //       hasCorrectOption &&
  //       hasValidTimeLimit
  //     );
  //   });

  //   if (!allQuizzesCreated) {
  //     setErrorMessage(
  //       "Please ensure each question has a question text, at least two options, and (for Q&N) a valid time limit and a correct option selected."
  //     );
  //     return false;
  //   }
  //   setErrorMessage("");
  //   return true;
  // };

  // const handleCreateQuiz = async () => {
  //   if (!validateQuizCreation()) return;

  //   const quizData = questions.map((question) => {
  //     const preparedOptions = question.options.map((option) => ({
  //       type:
  //         question.optionType === "textImageURL"
  //           ? "Text & Image URL"
  //           : question.optionType === "imageURL"
  //           ? "Image URL"
  //           : "Text",
  //       text: option.text || "",
  //       imageUrl: option.imageUrl || "",
  //       isCorrect: option.id === question.correctOptionId,
  //     }));

  //     return {
  //       questionText: question.pollQuestion,
  //       options: preparedOptions,
  //       timeLimit: question.timeLimit,
  //     };
  //   });
  //   console.log("Quiz Data being sent:", quizData);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/v1/quizzes",
  //       {
  //         quizName,
  //         quizType: "Q&A",
  //         questions: quizData,
  //       }
  //     );

  //     console.log("Quiz created successfully:", response.data);
  //     onNext(response.data.quizLink);
  //   } catch (error) {
  //     console.error(
  //       "Failed to create quiz:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  // const handleCreateQuiz = async () => {
  //   if (!validateQuizCreation()) return;
  //   const quizData = questions.map((question) => {
  //     const preparedOptions = question.options.map((option) => ({
  //       type:
  //         question.optionType === "textImageURL"
  //           ? "Text & Image URL"
  //           : question.optionType === "imageURL"
  //           ? "Image URL"
  //           : "Text",
  //       text: option.text || "",
  //       imageUrl: option.imageUrl || "",
  //       isCorrect:
  //         quizType === "Poll" ? false : option.id === question.correctOptionId,
  //     }));

  //     return {
  //       questionText: question.pollQuestion,
  //       options: preparedOptions,
  //       ...(quizType === "Q&N" && { timeLimit: question.timeLimit }), // Include timeLimit only for Q&N
  //     };
  //   });
     
  //   console.log("quizData..................",quizData);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/v1/createQuizOrPoll",
  //       {
  //         quizName,
  //         quizType: quizType === "Poll" ? "Poll" : "Q&A",
  //         questions: quizData,
  //       }
  //     );

  //     console.log("Quiz created successfully:", response.data);
  //     onNext(response.data.quizLink);
  //   } catch (error) {
  //     console.error(
  //       "Failed to create quiz:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };


  const handleCreateQuiz = async () => {
    if (!validateQuizCreation()) return;
  
    const quizData = questions.map((question) => {
      const preparedOptions = question.options.map((option) => ({
        type:
          question.optionType === "textImageURL"
            ? "Text & Image URL"
            : question.optionType === "imageURL"
            ? "Image URL"
            : "Text",
        text: option.text || "",
        imageUrl: option.imageUrl || "",
        isCorrect:
          quizType === "Poll" ? false : option.id === question.correctOptionId,
      }));
  
      return {
        questionText: question.pollQuestion,
        options: preparedOptions,
        ...(quizType === "Q&A" && { timeLimit: question.timeLimit }), // Corrected to "Q&A"
      };
    });
  
     console.log("quizData..................", quizData);
 
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/createQuizOrPoll",
        {
          quizName,
          quizType: quizType === "Poll" ? "Poll" : "Q&A",
          questions: quizData,
        }
      );
  
      console.log("Quiz created successfully:", response.data);
      onNext(response.data.quizLink);
    } catch (error) {
      console.error(
        "Failed to create quiz:",
        error.response ? error.response.data : error.message
      );
    }
  };
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div className={styles.number}>
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`${styles.questionNumber} ${
                  index === currentQuestionIndex ? styles.activeQuestion : ""
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                <span>{question.id}</span>
                {question.id > 1 && (
                  <button
                    className={styles.removeQuestion}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveQuestion(question.id);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {questions.length < 5 && (
              <button
                className={styles.addQuestion}
                onClick={handleAddQuestion}
              >
                +
              </button>
            )}
          </div>
          <p>Max 5 questions</p>
        </div>

        <input
          type="text"
          placeholder="Poll Question"
          className={styles.inputTypePollQuestion}
          value={currentQuestion.pollQuestion}
          onChange={(e) => handlePollQuestionChange(e.target.value)}
        />

        <div className={styles.optionType}>
          <h3>Option Type</h3>
          <label>
            <input
              type="radio"
              value="text"
              checked={currentQuestion.optionType === "text"}
              onChange={handleOptionTypeChange}
            />
            Text
          </label>
          <label>
            <input
              type="radio"
              value="imageURL"
              checked={currentQuestion.optionType === "imageURL"}
              onChange={handleOptionTypeChange}
            />
            Image URL
          </label>
          <label>
            <input
              type="radio"
              value="textImageURL"
              checked={currentQuestion.optionType === "textImageURL"}
              onChange={handleOptionTypeChange}
            />
            Text & Image URL
          </label>
        </div>

        <div className={styles.InputfieldAndTimer}>
          <div className={styles.options}>
            {currentQuestion.options.map((option) => (
              <div key={option.id} className={styles.optionContainer}>
                <label>
                  {/* <input
                    type="radio"
                    name={`correctOption${option.id}`}
                    checked={option.id === currentQuestion.correctOptionId}
                    onChange={() => handleOptionCorrectChange(option.id)}
                  /> */}
                  {quizType === "Q&A" && (
                    <input
                      type="radio"
                      name={`correctOption${option.id}`}
                      checked={option.id === currentQuestion.correctOptionId}
                      onChange={() => handleOptionCorrectChange(option.id)}
                    />
                  )}
                  {currentQuestion.optionType === "text" && (
                    <input
                      type="text"
                      placeholder="Text Option"
                      className={styles.inputField}
                      value={option.text || ""}
                      onChange={(e) =>
                        handleInputChange(option.id, "text", e.target.value)
                      }
                    />
                  )}
                  {currentQuestion.optionType === "imageURL" && (
                    <input
                      type="text"
                      placeholder="Image URL"
                      className={styles.inputField}
                      value={option.imageUrl || ""}
                      onChange={(e) =>
                        handleInputChange(option.id, "imageUrl", e.target.value)
                      }
                    />
                  )}
                  {currentQuestion.optionType === "textImageURL" && (
                    <>
                      <input
                        type="text"
                        placeholder="Text Option"
                        className={styles.inputFieldText}
                        value={option.text || ""}
                        onChange={(e) =>
                          handleInputChange(option.id, "text", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        className={styles.inputFieldImageUrl}
                        value={option.imageUrl || ""}
                        onChange={(e) =>
                          handleInputChange(
                            option.id,
                            "imageUrl",
                            e.target.value
                          )
                        }
                      />
                    </>
                  )}
                </label>
                {option.id > 2 && (
                  <button
                    className={`${styles.removeOption} ${
                      currentQuestion.optionType === "text"
                        ? styles.removeOptionText
                        : currentQuestion.optionType === "imageURL"
                        ? styles.removeOptionImageURL
                        : styles.removeOptionTextImageURL
                    }`}
                    onClick={() => handleRemoveOption(option.id)}
                  >
                    <img src={deleteIcon} alt="Delete Option" />
                  </button>
                )}
              </div>
            ))}
            {currentQuestion.options.length < 4 && (
              <button className={styles.addOption} onClick={handleAddOption}>
                + Add Option
              </button>
            )}
          </div>

          {/* <div className={styles.timer}>
            <h3>Timer</h3>
            <button
              className={`${styles.timerButton} ${
                currentQuestion.timeLimit === 0 ? styles.activeTimer : ""
              }`}
              onClick={() => handleTimerChange(0)}
            >
              OFF
            </button>
            <button
              className={`${styles.timerButton} ${
                currentQuestion.timeLimit === 5 ? styles.activeTimer : ""
              }`}
              onClick={() => handleTimerChange(5)}
            >
              5 sec
            </button>
            <button
              className={`${styles.timerButton} ${
                currentQuestion.timeLimit === 10 ? styles.activeTimer : ""
              }`}
              onClick={() => handleTimerChange(10)}
            >
              10 sec
            </button>
          </div> */}

          {quizType === "Q&A" && (
             <div className={styles.timer}>
            <h3>Timer</h3>
            <button
              className={`${styles.timerButton} ${
                currentQuestion.timeLimit === 0 ? styles.activeTimer : ""
              }`}
              onClick={() => handleTimerChange(0)}
            >
              OFF
            </button>
            <button
              className={`${styles.timerButton} ${
                currentQuestion.timeLimit === 5 ? styles.activeTimer : ""
              }`}
              onClick={() => handleTimerChange(5)}
            >
              5 sec
            </button>
            <button
              className={`${styles.timerButton} ${
                currentQuestion.timeLimit === 10 ? styles.activeTimer : ""
              }`}
              onClick={() => handleTimerChange(10)}
            >
              10 sec
            </button>
          </div> 

          )}
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.continueButton} onClick={handleCreateQuiz}>
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizOrPollType;



// ___________________SignupLogin_________________________


// import React, { useState } from "react";
// import styles from "./SignupLogin.module.css";
// import axios from "axios";
// import { endpoints } from "../services/apis";
// import { useNavigate } from "react-router-dom";

// const SignupLogin = () => {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};

//     if (isSignUp && !name) {
//       newErrors.name = "Invalid name";
//     }

//     if (!email) {
//       newErrors.email = "Invalid Email";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email format is invalid";
//     }

//     if (!password) {
//       newErrors.password = "Weak password";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (isSignUp && password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     return newErrors;
//   };

//   const handleSignup = async () => {
//     const formErrors = validate();
//     setErrors(formErrors);

//     if (Object.keys(formErrors).length === 0) {
//       try {
//         const response = await axios.post(endpoints.SIGNUP_API, {
//           name,
//           email,
//           password,
//           confirmPassword,
//         });

//         if (response.data.success) {
//           console.log("Account created successfully:", response.data);
//           setIsSignUp(false);
//           setName("");
//           setEmail("");
//           setPassword("");
//           setConfirmPassword("");
//         } else {
//           console.error("Signup error:", response.data.message);
//           setErrors({ general: response.data.message });
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//         setErrors({ general: "An error occurred. Please try again." });
//       }
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(endpoints.LOGIN_API, {
//         email,
//         password,
//       });

//       const token =
//         response?.headers?.authorization?.split(" ")[1] ||
//         response?.data?.token;
//       console.log("token: " + token);
//       if (token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(response.data?.user));
//         navigate("/home");
//       } else {
//         alert("Token not found in response headers.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       setErrors({ general: "An error occurred. Please try again." });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignUp) {
//       handleSignup();
//     } else {
//       handleLogin();
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>QUIZZIE</h1>
//       <div className={styles["form-container"]}>
//         <div className={styles.tabs}>
//           <button
//             className={isSignUp ? styles.active : ""}
//             onClick={() => setIsSignUp(true)}
//           >
//             Sign Up
//           </button>
//           <button
//             className={!isSignUp ? styles.active : ""}
//             onClick={() => setIsSignUp(false)}
//           >
//             Log In
//           </button>
//         </div>
//         {/* <form onSubmit={handleSubmit}>
//           {isSignUp && (
//             <div className={styles["form-group"]}>
//               <label>Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className={errors.name ? styles["error-input"] : ""}
//               />
//               {errors.name && (
//                 <span className={styles["error-message"]}>{errors.name}</span>
//               )}
//             </div>
//           )}
//           <div className={styles["additional-class"]}>
//             <div className={styles["form-group"]}>
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={errors.email ? styles["error-input"] : ""}
//               />
//               {errors.email && (
//                 <span className={styles["error-message"]}>{errors.email}</span>
//               )}
//             </div>
//             <div className={styles["form-group"]}>
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={errors.password ? styles["error-input"] : ""}
//               />
//               {errors.password && (
//                 <span className={styles["error-message"]}>
//                   {errors.password}
//                 </span>
//               )}
//             </div>
//           </div>
//           {isSignUp && (
//             <div className={styles["form-group"]}>
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className={errors.confirmPassword ? styles["error-input"] : ""}
//               />
//               {errors.confirmPassword && (
//                 <span className={styles["error-message"]}>
//                   {errors.confirmPassword}
//                 </span>
//               )}
//             </div>
//           )}
//           {errors.general && (
//             <div className={styles["error-message"]}>{errors.general}</div>
//           )}
//           <button
//             type="submit"
//             className={
//               isSignUp ? styles["submit-btn"] : styles["submit-btn-login"]
//             }
//           >
//             {isSignUp ? "Sign Up" : "Log In"}
//           </button>
//         </form> */}

//         <form onSubmit={handleSubmit}>
//           {isSignUp && (
//             <div className={styles["form-group"]}>
//               <label>Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className={errors.name ? `${styles["error-input"]}` : ""}
//                 data-error={errors.name} // Use data-error attribute for error message
//               />
//             </div>
//           )}
//           <div className={styles["additional-class"]}>
//             <div className={styles["form-group"]}>
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={errors.email ? `${styles["error-input"]}` : ""}
//                 data-error={errors.email}
//               />
//             </div>
//             <div className={styles["form-group"]}>
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={errors.password ? `${styles["error-input"]}` : ""}
//                 data-error={errors.password}
//               />
//             </div>
//           </div>
//           {isSignUp && (
//             <div className={styles["form-group"]}>
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className={
//                   errors.confirmPassword ? `${styles["error-input"]}` : ""
//                 }
//                 data-error={errors.confirmPassword}
//               />
//             </div>
//           )}
//           {errors.general && (
//             <div className={styles["error-message"]}>{errors.general}</div>
//           )}
//           <button
//             type="submit"
//             className={
//               isSignUp ? styles["submit-btn"] : styles["submit-btn-login"]
//             }
//           >
//             {isSignUp ? "Sign Up" : "Log In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupLogin;

// import React, { useState } from "react";
// import styles from "./SignupLogin.module.css";
// import axios from "axios";
// import { endpoints } from "../services/apis";
// import { useNavigate } from "react-router-dom";

// const SignupLogin = () => {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};

//     if (isSignUp && !name) {
//       newErrors.name = "Invalid name";
//     }

//     if (!email) {
//       newErrors.email = "Invalid Email";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email format is invalid";
//     }

//     if (!password) {
//       newErrors.password = "Weak password";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (isSignUp && password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     return newErrors;
//   };

//   const handleSignup = async () => {
//     const formErrors = validate();
//     setErrors(formErrors);

//     if (Object.keys(formErrors).length === 0) {
//       try {
//         const response = await axios.post(endpoints.SIGNUP_API, {
//           name,
//           email,
//           password,
//           confirmPassword,
//         });

//         console.log("Signup response:", response.data);

//         if (response.data.success) {
//           console.log("Account created successfully:", response.data);
//           setIsSignUp(false);
//           setName("");
//           setEmail("");
//           setPassword("");
//           setConfirmPassword("");
//         } else {
//           console.error("Signup error:", response.data.message);
//           setErrors({ general: response.data.message });
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//         setErrors({ general: "An error occurred. Please try again." });
//       }
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(endpoints.LOGIN_API, {
//         email,
//         password,
//       });

//       console.log("Login response:", response.data);

//       const token =
//         response?.headers?.authorization?.split(" ")[1] ||
//         response?.data?.token;

//       if (token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(response.data?.user));
//         navigate("/home");
//       } else {
//         alert("Token not found in response headers.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       setErrors({ general: "An error occurred. Please try again." });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted. isSignUp:", isSignUp);
//     if (isSignUp) {
//       handleSignup();
//     } else {
//       handleLogin();
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>QUIZZIE</h1>
//       <div className={styles["form-container"]}>
//         <div className={styles.tabs}>
//           <button
//             className={isSignUp ? styles.active : ""}
//             onClick={() => setIsSignUp(true)}
//           >
//             Sign Up
//           </button>
//           <button
//             className={!isSignUp ? styles.active : ""}
//             onClick={() => setIsSignUp(false)}
//           >
//             Log In
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {isSignUp && (
//             <div className={styles["form-group"]}>
//               <label>Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className={errors.name ? styles["error-input"] : ""}
//                 placeholder="Name"
//               />
//               {errors.name && (
//                 <span className={styles["error-message"]}>{errors.name}</span>
//               )}
//             </div>
//           )}
//           <div className={styles["additional-class"]}>
//             <div className={styles["form-group"]}>
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={errors.email ? styles["error-input"] : ""}
//                 placeholder="Email"
//               />
//               {errors.email && (
//                 <span className={styles["error-message"]}>{errors.email}</span>
//               )}
//             </div>
//             <div className={styles["form-group"]}>
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={errors.password ? styles["error-input"] : ""}
//                 placeholder="Password"
//               />
//               {errors.password && (
//                 <span className={styles["error-message"]}>
//                   {errors.password}
//                 </span>
//               )}
//             </div>
//           </div>
//           {isSignUp && (
//             <div className={styles["form-group"]}>
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className={errors.confirmPassword ? styles["error-input"] : ""}
//                 placeholder="Confirm Password"
//               />
//               {errors.confirmPassword && (
//                 <span className={styles["error-message"]}>
//                   {errors.confirmPassword}
//                 </span>
//               )}
//             </div>
//           )}
//           {errors.general && (
//             <div className={styles["error-message"]}>{errors.general}</div>
//           )}
//           <button
//             type="submit"
//             className={
//               isSignUp ? styles["submit-btn"] : styles["submit-btn-login"]
//             }
//           >
//             {isSignUp ? "Sign Up" : "Log In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupLogin;