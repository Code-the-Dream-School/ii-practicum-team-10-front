import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LogIn } from "./components/home/home_navbar/authentication/LogIn";
import { SignUp } from "./components/home/home_navbar/authentication/SignUp";
import Layout from "./pages/Layout";
import Dashboard from "./components/user/dashboard/Dashboard";
import Learn from "./pages/Learn";
import Leaderboard from "./pages/Leaderboard";
import ProtectedRoute from "./hoc/ProtectedRoute";
import HtmlPractice from './components/user/learn/html_practice/HtmlPractice';
import CssPractice from './components/user/learn/css_practice/CssPractice';
import JavaScriptPractice from './components/user/learn/javascript_folder/JavascriptPractice';
import ReactPractice from './components/user/learn/react_practice/ReactPractice'
import NodeJsPractice from "./components/user/learn/nodejs_practice/NodejsPractice";
import QuizPage from "./pages/QuizPage";
import QuizSummaryPage from "./pages/QuizSummaryPage";
import CssFlashcards from "./components/user/learn/css_practice/CssFlashcards";
import HtmlFlashcards from "./components/user/learn/html_practice/HtmlFlashcards";
import JavascriptFlashcards from "./components/user/learn/javascript_folder/JavascriptFlashcards";
import NodejsFlashcards from "./components/user/learn/nodejs_practice/NodejsFlashcards";
import ReactFlashcards from "./components/user/learn/react_practice/ReactFlashcards";

const App: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <ProtectedRoute requiredRole="user">
              <Learn />
            </ProtectedRoute>
          }
        />  
        
        <Route
          path="/learn/html"
          element={
            <ProtectedRoute requiredRole="user">
              <HtmlPractice />
            </ProtectedRoute>
            }
          />
                  
        <Route
          path="/learn/html/flashcards"
          element={
            <ProtectedRoute requiredRole="user">
              <HtmlFlashcards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/css"
          element={
            <ProtectedRoute requiredRole="user">
              <CssPractice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/css/flashcards"
          element={
            <ProtectedRoute requiredRole="user">
              <CssFlashcards />
            </ProtectedRoute>
          }
        />


        <Route
          path="/learn/javascript"
          element={
            <ProtectedRoute requiredRole="user">
              <JavaScriptPractice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/javascript/flashcards"
          element={
            <ProtectedRoute requiredRole="user">
              <JavascriptFlashcards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/react"
          element={
            <ProtectedRoute requiredRole="user">
              <ReactPractice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/react/flashcards"
          element={
            <ProtectedRoute requiredRole="user">
              <ReactFlashcards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/nodejs"
          element={
            <ProtectedRoute requiredRole="user">
              <NodeJsPractice />
            </ProtectedRoute>
          }
        />
            <Route
            path="/quizpage"
            element={
              <ProtectedRoute requiredRole="user">
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz_summary"
            element={
              <ProtectedRoute requiredRole="user">
                <QuizSummaryPage />
              </ProtectedRoute>
            }
          />
      

        <Route
          path="/learn/nodejs/flashcards"
          element={
            <ProtectedRoute requiredRole="user">
              <NodejsFlashcards />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute requiredRole="user">
              <Leaderboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
