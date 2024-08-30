// import React, { useState } from "react";
// import axios from "axios";
// import styles from "./QuizOrPollType.module.css";
// import deleteIcon from "../../assets/deleteIcon.png";

// const QuizOrPollType = ({ quizType, quizName, onClose, onNext}) => {
//   console.log("QuizOrPollType________________", quizType);

//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       pollQuestion: "",
//       options: [{ id: 1 }, { id: 2 }],
//       optionType: "text",
//       correctOptionId: null,
//       ...(quizType === "Q&A" && { timeLimit: 0 }),
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
//           ...(quizType === "Q&A" && { timeLimit: 0 }),
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
//     if (quizType === "Q&A") {
//       setQuestions(
//         questions.map((question, index) => {
//           if (index === currentQuestionIndex) {
//             return { ...question, timeLimit: value };
//           }
//           return question;
//         })
//       );
//     }
//   };

//   const validateQuizCreation = () => {
//     const allQuizzesCreated = questions.every((question) => {
//       const hasCorrectOption =
//         quizType === "Q&A" ? question.correctOptionId !== null : true;
//       const hasValidTimeLimit =
//         quizType === "Q&A" ? [0, 5, 10].includes(question.timeLimit) : true;

//       return (
//         question.pollQuestion &&
//         question.options.length >= 2 &&
//         hasCorrectOption &&
//         hasValidTimeLimit
//       );
//     });
//     if (!allQuizzesCreated) {
//       setErrorMessage(
//         "Please create a quiz for each question, select a correct option (for Q&A), and choose a valid time limit (for Q&A) before proceeding."
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
//         isCorrect:
//           quizType === "Poll" ? false : option.id === question.correctOptionId,
//       }));

//       return {
//         questionText: question.pollQuestion,
//         options: preparedOptions,
//         ...(quizType === "Q&A" && { timeLimit: question.timeLimit }), // Corrected to "Q&A"
//       };
//     });

//     console.log("quizData..................", quizData);

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/createQuizOrPoll",
//         {
//           quizName,
//           quizType: quizType === "Poll" ? "Poll" : "Q&A",
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
//           <div className={styles.options}>
//             {currentQuestion.options.map((option) => (
//               <div key={option.id} className={styles.optionContainer}>
//                 <label>
//                   {quizType === "Q&A" && (
//                     <input
//                       type="radio"
//                       name={`correctOption${option.id}`}
//                       checked={option.id === currentQuestion.correctOptionId}
//                       onChange={() => handleOptionCorrectChange(option.id)}
//                     />
//                   )}
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

//           {quizType === "Q&A" && (
//             <div className={styles.timer}>
//               <h3>Timer</h3>
//               <button
//                 className={`${styles.timerButton} ${
//                   currentQuestion.timeLimit === 0 ? styles.activeTimer : ""
//                 }`}
//                 onClick={() => handleTimerChange(0)}
//               >
//                 OFF
//               </button>
//               <button
//                 className={`${styles.timerButton} ${
//                   currentQuestion.timeLimit === 5 ? styles.activeTimer : ""
//                 }`}
//                 onClick={() => handleTimerChange(5)}
//               >
//                 5 sec
//               </button>
//               <button
//                 className={`${styles.timerButton} ${
//                   currentQuestion.timeLimit === 10 ? styles.activeTimer : ""
//                 }`}
//                 onClick={() => handleTimerChange(10)}
//               >
//                 10 sec
//               </button>
//             </div>
//           )}
//         </div>

//         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

//         <div className={styles.modalActions}>
//           <button className={styles.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//           <button className={styles.continueButton} onClick={handleCreateQuiz}>
//             Create Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizOrPollType;


// ___________________________________________________________________


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./QuizInterface.module.css";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../actions";

