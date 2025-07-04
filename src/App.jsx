import React, { useEffect, useState } from "react";
import Quiz from "./components/quiz/quiz";
import Home from "./components/Home";
import Navbar from "./components/navbar/navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import { useAuthStore } from "./store/useAuthStore";
import { set } from "mongoose";

export const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading ... </p>;
  }

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage("quiz");
  };

  const handleBackHome = () => {
    setCurrentPage("home");
    setSelectedCategory(null);
    setSelectedDifficulty("");
  };

  const handleStartQuiz = (category) => {
    setSelectedCategory(category);
    setCurrentPage("quiz");
  };

  const handleBackToDifficultySelection = () => {
    setCurrentPage("difficulty");
    setSelectedDifficulty("");
  };

  const difficultyModal = () => {
    <section className="min-h-screen flex flex-col">
      <header className="text-center py-8">
        <h1 className="text-5xl text-white font-bold mb-4">
          Sélectionner la difficulté
        </h1>
        <p className="text-gray-300 mb-6">
          Catégorie :{" "}
          {data.category.map((cat) => (
            <span key={cat} className="font-semibold">
              {cat}
            </span>
          ))}
        </p>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto p-6">
          <button
            onClick={() => handleDifficultySelect("easy")}
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-12 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <div className="text-white text-6xl mb-4">😊</div>
            <h3 className="text-white font-bold text-3xl mb-2">Facile</h3>
            <p className="text-green-100">Questions basiques</p>
          </button>

          <button
            onClick={() => handleDifficultySelect("medium")}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-12 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            <div className="text-white text-6xl mb-4">🤔</div>
            <h3 className="text-white font-bold text-3xl mb-2">Moyen</h3>
            <p className="text-yellow-100">Un peu plus difficile</p>
          </button>

          <button
            onClick={() => handleDifficultySelect("hard")}
            className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-12 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            <div className="text-white text-6xl mb-4">😰</div>
            <h3 className="text-white font-bold text-3xl mb-2">Difficile</h3>
            <p className="text-red-100">Pour les experts</p>
          </button>
        </div>
      </div>
      <div className="text-center py-8">
        <button
          onClick={handleBackToHome}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          Retour à l'accueil
        </button>
      </div>
    </section>;
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
        return (
          <Quiz
            category={selectedCategory}
            onBackToHome={() => handleNavigation("home")}
          />
        );
      default:
        return <Home onStartQuiz={handleStartQuiz} />;
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
