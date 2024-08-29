import "./App.css";
import Dashboard from "./components/Dashboard";
import PollFeedback from "./components/PollFeedback";
import QuizAnalysis from "./components/QuizAnalysis";
import QuizFeedback from "./components/QuizFeedback";
import QuizInterface from "./components/QuizInterface ";
import QuizQuestionAnalysis from "./components/QuizQuestionAnalysis";
import Sidebar from "./components/Sidebar";
import Error from "./pages/Error";
import SignupLogin from "./pages/SignupLogin";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        
        {/* <Route
          path="/home"
          element={
            <PrivateRoute>
              <Sidebar />
            </PrivateRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="quizAnalysis"
            element={
              <PrivateRoute>
                <QuizAnalysis />
              </PrivateRoute>
            }
          />
          <Route
            path="quizQuestionAnalysis/:quizId"
            element={
              <PrivateRoute>
                <QuizQuestionAnalysis />
              </PrivateRoute>
            }
          />
        </Route> */}

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<QuizAnalysis />} />
          <Route path="quizQuestionAnalysis/:quizId" element={<QuizQuestionAnalysis />} />
          
        </Route>
       
        <Route path="/quizInterface/:id" element={<QuizInterface />} />
        <Route path="/feedback" element={<QuizFeedback />} />
        <Route path="/pollFeedback" element={<PollFeedback />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