const QuizInterface = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    const incrementImpression = async () => {
      dispatch(setLoading(true));
      try {
        await axios.get(
          `http://localhost:3000/api/v1/calculateImpression/${id}`
        );
      } catch (err) {
        console.error("Error incrementing impression:", err);
        toast.error("Failed to increment impression", {
          position: "top-right",
        });
      } finally {
        dispatch(setLoading(false));
      }
    };
    incrementImpression();
  }, [id]);

  useEffect(() => {
    const fetchQuiz = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/getQuizById/${id}`
        );
        setQuiz(response.data.quiz);
        setLoading(false);
        setCurrentQuestionIndex(0);

        if (response.data.quiz.quizType === "Q&A") {
          const initialTimeLimit =
            response.data.quiz.questions[0].timeLimit || 0;
          setTimeLeft(initialTimeLimit);
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        toast.error("Failed to fetch quiz", {
          position: "top-right",
        });
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchQuiz();
  }, [id]);

  // useEffect(() => {
  //   if (quiz?.quizType === "Q&A" && timeLeft > 0) {
  //     const timer = setTimeout(
  //       () => setTimeLeft((prevTime) => prevTime - 1),
  //       1000
  //     );
  //     return () => clearTimeout(timer);
  //   } else if (timeLeft === 0) {
  //     handleNextQuestion();
  //   }
  // }, [timeLeft, quiz]);

  useEffect(() => {
    if (quiz?.quizType === "Q&A" && timeLeft > 0) {
      const timer = setTimeout(
        () => setTimeLeft((prevTime) => prevTime - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (quiz?.quizType === "Q&A" && timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, quiz]);

  useEffect(() => {
    if (quiz && quiz.questions.length > 0 && quiz.quizType === "Q&A") {
      const newTimeLimit = quiz.questions[currentQuestionIndex].timeLimit || 0;
      setTimeLeft(newTimeLimit);
    }
  }, [currentQuestionIndex, quiz]);

  // const handleOptionClick = (optionIndex) => {
  //   if (quiz) {
  //     setSelectedOption(optionIndex);
  //     const currentQuestionId = quiz.questions[currentQuestionIndex]._id;

  //     if (quiz.quizType === "Q&A") {
  //       const isCorrect =
  //         quiz.questions[currentQuestionIndex].options[optionIndex].isCorrect;
  //       const updatedResponses = [...responses];
  //       updatedResponses[currentQuestionIndex] = {
  //         questionId: currentQuestionId,
  //         isCorrect: isCorrect,
  //       };
  //       setResponses(updatedResponses);
  //     } else if (quiz.quizType === "Poll") {
  //       const selectedOptionId =
  //         quiz.questions[currentQuestionIndex].options[optionIndex]._id;
  //       const updatedResponses = [...responses];
  //       updatedResponses[currentQuestionIndex] = {
  //         questionId: currentQuestionId,
  //         selectedOptionId: selectedOptionId,
  //       };
  //       setResponses(updatedResponses);
  //     }
  //   }
  // };

  const handleOptionClick = (optionIndex) => {
    if (quiz) {
      // Determine the current question ID
      const currentQuestionId = quiz.questions[currentQuestionIndex]._id;
      
      // Check if the clicked option is already selected
      if (selectedOption === optionIndex) {
        // If the same option is clicked, unselect it
        setSelectedOption(null);
  
        // Remove the response for this question
        const updatedResponses = responses.filter(response => response.questionId !== currentQuestionId);
        setResponses(updatedResponses);
      } else {
        // Select the new option
        setSelectedOption(optionIndex);
  
        const updatedResponses = [...responses];
        if (quiz.quizType === "Q&A") {
          const isCorrect =
            quiz.questions[currentQuestionIndex].options[optionIndex].isCorrect;
          updatedResponses[currentQuestionIndex] = {
            questionId: currentQuestionId,
            isCorrect: isCorrect,
          };
        } else if (quiz.quizType === "Poll") {
          const selectedOptionId =
            quiz.questions[currentQuestionIndex].options[optionIndex]._id;
          updatedResponses[currentQuestionIndex] = {
            questionId: currentQuestionId,
            selectedOptionId: selectedOptionId,
          };
        }
        setResponses(updatedResponses);
      }
    }
  };
  

  useEffect(() => {
    if (quiz) {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setResponses([]);
      if (quiz.quizType === "Q&A" && quiz.questions[0].timeLimit) {
        setTimeLeft(quiz.questions[0].timeLimit);
      }
    }
  }, [quiz]);

  // const handleNextQuestion = () => {
  //   if (!quiz) return;
  //   const updatedResponses = [...responses];
  //   const currentQuestionId = quiz.questions[currentQuestionIndex]._id;
  //   if (selectedOption !== null) {
  //     if (quiz.quizType === "Q&A") {
  //       const isCorrect =
  //         quiz.questions[currentQuestionIndex].options[selectedOption]
  //           .isCorrect;
  //       updatedResponses[currentQuestionIndex] = {
  //         questionId: currentQuestionId,
  //         isCorrect: isCorrect,
  //       };
  //     } else if (quiz.quizType === "Poll") {
  //       const selectedOptionId =
  //         quiz.questions[currentQuestionIndex].options[selectedOption]._id;
  //       updatedResponses[currentQuestionIndex] = {
  //         questionId: currentQuestionId,
  //         selectedOptionId: selectedOptionId,
  //       };
  //     }
  //   } else {
  //     updatedResponses[currentQuestionIndex] = null;
  //   }
  //   setResponses(updatedResponses);
  //   if (currentQuestionIndex < quiz.questions.length - 1) {
  //     const nextQuestionIndex = currentQuestionIndex + 1;
  //     setCurrentQuestionIndex(nextQuestionIndex);
  //     setSelectedOption(null);
  //     if (quiz.quizType === "Q&A") {
  //       const newTimeLimit = quiz.questions[nextQuestionIndex].timeLimit || 0;
  //       setTimeLeft(newTimeLimit);
  //     }
  //   } else {
  //     handleSubmitQuiz();
  //   }
  // };

  const handleNextQuestion = () => {
    if (!quiz) return;
    const updatedResponses = [...responses];
    const currentQuestionId = quiz.questions[currentQuestionIndex]._id;
    if (selectedOption !== null) {
      if (quiz.quizType === "Q&A") {
        const isCorrect =
          quiz.questions[currentQuestionIndex].options[selectedOption]
            .isCorrect;
        updatedResponses[currentQuestionIndex] = {
          questionId: currentQuestionId,
          isCorrect: isCorrect,
        };
      } else if (quiz.quizType === "Poll") {
        const selectedOptionId =
          quiz.questions[currentQuestionIndex].options[selectedOption]._id;
        updatedResponses[currentQuestionIndex] = {
          questionId: currentQuestionId,
          selectedOptionId: selectedOptionId,
        };
      }
    } else {
      updatedResponses[currentQuestionIndex] = null;
    }
    setResponses(updatedResponses);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption(null);
      if (quiz.quizType === "Q&A") {
        const newTimeLimit = quiz.questions[nextQuestionIndex].timeLimit || 0;
        setTimeLeft(newTimeLimit);
      }
    } else {
      if (quiz.quizType === "Q&A" || quiz.quizType === "Poll") {
        handleSubmitQuiz();
      }
    }
  };

  const handleSubmitQuiz = async () => {
    const toastId = toast.loading("Submitting quiz...");
    dispatch(setLoading(true));
    try {
      const responsePayload = {
        quizId: id,
        responses: responses.filter((response) => response !== null),
      };
      await axios.post(
        "http://localhost:3000/api/v1/quiz/response",
        responsePayload
      );
      if (quiz.quizType === "Q&A") {
        const correctAnswersCount = responses.filter(
          (response) => response && response.isCorrect
        ).length;
        const totalQuestions = quiz.questions.length;
        toast.success("Quiz submitted successfully!", {
          position: "top-right",
        });
        navigate("/feedback", {
          state: { score: correctAnswersCount, totalQuestions },
        });
      } else if (quiz.quizType === "Poll") {
        toast.success("Poll submitted successfully!", {
          position: "top-right",
        });
        navigate("/pollFeedback");
      }
    } catch (err) {
      console.error("Error submitting quiz:", err);
      toast.error("Failed to submit quiz", {
        position: "top-right",
      });
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };

  if (isLoading) return <Loader />;
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>No questions available.</div>;
  }
  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className={styles.quizContainerbody}>
      <div className={styles.quizContainer}>
        <div className={styles.quizHeader}>
          <div className={styles.quizProgress}>
            0{currentQuestionIndex + 1}/0{quiz.questions.length}
          </div>
          {quiz.quizType === "Q&A" && currentQuestion.timeLimit > 0 && (
            <div className={styles.quizTimer}>{timeLeft} sec</div>
          )}
        </div>
        {/* _____________________________________________________ */}
        <div className={styles.quizQuestions}>
          <div key={currentQuestion._id} className={styles.quizQuestion}>
            <p>{currentQuestion.questionText}</p>
            <div className={styles.quizOptions}>
              {currentQuestion.options.map((option, optionIndex) => (
                <button
                  key={option._id}
                  className={`${styles.quizOption} ${
                    selectedOption === optionIndex
                      ? styles.quizOptionSelected
                      : ""
                  }`}
                  onClick={() => handleOptionClick(optionIndex)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* _____________________________________________________________ */}
        <button className={styles.quizNextButton} onClick={handleNextQuestion}>
          {currentQuestionIndex < quiz.questions.length - 1 ? "NEXT" : "SUBMIT"}
        </button>
      </div>
    </div>
  );
};

export default QuizInterface;
