import React, { useState } from "react";
import axios from "axios";
import styles from "./QuizOrPollType.module.css";
import deleteIcon from "../../assets/deleteIcon.png";

const QuizOrPollType = ({ quizType, quizName, onClose, onNext}) => {
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

  const validateQuizCreation = () => {
    const allQuizzesCreated = questions.every((question) => {
      const hasCorrectOption =
        quizType === "Q&A" ? question.correctOptionId !== null : true;
      const hasValidTimeLimit =
        quizType === "Q&A" ? [0, 5, 10].includes(question.timeLimit) : true;

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
