import React from "react";
import Footer from "./footer/footer";
import { useState, useEffect } from "react";

const Home = ({ onStartQuiz }) => {
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCategorySelect = (category) => {
    onStartQuiz(category);
  };

  const fetchRanking = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://quiz-app-6rr9.onrender.com/api/quiz/ranking"
      );
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch ranking");
      }
      const data = await response.json();
      setRanking(data.data);
      console.log("Ranking data:", data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <section className="min-h-screen flex flex-col">
      <header>
        <h1 className="flex items-center justify-center mt-15 text-5xl text-custom-text-blue font-family-poppins font-bold">
          Quizz de culture générale
        </h1>
        <span className="flex items-center justify-center mt-4">
          <p className="text-gray-500 font-medium text-center mt-4 text-xl">
            Testez vos connaissances avec nos quiz de culture générale
          </p>
        </span>
        {/*Button to start the quiz*/}
        <span className="flex items-center justify-center mt-4">
          <button
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl mt-6 px-6 p-3 cursor-pointer text-white font-bold text-2xl"
            onClick={() => handleCategorySelect("culture")}
          >
            Commencer
          </button>
        </span>
      </header>
      <section className="bg-gradient-to-br from-custom-cyan via-custom-blue-2 to-custom-purple p-6 w-auto h-auto mt-6 flex-1">
        <h2 className="flex items-center justify-center text-4xl font-bold text-custom-blue-light mb-4">
          Quiz populaires
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 max-w-6xl mx-auto">
          <button
            onClick={() => handleCategorySelect("sport")}
            className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 h-82 flex flex-col justify-center focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            <div className="text-white text-6xl mb-6">⚽</div>
            <h3 className="text-white font-bold text-2xl">Sport</h3>
          </button>

          <button
            onClick={() => handleCategorySelect("drapeaux")}
            className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 h-82 flex flex-col justify-center focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            <div className="text-white text-6xl mb-6">🏴</div>
            <h3 className="text-white font-bold text-2xl">Drapeaux</h3>
          </button>

          <button
            onClick={() => handleCategorySelect("capital")}
            className="bg-gradient-to-br from-lime-300 to-green-500 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 h-82 flex flex-col justify-center focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <div className="text-white text-6xl mb-6">🏙️</div>
            <h3 className="text-white font-bold text-2xl">Capital</h3>
          </button>

          <button
            onClick={() => handleCategorySelect("culture")}
            className="bg-gradient-to-br from-cyan-300 to-blue-400 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 h-82 flex flex-col justify-center focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            <div className="text-white text-6xl mb-6">🏛️</div>
            <h3 className="text-white font-bold text-2xl">Culture</h3>
          </button>

          <button
            onClick={() => handleCategorySelect("manga")}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 h-82 flex flex-col justify-center focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            <div className="text-white text-6xl mb-6">🐉</div>
            <h3 className="text-white font-bold text-2xl">Manga</h3>
          </button>
        </div>
      </section>
      <section>
        <div className="max-w-6xl mx-auto mt-6 p-6">
          <h2 className="text-4xl font-bold text-center mb-2">
            <span className="text-4xl mr-2">🏆</span>
            <span className="bg-gradient-to-r from-custom-text-blue to-purple-600 bg-clip-text text-transparent">
              Classement des Champions
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Découvrez les 10 meilleurs joueurs de notre quiz de culture générale
          </p>
          {ranking.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
                <div className="grid grid-cols-6 md:grid-cols-6 gap-4 text-white font-bold text-sm uppercase tracking-wider">
                  <div className="text-center">Position</div>
                  <div>Joueur</div>
                  <div className="text-center hidden md:block">Score Total</div>
                  <div className="text-center hidden md:block">Quiz Joués</div>
                  <div className="text-center hidden md:block">Niveau</div>
                  <div className="text-center hidden md:block">Moyenne</div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {ranking.map((user, index) => (
                  <div
                    key={user._id}
                    className={`grid grid-cols-6 gap-4 p-6 items-center transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {/* Position avec médailles */}
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 md:w-12 rounded-full text-sm md:text-lg font-bold text-white shadow-lg ${
                            index === 0
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                              : index === 1
                              ? "bg-gradient-to-br from-gray-400 to-gray-600"
                              : index === 2
                              ? "bg-gradient-to-br from-orange-400 to-orange-600"
                              : "bg-gradient-to-br from-blue-400 to-blue-600"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className="text-2xl mt-1">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                        </div>
                      )}
                    </div>

                    {/* Nom du joueur */}
                    <div>
                      <div className="font-bold text-gray-900 text-base md:text-lg">
                        {user.username}
                      </div>
                      {index < 3 && (
                        <div className="text-sm text-gray-500">
                          {index === 0
                            ? "Champion"
                            : index === 1
                            ? "Vice-Champion"
                            : "3ème place"}
                        </div>
                      )}
                    </div>

                    {/* Score total */}
                    <div className="text-center">
                      <div className="font-bold text-lg md:text-2xl text-blue-600">
                        {user.totalScore}
                      </div>
                      <div className="text-xs text-gray-500">scores</div>
                    </div>

                    {/* Nombre de quiz */}
                    <div className="text-center hidden md:block">
                      <div className="font-semibold text-lg text-gray-700">
                        {user.totalQuizzes}
                      </div>
                      <div className="text-xs text-gray-500">quiz</div>
                    </div>

                    {/* Niveau avec badge */}
                    <div className="text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.level >= 10
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : user.level >= 5
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                            : "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                        }`}
                      >
                        <span className="mr-1">⭐</span>
                        Niv. {user.level}
                      </span>
                    </div>

                    {/* Moyenne */}
                    <div className="text-center">
                      <div className="font-semibold text-lg text-gray-700">
                        {user.averageScore
                          ? user.averageScore.toFixed(1)
                          : "0.0"}
                      </div>
                      <div className="text-xs text-gray-500">moy.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-4">Aucun classement disponible</p>
          )}
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Home;
