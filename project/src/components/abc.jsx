// // import React, { useState } from "react";
// // import axios from "axios";
// // import styles from "./QNAModal.module.css";
// // import deleteIcon from "../../assets/deleteIcon.png";

// // const PollTypeModal = ({ quizName, onClose, onNext }) => {
// //   const [questions, setQuestions] = useState([{ id: 1 }]);
// //   const [options, setOptions] = useState([
// //     { id: 1, questionId: 1 },
// //     { id: 2, questionId: 1 },
// //   ]);
// //   const [optionType, setOptionType] = useState("text");
// //   const [pollQuestion, setPollQuestion] = useState("");
// //   const [quizLink, setQuizLink] = useState("");

// //   const handleAddQuestion = () => {
// //     if (questions.length < 5) {
// //       setQuestions([...questions, { id: questions.length + 1 }]);
// //       setOptions([
// //         ...options,
// //         { id: options.length + 1, questionId: questions.length + 1 },
// //       ]);
// //     }
// //   };

// //   const handleRemoveQuestion = () => {
// //     const lastQuestionId = questions[questions.length - 1].id;
// //     setQuestions(questions.slice(0, -1));
// //     setOptions(
// //       options.filter((option) => option.questionId !== lastQuestionId)
// //     );
// //   };

// //   const handleRemoveOption = (id) => {
// //     setOptions(options.filter((option) => option.id !== id));
// //   };

// //   const handleAddOption = (questionId) => {
// //     if (options.length < 4) {
// //       setOptions([...options, { id: options.length + 1, questionId }]);
// //     }
// //   };

// //   const handleOptionTypeChange = (event) => {
// //     setOptionType(event.target.value);
// //   };

// //   const handleInputChange = (id, field, value) => {
// //     setOptions(
// //       options.map((option) =>
// //         option.id === id ? { ...option, [field]: value } : option
// //       )
// //     );
// //   };

