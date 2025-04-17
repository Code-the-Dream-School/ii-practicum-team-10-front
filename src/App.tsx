import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Navbar } from "./components/user/navbar/Navbar";
import { Home } from "./pages/Home";
import { LogIn } from "./components/home/home_navbar/authentication/LogIn";
import { SignUp } from "./components/home/home_navbar/authentication/SignUp";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";
// import { NotFound } from "./components/";
import ProtectedRoute from "./hoc/ProtectedRoute";

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
          path="/leaderboard"
          element={
            <ProtectedRoute requiredRole="user">
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
