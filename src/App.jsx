import React, { useEffect, useState } from "react";
import Quiz from "./components/quiz/quiz";
import Home from "./components/Home";
import Navbar from "./components/navbar/navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import { useAuthStore } from "./store/useAuthStore";

export const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading ... </p>;
  }

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <Login
            onBackToHome={() => handleNavigation("home")}
            onLoginSuccess={() => handleNavigation("home")}
          />
        );
      case "register":
        return (
          <Register
            onBackToHome={() => handleNavigation("home")}
            onRegisterSuccess={() => handleNavigation("home")}
          />
        );
      case "quiz":
        return <Quiz onBackToHome={() => handleNavigation("home")} />;
      default:
        return <Home onStartQuiz={() => handleNavigation("quiz")} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      <Navbar
        onHome={() => handleNavigation("home")}
        onLogin={() => handleNavigation("login")}
        onRegister={() => handleNavigation("register")}
      />
      {renderCurrentPage()}
    </div>
  );
};

export default App;