// //   const validatePoll = () => {
// //     if (questions.length === 0) {
// //       alert("Please add at least one question.");
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleCreatePoll = async () => {
// //     if (!validatePoll()) return;
// //     const preparedQuestions = questions.map((question) => {
// //       const questionOptions = options.filter(
// //         (option) => option.questionId === question.id
// //       );
// //       const preparedOptions = questionOptions.map((option) => ({
// //         type: optionType === "textImageURL" ? "Text & Image URL" : optionType === "imageURL" ? "Image URL" : "Text",
// //         text: option.text || "",
// //         imageUrl: option.imageUrl || "",
// //       }));
// //       return {
// //         questionText: question.questionText,
// //         optionType: optionType,
// //         options: preparedOptions,
// //       };
// //     });
// //     try {
// //       const promises = preparedQuestions.map(async (pollQuestion) => {
// //         const response = await axios.post(
// //           "http://localhost:3000/api/v1/poll",
// //           pollQuestion
// //         );
// //         return response.data;
// //       });
// //       const response = await Promise.all(promises);
// //       console.log("Poll created successfully:", response);
// //       setQuizLink(response.data.quizLink);
// //       onNext(response.data.quizLink);
// //     } catch (error) {
// //       console.error(
// //         "Failed to create poll:",
// //         error.response ? error.response.data : error.message
// //       );
// //     }
// //   };

// //   return (
// //     <div className={styles.modalOverlay}>
// //       <div className={styles.modalContent}>
// //         <div className={styles.header}>
// //           <div className={styles.number}>
// //             {questions.map((question) => (
// //               <div key={question.id} className={styles.questionNumber}>
// //                 <span>{question.id}</span>
// //                 {question.id > 1 && (
// //                   <button
// //                     className={styles.removeQuestion}
// //                     onClick={handleRemoveQuestion}
// //                   >
// //                     ✕
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //             {questions.length < 5 && (
// //               <button
// //                 className={styles.addQuestion}
// //                 onClick={handleAddQuestion}
// //               >
// //                 +
// //               </button>
// //             )}
// //           </div>
// //           <p>Max 5 questions</p>
// //         </div>

// //         <input
// //           type="text"
// //           placeholder="Poll Question"
// //           className={styles.inputTypePollQuestion}
// //           value={pollQuestion}
// //           onChange={(e) => setPollQuestion(e.target.value)}
// //         />

// //         <div className={styles.optionType}>
// //           <h3>Option Type</h3>
// //           <label>
// //             <input
// //               type="radio"
// //               value="text"
// //               checked={optionType === "text"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Text
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="imageURL"
// //               checked={optionType === "imageURL"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Image URL
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="textImageURL"
// //               checked={optionType === "textImageURL"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Text & Image URL
// //           </label>
// //         </div>

// //         <div className={styles.InputfieldAndTimer}>
// //           <div className={styles.options}>
// //             {questions.map((question) => (
// //               <div key={question.id} className={styles.optionContainer}>
// //                 {options
// //                   .filter((option) => option.questionId === question.id)
// //                   .map((option) => (
// //                     <div key={option.id} className={styles.option}>
// //                       <label>
// //                         {optionType === "text" && (
// //                           <input
// //                             type="text"
// //                             placeholder="Text Option"
// //                             className={styles.inputField}
// //                             value={option.text || ""}
// //                             onChange={(e) =>
// //                               handleInputChange(
// //                                 option.id,
// //                                 "text",
// //                                 e.target.value
// //                               )
// //                             }
// //                           />
// //                         )}
// //                         {optionType === "imageURL" && (
// //                           <input
// //                             type="text"
// //                             placeholder="Image URL"
// //                             className={styles.inputField}
// //                             value={option.imageUrl || ""}
// //                             onChange={(e) =>
// //                               handleInputChange(
// //                                 option.id,
// //                                 "imageUrl",
// //                                 e.target.value
// //                               )
// //                             }
// //                           />
// //                         )}
// //                         {optionType === "textImageURL" && (
// //                           <>
// //                             <input
// //                               type="text"
// //                               placeholder="Text Option"
// //                               className={styles.inputFieldText}
// //                               value={option.text || ""}
// //                               onChange={(e) =>
// //                                 handleInputChange(
// //                                   option.id,
// //                                   "text",
// //                                   e.target.value
// //                                 )
// //                               }
// //                             />
// //                             <input
// //                               type="text"
// //                               placeholder="Image URL"
// //                               className={styles.inputFieldImageUrl}
// //                               value={option.imageUrl || ""}
// //                               onChange={(e) =>
// //                                 handleInputChange(
// //                                   option.id,
// //                                   "imageUrl",
// //                                   e.target.value
// //                                 )
// //                               }
// //                             />
// //                           </>
// //                         )}
// //                       </label>
// //                       {option.id > 2 && (
// //                         <button
// //                           className={`${styles.removeOption} ${
// //                             optionType === "text"
// //                               ? styles.removeOptionText
// //                               : optionType === "imageURL"
// //                               ? styles.removeOptionImageURL
// //                               : styles.removeOptionTextImageURL
// //                           }`}
// //                           onClick={() => handleRemoveOption(option.id)}
// //                         >
// //                           <img src={deleteIcon} alt="Delete Option" />
// //                         </button>
// //                       )}
// //                     </div>
// //                   ))}
// //                 {options.filter((option) => option.questionId === question.id)
// //                   .length < 4 && (
// //                   <button
// //                     className={styles.addOption}
// //                     onClick={() => handleAddOption(question.id)}
// //                   >
// //                     Add Option
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className={styles.modalActions}>
// //           <button className={styles.cancelButton} onClick={onClose}>
// //             Cancel
// //           </button>
// //           <button className={styles.continueButton} onClick={handleCreatePoll}>
// //             Create Quiz
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PollTypeModal;

// // import React, { useState } from "react";
// // import axios from "axios";
// // import styles from "./QNAModal.module.css";
// // import deleteIcon from "../../assets/deleteIcon.png";

// // const PollTypeModal = ({ quizName, onClose, onNext }) => {
// //   const [questions, setQuestions] = useState([{ id: 1, questionText: "" }]);
// //   const [options, setOptions] = useState([
// //     { id: 1, questionId: 1 },
// //     { id: 2, questionId: 1 },
// //   ]);
// //   const [optionType, setOptionType] = useState("text");

// //   const handleAddQuestion = () => {
// //     if (questions.length < 5) {
// //       setQuestions([
// //         ...questions,
// //         { id: questions.length + 1, questionText: "" },
// //       ]);
// //       setOptions([
// //         ...options,
// //         { id: options.length + 1, questionId: questions.length + 1 },
// //       ]);
// //     }
// //   };

// //   const handleRemoveQuestion = () => {
// //     const lastQuestionId = questions[questions.length - 1].id;
// //     setQuestions(questions.slice(0, -1));
// //     setOptions(
// //       options.filter((option) => option.questionId !== lastQuestionId)
// //     );
// //   };

// //   const handleRemoveOption = (id) => {
// //     setOptions(options.filter((option) => option.id !== id));
// //   };

// //   const handleAddOption = (questionId) => {
// //     if (options.length < 4) {
// //       setOptions([...options, { id: options.length + 1, questionId }]);
// //     }
// //   };

// //   const handleOptionTypeChange = (event) => {
// //     setOptionType(event.target.value);
// //   };

// //   const handleInputChange = (id, field, value, isQuestion = false) => {
// //     if (isQuestion) {
// //       setQuestions(
// //         questions.map((question) =>
// //           question.id === id ? { ...question, [field]: value } : question
// //         )
// //       );
// //     } else {
// //       setOptions(
// //         options.map((option) =>
// //           option.id === id ? { ...option, [field]: value } : option
// //         )
// //       );
// //     }
// //   };

// //   const validatePoll = () => {
// //     if (
// //       questions.length === 0 ||
// //       questions.some((question) => !question.questionText)
// //     ) {
// //       alert("Please add a question text for all questions.");
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleCreatePoll = async () => {
// //     if (!validatePoll()) return;

// //     const preparedQuestions = questions.map((question) => {
// //       const questionOptions = options.filter(
// //         (option) => option.questionId === question.id
// //       );
// //       const preparedOptions = questionOptions.map((option) => ({
// //         text: option.text || "",
// //         imageUrl: option.imageUrl || "",
// //       }));
// //       return {
// //         questionText: question.questionText,
// //         optionType: optionType,
// //         options: preparedOptions,
// //       };
// //     });

// //     const pollData = {
// //       pollName: quizName,
// //       pollType: "Poll",
// //       questions: preparedQuestions,
// //     };
// //     console.log("pollData",pollData);
// //     try {
// //       const response = await axios.post("http://localhost:3000/api/v1/poll",pollData);
// //       console.log("Poll created successfully:", response.data);
// //       onNext(response.data.pollLink);
// //     } catch (error) {
// //       console.error(
// //         "Failed to create poll:",
// //         error.response ? error.response.data : error.message
// //       );
// //     }
// //   };

// //   return (
// //     <div className={styles.modalOverlay}>
// //       <div className={styles.modalContent}>
// //         <div className={styles.header}>
// //           <div className={styles.number}>
// //             {questions.map((question, index) => (
// //               <div key={question.id} className={styles.questionNumber}>
// //                 <span>{index + 1}</span>
// //                 {question.id > 1 && (
// //                   <button
// //                     className={styles.removeQuestion}
// //                     onClick={handleRemoveQuestion}
// //                   >
// //                     ✕
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //             {questions.length < 5 && (
// //               <button
// //                 className={styles.addQuestion}
// //                 onClick={handleAddQuestion}
// //               >
// //                 +
// //               </button>
// //             )}
// //           </div>
// //           <p>Max 5 questions</p>
// //         </div>

// //         {questions.map((question) => (
// //           <input
// //             key={question.id}
// //             type="text"
// //             placeholder="Poll Question"
// //             className={styles.inputTypePollQuestion}
// //             value={question.questionText}
// //             onChange={(e) =>
// //               handleInputChange(
// //                 question.id,
// //                 "questionText",
// //                 e.target.value,
// //                 true
// //               )
// //             }
// //           />
// //         ))}

// //         <div className={styles.optionType}>
// //           <h3>Option Type</h3>
// //           <label>
// //             <input
// //               type="radio"
// //               value="text"
// //               checked={optionType === "text"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Text
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="imageURL"
// //               checked={optionType === "imageURL"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Image URL
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="textImageURL"
// //               checked={optionType === "textImageURL"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Text & Image URL
// //           </label>
// //         </div>

// //         <div className={styles.InputfieldAndTimer}>
// //           <div className={styles.options}>
// //             {questions.map((question) => (
// //               <div key={question.id} className={styles.optionContainer}>
// //                 {options
// //                   .filter((option) => option.questionId === question.id)
// //                   .map((option) => (
// //                     <div key={option.id} className={styles.option}>
// //                       {optionType === "text" && (
// //                         <input
// //                           type="text"
// //                           placeholder="Text Option"
// //                           className={styles.inputField}
// //                           value={option.text || ""}
// //                           onChange={(e) =>
// //                             handleInputChange(option.id, "text", e.target.value)
// //                           }
// //                         />
// //                       )}
// //                       {optionType === "imageURL" && (
// //                         <input
// //                           type="text"
// //                           placeholder="Image URL"
// //                           className={styles.inputField}
// //                           value={option.imageUrl || ""}
// //                           onChange={(e) =>
// //                             handleInputChange(
// //                               option.id,
// //                               "imageUrl",
// //                               e.target.value
// //                             )
// //                           }
// //                         />
// //                       )}
// //                       {optionType === "textImageURL" && (
// //                         <>
// //                           <input
// //                             type="text"
// //                             placeholder="Text Option"
// //                             className={styles.inputFieldText}
// //                             value={option.text || ""}
// //                             onChange={(e) =>
// //                               handleInputChange(
// //                                 option.id,
// //                                 "text",
// //                                 e.target.value
// //                               )
// //                             }
// //                           />
// //                           <input
// //                             type="text"
// //                             placeholder="Image URL"
// //                             className={styles.inputFieldImageUrl}
// //                             value={option.imageUrl || ""}
// //                             onChange={(e) =>
// //                               handleInputChange(
// //                                 option.id,
// //                                 "imageUrl",
// //                                 e.target.value
// //                               )
// //                             }
// //                           />
// //                         </>
// //                       )}
// //                       {option.id > 2 && (
// //                         <button
// //                           className={styles.removeOption}
// //                           onClick={() => handleRemoveOption(option.id)}
// //                         >
// //                           <img src={deleteIcon} alt="Delete Option" />
// //                         </button>
// //                       )}
// //                     </div>
// //                   ))}
// //                 {options.filter((option) => option.questionId === question.id)
// //                   .length < 4 && (
// //                   <button
// //                     className={styles.addOption}
// //                     onClick={() => handleAddOption(question.id)}
// //                   >
// //                     Add Option
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className={styles.modalActions}>
// //           <button className={styles.cancelButton} onClick={onClose}>
// //             Cancel
// //           </button>
// //           <button className={styles.continueButton} onClick={handleCreatePoll}>
// //             Create Quiz
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PollTypeModal;

// // import React, { useState } from "react";
// // import axios from "axios";
// // import styles from "./QNAModal.module.css";
// // import deleteIcon from "../../assets/deleteIcon.png";

// // const PollTypeModal = ({ quizName, onClose, onNext }) => {
// //   const [questions, setQuestions] = useState([{ id: 1, questionText: "" }]);
// //   const [options, setOptions] = useState([
// //     { id: 1, questionId: 1 },
// //     { id: 2, questionId: 1 },
// //   ]);
// //   const [optionType, setOptionType] = useState("Text");

// //   const handleAddQuestion = () => {
// //     if (questions.length < 5) {
// //       setQuestions([
// //         ...questions,
// //         { id: questions.length + 1, questionText: "" },
// //       ]);
// //       setOptions([
// //         ...options,
// //         { id: options.length + 1, questionId: questions.length + 1 },
// //       ]);
// //     }
// //   };

// //   const handleRemoveQuestion = () => {
// //     const lastQuestionId = questions[questions.length - 1].id;
// //     setQuestions(questions.slice(0, -1));
// //     setOptions(
// //       options.filter((option) => option.questionId !== lastQuestionId)
// //     );
// //   };

// //   const handleRemoveOption = (id) => {
// //     setOptions(options.filter((option) => option.id !== id));
// //   };

// //   const handleAddOption = (questionId) => {
// //     if (options.length < 4) {
// //       setOptions([...options, { id: options.length + 1, questionId }]);
// //     }
// //   };

// //   const handleOptionTypeChange = (event) => {
// //     const value = event.target.value;
// //     if (value === "text") setOptionType("Text");
// //     else if (value === "imageURL") setOptionType("Image URL");
// //     else if (value === "textImageURL") setOptionType("Text & Image URL");
// //   };

// //   const handleInputChange = (id, field, value, isQuestion = false) => {
// //     if (isQuestion) {
// //       setQuestions(
// //         questions.map((question) =>
// //           question.id === id ? { ...question, [field]: value } : question
// //         )
// //       );
// //     } else {
// //       setOptions(
// //         options.map((option) =>
// //           option.id === id ? { ...option, [field]: value } : option
// //         )
// //       );
// //     }
// //   };

// //   const validatePoll = () => {
// //     if (
// //       questions.length === 0 ||
// //       questions.some((question) => !question.questionText)
// //     ) {
// //       alert("Please add a question text for all questions.");
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleCreatePoll = async () => {
// //     if (!validatePoll()) return;

// //     const preparedQuestions = questions.map((question) => {
// //       const questionOptions = options.filter(
// //         (option) => option.questionId === question.id
// //       );
// //       const preparedOptions = questionOptions.map((option) => ({
// //         text: option.text || "",
// //         imageUrl: option.imageUrl || "",
// //       }));
// //       return {
// //         questionText: question.questionText,
// //         optionType: optionType,
// //         options: preparedOptions,
// //       };
// //     });

// //     const pollData = {
// //       pollName: quizName,
// //       pollType: "Poll",
// //       questions: preparedQuestions,
// //     };
// //     console.log("pollData", pollData);
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:3000/api/v1/poll",
// //         pollData
// //       );
// //       console.log("Poll created successfully:", response.data);
// //       onNext(response.data.pollLink);
// //     } catch (error) {
// //       console.error(
// //         "Failed to create poll:",
// //         error.response ? error.response.data : error.message
// //       );
// //     }
// //   };

// //   return (
// //     <div className={styles.modalOverlay}>
// //       <div className={styles.modalContent}>
// //         <div className={styles.header}>
// //           <div className={styles.number}>
// //             {questions.map((question, index) => (
// //               <div key={question.id} className={styles.questionNumber}>
// //                 <span>{index + 1}</span>
// //                 {question.id > 1 && (
// //                   <button
// //                     className={styles.removeQuestion}
// //                     onClick={handleRemoveQuestion}
// //                   >
// //                     ✕
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //             {questions.length < 5 && (
// //               <button
// //                 className={styles.addQuestion}
// //                 onClick={handleAddQuestion}
// //               >
// //                 +
// //               </button>
// //             )}
// //           </div>
// //           <p>Max 5 questions</p>
// //         </div>

// //         {questions.map((question) => (
// //           <input
// //             key={question.id}
// //             type="text"
// //             placeholder="Poll Question"
// //             className={styles.inputTypePollQuestion}
// //             value={question.questionText}
// //             onChange={(e) =>
// //               handleInputChange(
// //                 question.id,
// //                 "questionText",
// //                 e.target.value,
// //                 true
// //               )
// //             }
// //           />
// //         ))}

// //         <div className={styles.optionType}>
// //           <h3>Option Type</h3>
// //           <label>
// //             <input
// //               type="radio"
// //               value="text"
// //               checked={optionType === "Text"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Text
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="imageURL"
// //               checked={optionType === "Image URL"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Image URL
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="textImageURL"
// //               checked={optionType === "Text & Image URL"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Text & Image URL
// //           </label>
// //         </div>

// //         <div className={styles.InputfieldAndTimer}>
// //           <div className={styles.options}>
// //             {questions.map((question) => (
// //               <div key={question.id} className={styles.optionContainer}>
// //                 {options
// //                   .filter((option) => option.questionId === question.id)
// //                   .map((option) => (
// //                     <div key={option.id} className={styles.option}>
// //                       {optionType === "Text" && (
// //                         <input
// //                           type="text"
// //                           placeholder="Text Option"
// //                           className={styles.inputField}
// //                           value={option.text || ""}
// //                           onChange={(e) =>
// //                             handleInputChange(option.id, "text", e.target.value)
// //                           }
// //                         />
// //                       )}
// //                       {optionType === "Image URL" && (
// //                         <input
// //                           type="text"
// //                           placeholder="Image URL"
// //                           className={styles.inputField}
// //                           value={option.imageUrl || ""}
// //                           onChange={(e) =>
// //                             handleInputChange(
// //                               option.id,
// //                               "imageUrl",
// //                               e.target.value
// //                             )
// //                           }
// //                         />
// //                       )}
// //                       {optionType === "Text & Image URL" && (
// //                         <>
// //                           <input
// //                             type="text"
// //                             placeholder="Text Option"
// //                             className={styles.inputFieldText}
// //                             value={option.text || ""}
// //                             onChange={(e) =>
// //                               handleInputChange(
// //                                 option.id,
// //                                 "text",
// //                                 e.target.value
// //                               )
// //                             }
// //                           />
// //                           <input
// //                             type="text"
// //                             placeholder="Image URL"
// //                             className={styles.inputFieldImageUrl}
// //                             value={option.imageUrl || ""}
// //                             onChange={(e) =>
// //                               handleInputChange(
// //                                 option.id,
// //                                 "imageUrl",
// //                                 e.target.value
// //                               )
// //                             }
// //                           />
// //                         </>
// //                       )}
// //                       {option.id > 2 && (
// //                         <button
// //                           className={styles.removeOption}
// //                           onClick={() => handleRemoveOption(option.id)}
// //                         >
// //                           <img src={deleteIcon} alt="Delete Option" />
// //                         </button>
// //                       )}
// //                     </div>
// //                   ))}
// //                 {options.filter((option) => option.questionId === question.id)
// //                   .length < 4 && (
// //                   <button
// //                     className={styles.addOption}
// //                     onClick={() => handleAddOption(question.id)}
// //                   >
// //                     Add Option
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className={styles.modalActions}>
// //           <button className={styles.cancelButton} onClick={onClose}>
// //             Cancel
// //           </button>
// //           <button className={styles.continueButton} onClick={handleCreatePoll}>
// //             Create Quiz
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PollTypeModal;


// //__________________________________________________

// import React, { useState } from "react";
// import styles from "./QuizInterface.module.css";

// const QuizInterface = () => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionClick = (index) => {
//     if (selectedOption === index) {
//       setSelectedOption(null);
//     } else {
//       setSelectedOption(index);
//     }
//   };

//   return (
//     <div className={styles.quizContainerbody}>
//       <div className={styles.quizContainer}>
//         <div className={styles.quizHeader}>
//           <div className={styles.quizProgress}>01/04</div>
//           <div className={styles.quizTimer}>00:10s</div>
//         </div>
//         <div className={styles.quizQuestion}>
//           <p>Your question text comes here, it's a sample text.</p>
//         </div>
//         <div className={styles.quizOptionsAndButton}>
//           <div className={styles.quizOptions}>
//             {["Option 1", "Option 2", "Option 3", "Option 4"].map(
//               (option, index) => (
//                 <button
//                   key={index}
//                   className={`${styles.quizOption} ${selectedOption === index ? styles.quizOptionSelected : ''}`}
//                   onClick={() => handleOptionClick(index)}
//                 >
//                   {option}
//                 </button>
//               )
//             )}
//           </div>
//           <button className={styles.quizNextButton}>NEXT</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizInterface;

// //_____________________

// /* .quizContainerbody{
// width: 100vw;
// height: 100vh;
// background-color: #041325;
// display: flex;
// align-items: center;
// justify-content: center;
// font-family: 'Poppins', sans-serif;
// }

// .quizContainer {
//     background-color: #ffffff;
//     padding: 30px;
//     border-radius: 10px;
//     width: 50vw;
//     height: 50vh;
//     margin: auto;
//   }
  
//   .quizHeader {
//     display: flex;
//     justify-content: space-between;
//     font-weight: bold;
//     color: #474444;
//   }
  
//   .quizProgress {
//     font-size: 18px;
//   }
  
//   .quizTimer {
//     color: red;
//     font-size: 18px;
//   }
  
//   .quizQuestion {
//     font-size: 20px;
//     font-weight: 700;
//     color: #474444;
//     line-height: 40px;
//   }
  
//   .quizOptions {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 6vh 10vw; 
//     margin-bottom: 4vh;
//   }
  
//   .quizOption {
//     padding: 10px;
//     width: 30vh;
//     height: 10vh;
//     border: none;
//     border-radius: 5px;
//     background-color: #F0F0F0;
//     font-weight: bold;
//     cursor: pointer;
//   }
  
//   .quizOptionSelected {
//     border: 3px solid #5076FF;
//   }
  
//   .quizNextButton {
//   background-color: #4caf50;
//   border-radius: 5px;
//   border: none;
//   color: white;
//   cursor: pointer;
//   font-weight: 600;
//   font-size: 18px;
//   line-height: 32px;
//   height: 5vh;
//   width: 15vw;
//   }
//   .quizOptionsAndButton{
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
//    */


// ___________________________________________________________________




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import styles from "./QuizInterface.module.css";

// const QuizInterface = () => {
//   const { id } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/v1/getquiz/${id}`
//         );
//         setQuiz(response.data.quiz);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching quiz:", err);
//         setError("Failed to fetch quiz");
//         setLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [id]);

//   const handleOptionClick = (optionIndex) => {
//     if (selectedOption === optionIndex) {
//       setSelectedOption(null);
//     } else {
//       setSelectedOption(optionIndex);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null);
//     }
//   };

//   const handleSubmitQuiz = () => {
//     // Handle quiz submission logic here
//     console.log("Submitting quiz...");
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
//           <div className={styles.quizTimer}>00:10s</div>
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
//         {currentQuestionIndex < quiz.questions.length - 1 ? (
//           <button className={styles.quizNextButton} onClick={handleNextQuestion}>
//             NEXT
//           </button>
//         ) : (
//           <button className={styles.quizNextButton} onClick={handleSubmitQuiz}>
//             SUBMIT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizInterface;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import styles from "./QuizInterface.module.css";

// const QuizInterface = () => {
//   const { id } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [responses, setResponses] = useState([]);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/v1/getquiz/${id}`
//         );
//         setQuiz(response.data.quiz);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching quiz:", err);
//         setError("Failed to fetch quiz");
//         setLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [id]);

//   const handleOptionClick = (optionIndex) => {
//     setSelectedOption(optionIndex);
//     const currentQuestionId = quiz.questions[currentQuestionIndex]._id;
//     const isCorrect = quiz.questions[currentQuestionIndex].options[optionIndex].isCorrect;
//     const updatedResponses = [...responses];
//     updatedResponses[currentQuestionIndex] = {
//       questionId: currentQuestionId,
//       isCorrect: isCorrect,
//     };
//     setResponses(updatedResponses);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       const responsePayload = {
//         quizId: id,
//         responses: responses,
//       };

//       const response = await axios.post(
//         "http://localhost:3000/api/v1/quiz/response",
//         responsePayload
//       );

//       console.log("Quiz submitted successfully:", response.data);
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
//           <div className={styles.quizTimer}>00:10s</div>
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
//         {currentQuestionIndex < quiz.questions.length - 1 ? (
//           <button className={styles.quizNextButton} onClick={handleNextQuestion}>
//             NEXT
//           </button>
//         ) : (
//           <button className={styles.quizNextButton} onClick={handleSubmitQuiz}>
//             SUBMIT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizInterface;
//________________________________________________________

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

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/v1/getquiz/${id}`
//         );
//         setQuiz(response.data.quiz);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching quiz:", err);
//         setError("Failed to fetch quiz");
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

//   const handleOptionClick = (optionIndex) => {
//     setSelectedOption(optionIndex);
//     const currentQuestionId = quiz.questions[currentQuestionIndex]._id;
//     const isCorrect =
//       quiz.questions[currentQuestionIndex].options[optionIndex].isCorrect;
//     const updatedResponses = [...responses];
//     updatedResponses[currentQuestionIndex] = {
//       questionId: currentQuestionId,
//       isCorrect: isCorrect,
//     };
//     setResponses(updatedResponses);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       const responsePayload = {
//         quizId: id,
//         responses: responses,
//       };
//       await axios.post(
//         "http://localhost:3000/api/v1/quiz/response",
//         responsePayload
//       );
//       const correctAnswersCount = responses.filter(
//         (response) => response.isCorrect
//       ).length;
//       const totalQuestions = quiz.questions.length;
//       navigate("/feedback", { state: { score: correctAnswersCount, totalQuestions } });
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
//           <div className={styles.quizTimer}>{currentQuestion.timeLimit}</div>
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
//         {currentQuestionIndex < quiz.questions.length - 1 ? (
//           <button
//             className={styles.quizNextButton}
//             onClick={handleNextQuestion}
//           >
//             NEXT
//           </button>
//         ) : (
//           <button className={styles.quizNextButton} onClick={handleSubmitQuiz}>
//             SUBMIT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizInterface;

//__________________new______________________________________

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
//   const [timerId, setTimerId] = useState(null);
//   console.log("timeleft: ", timeLeft)
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/v1/getquiz/${id}`
//         );
//         setQuiz(response.data.quiz);
//         setLoading(false);
//         setCurrentQuestionIndex(0);
//         setTimeLeft(response.data.quiz.questions[0].timeLimit);
//       } catch (err) {
//         console.error("Error fetching quiz:", err);
//         setError("Failed to fetch quiz");
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(
//         () => setTimeLeft((prevTime) => prevTime - 1),
//         1000
//       );
//       setTimerId(timer); // Save timer ID for cleanup
//       return () => clearTimeout(timer); // Cleanup timer on unmount or change
//     } else {
//       handleNextQuestion();
//     }
//   }, [timeLeft]);

//   useEffect(() => {
//     if (quiz && quiz.questions.length > 0) {
//       setTimeLeft(quiz.questions[currentQuestionIndex].timeLimit);
//     }
//   }, [currentQuestionIndex, quiz]);

//   const handleOptionClick = (optionIndex) => {
//     if (quiz) {
//       setSelectedOption(optionIndex);
//       const currentQuestionId = quiz.questions[currentQuestionIndex]._id;
//       const isCorrect =
//         quiz.questions[currentQuestionIndex].options[optionIndex].isCorrect;
//       const updatedResponses = [...responses];
//       updatedResponses[currentQuestionIndex] = {
//         questionId: currentQuestionId,
//         isCorrect: isCorrect,
//       };
//       setResponses(updatedResponses);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (quiz) {
//       if (selectedOption !== null) {
//         // Ensure an option is selected
//         if (currentQuestionIndex < quiz.questions.length - 1) {
//           setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//           setSelectedOption(null);
//           setTimeLeft(quiz.questions[currentQuestionIndex + 1].timeLimit);
//         } else {
//           handleSubmitQuiz();
//         }
//       } else {
//         alert("Please select an option before proceeding.");
//       }
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       const responsePayload = {
//         quizId: id,
//         responses: responses,
//       };
//       await axios.post(
//         "http://localhost:3000/api/v1/quiz/response",
//         responsePayload
//       );
//       const correctAnswersCount = responses.filter(
//         (response) => response.isCorrect
//       ).length;
//       const totalQuestions = quiz.questions.length;
//       navigate("/feedback", {
//         state: { score: correctAnswersCount, totalQuestions },
//       });
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
//           <div className={styles.quizTimer}>{timeLeft}s</div>
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
//         {currentQuestionIndex < quiz.questions.length - 1 ? (
//           <button
//             className={styles.quizNextButton}
//             onClick={handleNextQuestion}
//           >
//             NEXT
//           </button>
//         ) : (
//           <button className={styles.quizNextButton} onClick={handleSubmitQuiz}>
//             SUBMIT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizInterface;

//__________________________________________________________________

// // import React, { useState } from "react";
// // import axios from "axios";
// // import styles from "./QNAModal.module.css";
// // import deleteIcon from "../../assets/deleteIcon.png";

// // const QNAModal = ({ quizName, onClose, onNext }) => {
// //   const [questions, setQuestions] = useState([
// //     {
// //       id: 1,
// //       pollQuestion: "",
// //       options: [{ id: 1 }, { id: 2 }],
// //       optionType: "text",
// //       correctOptionId: null,
// //     },
// //   ]);
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const currentQuestion = questions[currentQuestionIndex];

// //   const handleAddQuestion = () => {
// //     if (questions.length < 5) {
// //       setQuestions([
// //         ...questions,
// //         {
// //           id: questions.length + 1,
// //           pollQuestion: "",
// //           options: [{ id: 1 }, { id: 2 }],
// //           optionType: "text",
// //           correctOptionId: null,
// //         },
// //       ]);
// //       setCurrentQuestionIndex(questions.length);
// //     }
// //   };

// //   const handleRemoveQuestion = (id) => {
// //     setQuestions(questions.filter((question) => question.id !== id));
// //     setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
// //   };

// //   const handleRemoveOption = (id) => {
// //     setQuestions(
// //       questions.map((question, index) => {
// //         if (index === currentQuestionIndex) {
// //           return {
// //             ...question,
// //             options: question.options.filter((option) => option.id !== id),
// //           };
// //         }
// //         return question;
// //       })
// //     );
// //   };

// //   const handleAddOption = () => {
// //     if (currentQuestion.options.length < 4) {
// //       setQuestions(
// //         questions.map((question, index) => {
// //           if (index === currentQuestionIndex) {
// //             return {
// //               ...question,
// //               options: [
// //                 ...question.options,
// //                 { id: question.options.length + 1 },
// //               ],
// //             };
// //           }
// //           return question;
// //         })
// //       );
// //     }
// //   };

// //   const handleOptionTypeChange = (event) => {
// //     setQuestions(
// //       questions.map((question, index) => {
// //         if (index === currentQuestionIndex) {
// //           return { ...question, optionType: event.target.value };
// //         }
// //         return question;
// //       })
// //     );
// //   };

// //   const handleInputChange = (id, field, value) => {
// //     setQuestions(
// //       questions.map((question, index) => {
// //         if (index === currentQuestionIndex) {
// //           return {
// //             ...question,
// //             options: question.options.map((option) =>
// //               option.id === id ? { ...option, [field]: value } : option
// //             ),
// //           };
// //         }
// //         return question;
// //       })
// //     );
// //   };

// //   const handleOptionCorrectChange = (id) => {
// //     setQuestions(
// //       questions.map((question, index) => {
// //         if (index === currentQuestionIndex) {
// //           return {
// //             ...question,
// //             correctOptionId: id,
// //             options: question.options.map((option) => ({
// //               ...option,
// //               isCorrect: option.id === id,
// //             })),
// //           };
// //         }
// //         return question;
// //       })
// //     );
// //   };

// //   const handlePollQuestionChange = (value) => {
// //     setQuestions(
// //       questions.map((question, index) => {
// //         if (index === currentQuestionIndex) {
// //           return { ...question, pollQuestion: value };
// //         }
// //         return question;
// //       })
// //     );
// //   };

// //   const validateQuizCreation = () => {
// //     const allQuizzesCreated = questions.every(
// //       (question) =>
// //         question.pollQuestion &&
// //         question.options.length >= 2 &&
// //         question.correctOptionId !== null
// //     );
// //     if (!allQuizzesCreated) {
// //       setErrorMessage(
// //         "Please create a quiz for each question and select a correct option before proceeding."
// //       );
// //       return false;
// //     }
// //     setErrorMessage("");
// //     return true;
// //   };

// //   const handleCreateQuiz = async () => {
// //     if (!validateQuizCreation()) return;

// //     const quizData = questions.map((question) => {
// //       const preparedOptions = question.options.map((option) => ({
// //         type:
// //           question.optionType === "textImageURL"
// //             ? "Text & Image URL"
// //             : question.optionType === "imageURL"
// //             ? "Image URL"
// //             : "Text",
// //         text: option.text || "",
// //         imageUrl: option.imageUrl || "",
// //         isCorrect: option.id === question.correctOptionId,
// //       }));

// //       return {
// //         questionText: question.pollQuestion,
// //         options: preparedOptions,
// //       };
// //     });

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:3000/api/v1/quizzes",
// //         {
// //           quizName,
// //           quizType: "Q&A",
// //           questions: quizData,
// //         }
// //       );

// //       console.log("Quiz created successfully:", response.data);
// //       // setQuizLink(response.data.quizLink);
// //       onNext(response.data.quizLink);
// //     } catch (error) {
// //       console.error(
// //         "Failed to create quiz:",
// //         error.response ? error.response.data : error.message
// //       );
// //     }
// //   };

// //   return (
// //     <div className={styles.modalOverlay}>
// //       <div className={styles.modalContent}>
// //         <div className={styles.header}>
// //           <div className={styles.number}>
// //             {questions.map((question, index) => (
// //               <div
// //                 key={question.id}
// //                 className={`${styles.questionNumber} ${
// //                   index === currentQuestionIndex ? styles.activeQuestion : ""
// //                 }`}
// //                 onClick={() => setCurrentQuestionIndex(index)}
// //               >
// //                 <span>{question.id}</span>
// //                 {question.id > 1 && (
// //                   <button
// //                     className={styles.removeQuestion}
// //                     onClick={(e) => {
// //                       e.stopPropagation();
// //                       handleRemoveQuestion(question.id);
// //                     }}
// //                   >
// //                     ✕
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //             {questions.length < 5 && (
// //               <button
// //                 className={styles.addQuestion}
// //                 onClick={handleAddQuestion}
// //               >
// //                 +
// //               </button>
// //             )}
// //           </div>
// //           <p>Max 5 questions</p>
// //         </div>

// //         <input
// //           type="text"
// //           placeholder="Poll Question"
// //           className={styles.inputTypePollQuestion}
// //           value={currentQuestion.pollQuestion}
// //           onChange={(e) => handlePollQuestionChange(e.target.value)}
// //         />

// //         <div className={styles.optionType}>
// //           <h3>Option Type</h3>
// //           <label>
// //             <input
// //               type="radio"
// //               value="text"
// //               checked={currentQuestion.optionType === "text"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Text
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="imageURL"
// //               checked={currentQuestion.optionType === "imageURL"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Image URL
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               value="textImageURL"
// //               checked={currentQuestion.optionType === "textImageURL"}
// //               onChange={handleOptionTypeChange}
// //             />
// //             Text & Image URL
// //           </label>
// //         </div>

// //         <div className={styles.InputfieldAndTimer}>
// //           <div className={styles.options}>
// //             {currentQuestion.options.map((option) => (
// //               <div key={option.id} className={styles.optionContainer}>
// //                 <label>
// //                   <input
// //                     type="radio"
// //                     name={`correctOption${option.id}`}
// //                     checked={option.id === currentQuestion.correctOptionId}
// //                     onChange={() => handleOptionCorrectChange(option.id)}
// //                   />
// //                   {currentQuestion.optionType === "text" && (
// //                     <input
// //                       type="text"
// //                       placeholder="Text Option"
// //                       className={styles.inputField}
// //                       value={option.text || ""}
// //                       onChange={(e) =>
// //                         handleInputChange(option.id, "text", e.target.value)
// //                       }
// //                     />
// //                   )}
// //                   {currentQuestion.optionType === "imageURL" && (
// //                     <input
// //                       type="text"
// //                       placeholder="Image URL"
// //                       className={styles.inputField}
// //                       value={option.imageUrl || ""}
// //                       onChange={(e) =>
// //                         handleInputChange(option.id, "imageUrl", e.target.value)
// //                       }
// //                     />
// //                   )}
// //                   {currentQuestion.optionType === "textImageURL" && (
// //                     <>
// //                       <input
// //                         type="text"
// //                         placeholder="Text Option"
// //                         className={styles.inputFieldText}
// //                         value={option.text || ""}
// //                         onChange={(e) =>
// //                           handleInputChange(option.id, "text", e.target.value)
// //                         }
// //                       />
// //                       <input
// //                         type="text"
// //                         placeholder="Image URL"
// //                         className={styles.inputFieldImageUrl}
// //                         value={option.imageUrl || ""}
// //                         onChange={(e) =>
// //                           handleInputChange(
// //                             option.id,
// //                             "imageUrl",
// //                             e.target.value
// //                           )
// //                         }
// //                       />
// //                     </>
// //                   )}
// //                 </label>
// //                 {option.id > 2 && (
// //                   <button
// //                     className={`${styles.removeOption} ${
// //                       currentQuestion.optionType === "text"
// //                         ? styles.removeOptionText
// //                         : currentQuestion.optionType === "imageURL"
// //                         ? styles.removeOptionImageURL
// //                         : styles.removeOptionTextImageURL
// //                     }`}
// //                     onClick={() => handleRemoveOption(option.id)}
// //                   >
// //                     <img src={deleteIcon} alt="Delete Option" />
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //             {currentQuestion.options.length < 4 && (
// //               <button className={styles.addOption} onClick={handleAddOption}>
// //                 + Add Option
// //               </button>
// //             )}
// //           </div>
// //           <div className={styles.timer}>
// //             <h3>Timer</h3>
// //             <button
// //               className={styles.timerButton}
// //               style={{ backgroundColor: "#F44336" }}
// //             >
// //               OFF
// //             </button>
// //             <button
// //               className={styles.timerButton}
// //               style={{ backgroundColor: "#ccc" }}
// //             >
// //               5 sec
// //             </button>
// //             <button
// //               className={styles.timerButton}
// //               style={{ backgroundColor: "#ccc" }}
// //             >
// //               10 sec
// //             </button>
// //           </div>
// //         </div>
// //         <div className={styles.modalActions}>
// //           <button className={styles.cancelButton} onClick={onClose}>
// //             Cancel
// //           </button>
// //           <button className={styles.continueButton} onClick={handleCreateQuiz}>
// //             Create Quiz
// //           </button>
// //         </div>
// //         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default QNAModal;

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
//       timeLimit: "OFF", // Default time limit
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
//           timeLimit: "OFF",
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

//   const handleTimerChange = (value) => {
//     setQuestions(
//       questions.map((question, index) => {
//         if (index === currentQuestionIndex) {
//           return { ...question, timeLimit: value };
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
//         question.correctOptionId !== null &&
//         ["OFF", "5sec", "10sec"].includes(question.timeLimit) // Check if time limit is valid
//     );
//     if (!allQuizzesCreated) {
//       setErrorMessage(
//         "Please create a quiz for each question, select a correct option, and choose a valid time limit before proceeding."
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
//         timeLimit: question.timeLimit, // Include timeLimit in the data sent to the server
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
//           {/* <div className={styles.options}>
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
//                 {currentQuestion.options.length > 2 && (
//                   <button
//                     className={styles.removeOption}
//                     onClick={() => handleRemoveOption(option.id)}
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             ))}
//             {currentQuestion.options.length < 4 && (
//               <button
//                 className={styles.addOption}
//                 onClick={handleAddOption}
//               >
//                 Add Option
//               </button>
//             )}
//           </div> */}

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
//           {/* ____________________________________________ */}

//           <div className={styles.timer}>
//             <h3>Timer</h3>
//             <select
//               value={currentQuestion.timeLimit}
//               onChange={(e) => handleTimerChange(e.target.value)}
//             >
//               <option value="OFF">No Timer</option>
//               <option value="5sec">5 seconds</option>
//               <option value="10sec">10 seconds</option>
//             </select>
//           </div>

//           {/* ____________________________________________ */}
//         </div>

//         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

//         <div className={styles.buttons}>
//           <button className={styles.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//           <button className={styles.createButton} onClick={handleCreateQuiz}>
//             Create Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QNAModal;
//____________________________________________New____________________________________











//______________________________QuizAnalysis_____________________________________



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./QuizAnalysis.module.css";
// import icon1 from "../assets/material-symbols_delete.png";
// import icon2 from "../assets/material-symbols_share.png";
// import icon3 from "../assets/uil_edit.png";
// import DeleteModal from "./modal/DeleteModal";
// import { Link } from "react-router-dom";

// const QuizAnalysis = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [quizToDelete, setQuizToDelete] = useState(null);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/v1/getAllQuizzes"
//         );
//         setQuizzes(response.data.quizzes);
//       } catch (error) {
//         console.error("Error fetching quizzes:", error);
//       }
//     };
//     fetchQuizzes();
//   }, []);

//   const deleteQuiz = async (quizId) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/deleteQuiz/${quizId}`);
//       setQuizzes((prevQuizzes) =>
//         prevQuizzes.filter((quiz) => quiz._id !== quizId)
//       );
//     } catch (error) {
//       console.error("Error deleting quiz:", error);
//     }
//   };

//   const handleDeleteClick = (quizId) => {
//     setQuizToDelete(quizId);
//     setIsModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (quizToDelete) {
//       deleteQuiz(quizToDelete);
//     }
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setQuizToDelete(null);
//   };

//   const handleShareClick = (quizId) => {
//     const url = `http://localhost:5173/quizInterface/${quizId}`;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => alert("Link copied to clipboard!"))
//       .catch((error) => console.error("Error copying link:", error));
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <h2 className={styles.heading}>Quiz Analysis</h2>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th className={styles.leftBottom}>S.No</th>
//               <th>Quiz Name</th>
//               <th>Created on</th>
//               <th>Impression</th>
//               <th></th>
//               <th className={styles.rightBottom}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {quizzes.map((quiz, index) => (
//               <tr key={quiz._id}>
//                 <td>{index + 1}</td>
//                 <td>{quiz.quizName}</td>
//                 <td>{new Date(quiz.createdAt).toLocaleDateString()}</td>
//                 <td>{quiz.impressions || "N/A"}</td>
//                 <td className={styles.actions}>
//                   <img
//                     src={icon3}
//                     className={styles.iconEdit}
//                     alt="Edit"
//                     onClick={() => console.log(`Edit ${quiz._id}`)}
//                   />
//                   <img
//                     src={icon1}
//                     className={styles.iconDelete}
//                     alt="Delete"
//                     onClick={() => handleDeleteClick(quiz._id)}
//                   />
//                   <img
//                     src={icon2}
//                     className={styles.iconShare}
//                     alt="Share"
//                     onClick={() => handleShareClick(quiz._id)}
//                   />
//                 </td>
//                 <td>
//                   <Link to={`/home/quizQuestionAnalysis/${quiz._id}`}>
//                     Question Wise Analysis
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className={styles.moreQuizzes}>more quizzes can be added</div>
//       </div>
//       {isModalOpen && (
//         <DeleteModal
//           onConfirmDelete={handleConfirmDelete}
//           onCancel={handleCancel}
//         />
//       )}
//     </>
//   );
// };

// export default QuizAnalysis;



//____________________________________QuizInterface______________________________


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
//         await axios.get(`http://localhost:3000/api/v1/calculateImpression/${id}/impression`);
//       } catch (err) {
//         console.error("Error incrementing impression:", err);
//       }
//     };
//     incrementImpression();
//   }, [id]);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/v1/getQuizById/${id}`
//         );
//         console.log("response_________________________________",response.data.quiz);
//         setQuiz(response.data.quiz);
//         setLoading(false);
//         setCurrentQuestionIndex(0);
//         const initialTimeLimit = response.data.quiz.questions[0].timeLimit || 0;
//         setTimeLeft(initialTimeLimit);
//       } catch (err) {
//         console.error("Error fetching quiz:", err);
//         setError("Failed to fetch quiz");
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(
//         () => setTimeLeft((prevTime) => prevTime - 1),
//         1000
//       );
//       return () => clearTimeout(timer);
//     } else if (timeLeft === 0) {
//       handleNextQuestion();
//     }
//   }, [timeLeft]);

//   useEffect(() => {
//     if (quiz && quiz.questions.length > 0) {
//       const newTimeLimit = quiz.questions[currentQuestionIndex].timeLimit || 0;
//       setTimeLeft(newTimeLimit);
//     }
//   }, [currentQuestionIndex, quiz]);

//   const handleOptionClick = (optionIndex) => {
//     if (quiz) {
//       setSelectedOption(optionIndex);
//       const currentQuestionId = quiz.questions[currentQuestionIndex]._id;
//       const isCorrect =
//         quiz.questions[currentQuestionIndex].options[optionIndex].isCorrect;
//       const updatedResponses = [...responses];
//       updatedResponses[currentQuestionIndex] = {
//         questionId: currentQuestionId,
//         isCorrect: isCorrect,
//       };
//       setResponses(updatedResponses);
//     }
//   };
//   const handleNextQuestion = () => {
//     if (quiz) {
//       if (selectedOption !== null || timeLeft === 0) {
//         if (currentQuestionIndex < quiz.questions.length - 1) {
//           setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//           setSelectedOption(null);
//           const newTimeLimit =
//             quiz.questions[currentQuestionIndex + 1].timeLimit || 0;
//           setTimeLeft(newTimeLimit);
//         } else {
//           handleSubmitQuiz();
//         }
//       } else {
//         const updatedResponses = [...responses];
//         updatedResponses[currentQuestionIndex] = null;
//         setResponses(updatedResponses);
//         if (currentQuestionIndex < quiz.questions.length - 1) {
//           setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//           const newTimeLimit =
//             quiz.questions[currentQuestionIndex + 1].timeLimit || 0;
//           setTimeLeft(newTimeLimit);
//         } else {
//           handleSubmitQuiz();
//         }
//       }
//     }
//   };

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
//       const correctAnswersCount = responses.filter(
//         (response) => response && response.isCorrect
//       ).length;
//       const totalQuestions = quiz.questions.length;
//       navigate("/feedback", {
//         state: { score: correctAnswersCount, totalQuestions },
//       });
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
//           {currentQuestion.timeLimit > 0 && (
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

//__________________________________________________

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./QuizAnalysis.module.css";
// import icon1 from "../assets/material-symbols_delete.png";
// import icon2 from "../assets/material-symbols_share.png";
// import icon3 from "../assets/uil_edit.png";
// import DeleteModal from "./modal/DeleteModal";
// import { Link } from "react-router-dom";

// const QuizAnalysis = () => {
//   const [items, setItems] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState({ id: null, type: "" });

//   useEffect(() => {
//     const fetchQuizzesAndPolls = async () => {
//       try {
//         const [quizResponse, pollResponse] = await Promise.all([
//           axios.get("http://localhost:3000/api/v1/getAllQuizzes"),
//           axios.get("http://localhost:3000/api/v1/getAllpolls"),
//         ]);

//         const quizzes = quizResponse.data.quizzes.map((quiz) => ({
//           ...quiz,
//           type: "quiz",
//         }));

//         const polls = pollResponse.data.polls.map((poll) => ({
//           ...poll,
//           type: "poll",
//         }));

//         setItems([...quizzes, ...polls]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchQuizzesAndPolls();
//   }, []);

//   const deleteItem = async (id, type) => {
//     try {
//       const url =
//         type === "quiz"
//           ? `http://localhost:3000/api/v1/deleteQuiz/${id}`
//           : `http://localhost:3000/api/v1/deletePoll/${id}`;
//       await axios.delete(url);
//       setItems((prevItems) =>
//         prevItems.filter((item) => item._id !== id)
//       );
//     } catch (error) {
//       console.error(`Error deleting ${type}:`, error);
//     }
//   };

//   const handleDeleteClick = (id, type) => {
//     setItemToDelete({ id, type });
//     setIsModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (itemToDelete.id) {
//       deleteItem(itemToDelete.id, itemToDelete.type);
//     }
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setItemToDelete({ id: null, type: "" });
//   };

//   const handleShareClick = (id, type) => {
//     const url = `http://localhost:5173/quizInterface/${type}/${id}`;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => alert("Link copied to clipboard!"))
//       .catch((error) => console.error("Error copying link:", error));
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <h2 className={styles.heading}>Quiz & Poll Analysis</h2>

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th className={styles.leftBottom}>S.No</th>
//               <th>Name</th>
//               <th>Created on</th>
//               <th>Impression</th>
//               <th></th>
//               <th className={styles.rightBottom}></th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1}</td>
//                 <td>{item.type === "quiz" ? item.quizName : item.pollName}</td>
//                 <td>{new Date(item.createdAt).toLocaleDateString()}</td>
//                 <td>{item.impressions || "N/A"}</td>
//                 <td className={styles.actions}>
//                   <img
//                     src={icon3}
//                     className={styles.iconEdit}
//                     alt="Edit"
//                     onClick={() => console.log(`Edit ${item._id}`)}
//                   />
//                   <img
//                     src={icon1}
//                     className={styles.iconDelete}
//                     alt="Delete"
//                     onClick={() => handleDeleteClick(item._id, item.type)}
//                   />
//                   <img
//                     src={icon2}
//                     className={styles.iconShare}
//                     alt="Share"
//                     onClick={() => handleShareClick(item._id, item.type)}
//                   />
//                 </td>
//                 <td>
//                   <Link to={`/home/${item.type}QuestionAnalysis/${item._id}`}>
//                     Question Wise Analysis
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className={styles.moreItems}>more items can be added</div>
//       </div>
//       {isModalOpen && (
//         <DeleteModal
//           onConfirmDelete={handleConfirmDelete}
//           onCancel={handleCancel}
//         />
//       )}
//     </>
//   );
// };

// export default QuizAnalysis;