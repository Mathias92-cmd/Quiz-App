import React, { useEffect, useState } from "react";
import Quiz from "./components/quiz/quiz";
import Home from "./components/Home";
import Navbar from "./components/navbar/navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { data } from "./assets/data";

import { useAuthStore } from "./store/useAuthStore";

export const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState(0);
  const [showNumberOfQuestionsModal, setShowNumberOfQuestionsModal] =
    useState(false);

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
    setShowDifficultyModal(false);
    setShowNumberOfQuestionsModal(true);
  };

  const handleBackHome = () => {
    setCurrentPage("home");
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setShowDifficultyModal(false);
    setShowNumberOfQuestionsModal(false);
    setSelectedNumberOfQuestions(0);
  };

  const handleStartQuiz = (category) => {
    setSelectedCategory(category);
    setShowDifficultyModal(true);
  };

  const handleBackToDifficultySelection = () => {
    setShowDifficultyModal(true);
    setSelectedDifficulty(null);
  };

  const handleCloseModal = () => {
    setShowDifficultyModal(false);
    setSelectedCategory(null);
  };

  const handleCloseModalNumberOfQuestions = () => {
    setSelectedNumberOfQuestions(0);
    setShowNumberOfQuestionsModal(false);
  };

  const handleNumberOfQuestionsSelected = (number) => {
    setSelectedNumberOfQuestions(number);
    setShowNumberOfQuestionsModal(false);
    setCurrentPage("quiz");
  };

  const NumberOfQuestionsModal = () => {
    if (!showNumberOfQuestionsModal) return null;

    return (
      <div className="fixed inset-0  bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
        <div
          className="fixed inset-0"
          onClick={handleCloseModalNumberOfQuestions}
        />
        <section className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 w-[90%] max-w-4xl relative z-10 animate-fadeIn">
          <button
            onClick={handleCloseModalNumberOfQuestions}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold transition-colors duration-200"
          >
            ×
          </button>
          <header className="text-center mb-6">
            <h1 className="text-4xl text-white font-bold mb-2">
              Sélectionner le nombre de questions
            </h1>
            <p className="text-gray-200">
              Catégorie :{" "}
              <span className="font-semibold text-yellow-300">
                {selectedCategory === "sport"
                  ? "Sport"
                  : selectedCategory === "capital"
                  ? "Capitales"
                  : selectedCategory}
              </span>
            </p>
            <p className="text-gray-200">
              Difficulté :{" "}
              <span className="font-semibold text-yellow-300">
                {selectedDifficulty === "easy"
                  ? "Facile"
                  : selectedDifficulty === "medium"
                  ? "Moyen"
                  : selectedDifficulty === "hard"
                  ? "Difficile"
                  : selectedDifficulty}
              </span>
            </p>
            <p className="text-gray-200">
              {data[selectedCategory] &&
                `Il y a ${data[selectedCategory].length} questions disponibles`}
            </p>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <button
              onClick={() => handleNumberOfQuestionsSelected(5)}
              className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
            >
              <div className="text-white text-4xl mb-2">5️⃣</div>
              <h3 className="text-white font-bold text-xl mb-1">5 Questions</h3>
              <p className="text-blue-100 text-sm">Rapide</p>
            </button>

            <button
              onClick={() => handleNumberOfQuestionsSelected(10)}
              className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
            >
              <div className="text-white text-4xl mb-2">🔟</div>
              <h3 className="text-white font-bold text-xl mb-1">
                10 Questions
              </h3>
              <p className="text-green-100 text-sm">Standard</p>
            </button>

            <button
              onClick={() => handleNumberOfQuestionsSelected(15)}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-lg"
            >
              <div className="text-white text-4xl mb-2">1️⃣5️⃣</div>
              <h3 className="text-white font-bold text-xl mb-1">
                15 Questions
              </h3>
              <p className="text-yellow-100 text-sm">Complet</p>
            </button>

            <button
              onClick={() => handleNumberOfQuestionsSelected(20)}
              className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-lg"
            >
              <div className="text-white text-4xl mb-2">2️⃣0️⃣</div>
              <h3 className="text-white font-bold text-xl mb-1">
                20 Questions
              </h3>
              <p className="text-red-100 text-sm">Marathon</p>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleCloseModalNumberOfQuestions}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
            >
              Annuler
            </button>
          </div>
        </section>
      </div>
    );
  };

  const DifficultyModal = () => {
    if (!showDifficultyModal) return null;

    return (
      <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="fixed inset-0" onClick={handleCloseModal} />
        <section className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 w-[90%] max-w-4xl relative z-10">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold transition-colors duration-200"
          >
            ×
          </button>

          <header className="text-center mb-6">
            <h1 className="text-4xl text-white font-bold mb-2">
              Sélectionner la difficulté
            </h1>
            <p className="text-gray-200">
              Catégorie :{" "}
              <span className="font-semibold text-yellow-300">
                {selectedCategory === "sport"
                  ? "Sport"
                  : selectedCategory === "capital"
                  ? "Capitales"
                  : selectedCategory}
              </span>
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <button
              onClick={() => handleDifficultySelect("easy")}
              className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
            >
              <div className="text-white text-5xl mb-2">😊</div>
              <h3 className="text-white font-bold text-2xl mb-1">Facile</h3>
              <p className="text-green-100 text-sm">Questions basiques</p>
            </button>

            <button
              onClick={() => handleDifficultySelect("medium")}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-lg"
            >
              <div className="text-white text-5xl mb-2">🤔</div>
              <h3 className="text-white font-bold text-2xl mb-1">Moyen</h3>
              <p className="text-yellow-100 text-sm">Un peu plus difficile</p>
            </button>

            <button
              onClick={() => handleDifficultySelect("hard")}
              className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-lg"
            >
              <div className="text-white text-5xl mb-2">😰</div>
              <h3 className="text-white font-bold text-2xl mb-1">Difficile</h3>
              <p className="text-red-100 text-sm">Pour les experts</p>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleCloseModal}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md"
            >
              Annuler
            </button>
          </div>
        </section>
      </div>
    );
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
            difficulty={selectedDifficulty}
            numberOfQuestions={selectedNumberOfQuestions}
            onBackToHome={() => handleNavigation("home")}
            onBackToDifficulty={handleBackToDifficultySelection}
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
      <DifficultyModal />
      <NumberOfQuestionsModal />
    </div>
  );
};

export default App;
