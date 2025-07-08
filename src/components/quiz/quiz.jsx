import React, { useRef, useState, useEffect } from "react";
import { data } from "../../assets/data";
import Footer from "../footer/footer.jsx";
import { useAuthStore } from "../../store/useAuthStore.jsx";

const Quiz = ({
  category,
  onBackToHome,
  difficulty,
  onBackToDifficulty,
  numberOfQuestions,
}) => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(null);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [filteredQuestions, setFilteredQuestions] = useState([]);

  const { user } = useAuthStore();

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let optionArray = [Option1, Option2, Option3, Option4];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (data[category] && data[category].length > 0) {
      const filtered = data[category].filter(
        (q) => q.difficulty === difficulty
      );
      const shuffledQuestions = shuffleArray(filtered);
      // Limiter le nombre de questions selon le nombre de questions choisi
      const limitedQuestions = shuffledQuestions.slice(0, numberOfQuestions);
      setFilteredQuestions(limitedQuestions);
      if (limitedQuestions.length === 0) {
        setQuestion(null);
      } else {
        setQuestion(limitedQuestions[0]);
        setIndex(0);
        setScore(0);
        setLock(false);
        setResult(false);
      }
    }
  }, [category, difficulty, numberOfQuestions]);

  const reset = () => {
    const filtered = data[category].filter((q) => q.difficulty === difficulty);
    const shuffledQuestions = shuffleArray(filtered);
    const limitedQuestions = shuffledQuestions.slice(0, numberOfQuestions);
    setFilteredQuestions(limitedQuestions);
    setIndex(0);
    setQuestion(limitedQuestions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  const next = () => {
    if (lock) {
      if (index === filteredQuestions.length - 1) {
        setResult(true);
        saveQuizResult();
        return 0;
      }
      setIndex(++index);
      setQuestion(filteredQuestions[index]);
      setLock(false);
      optionArray.map((option) => {
        option.current.classList.remove("bg-red-500");
        option.current.classList.remove("bg-green-500");
        return null;
      });
    } else {
      alert("You need to chose an answer");
    }
  };

  const saveQuizResult = async () => {
    if (!user) {
      console.log("User not connected");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/quiz/submit-result",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId: user._id,
            score: score,
            totalQuestions: filteredQuestions.length,
            difficulty: difficulty,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Quiz result saved successfully", data);
      } else {
        const errorData = await response.json();
        console.error("Error saving quiz result", errorData);
      }
    } catch (error) {
      console.error("Error saving quiz result", error);
    }
  };

  const checkAnser = (element, answer) => {
    if (!lock) {
      if (filteredQuestions[index].ans === answer) {
        element.target.classList.add("bg-green-500");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        element.target.classList.add("bg-red-500");
        setLock(true);
        optionArray[filteredQuestions[index].ans - 1].current.classList.add(
          "bg-green-500"
        );
      }
    }
  };

  if (!filteredQuestions || filteredQuestions.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-36 bg-white rounded-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Aucune question disponible.
        </h1>
        <p className="text-gray-600 mb-6">
          Désolé, il n'y a pas de questions pour cette {difficulty} dans la
          catégorie {category}.
        </p>
        <div className="space-x-4">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            onClick={onBackToDifficulty}
          >
            Choisir une autre difficulté :
          </button>
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            onClick={onBackToHome}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  if (!question) {
    return <div>Chargement ... </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête du quiz */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">
                🧠 Quiz - {category}
              </h1>
              <div className="flex justify-center items-center gap-6 text-white">
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  📊 Difficulté :{" "}
                  <span className="font-semibold">{difficulty}</span>
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  📝 Question {index + 1} sur {filteredQuestions.length}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <button
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-2xl hover:scale-105 transition-transform duration-200 font-semibold shadow-lg"
                onClick={onBackToHome}
              >
                🏠 Accueil
              </button>
            </div>

            {result ? (
              /* Écran de résultat */
              <div className="text-center">
                <div className="text-8xl mb-6">
                  {score >= filteredQuestions.length * 0.8
                    ? "🏆"
                    : score >= filteredQuestions.length * 0.6
                    ? "🥈"
                    : score >= filteredQuestions.length * 0.4
                    ? "🥉"
                    : "💪"}
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Quiz terminé !
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {score}/{filteredQuestions.length}
                  </div>
                  <div className="text-gray-600 text-lg">
                    Score :{" "}
                    {((score / filteredQuestions.length) * 100).toFixed(1)}%
                  </div>
                </div>
                <button
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-2xl hover:scale-105 transition-transform duration-200 text-lg font-semibold shadow-lg"
                  onClick={reset}
                >
                  🔄 Recommencer
                </button>
              </div>
            ) : (
              /* Question actuelle */
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    {question.question}
                  </h2>

                  {question.image && (
                    <div className="flex justify-center mb-6">
                      <img
                        src={question.image}
                        alt="Question"
                        className="max-w-md h-auto rounded-2xl shadow-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <div className="grid gap-4 mb-8">
                  {[
                    { ref: Option1, text: question.option1, num: 1 },
                    { ref: Option2, text: question.option2, num: 2 },
                    { ref: Option3, text: question.option3, num: 3 },
                    { ref: Option4, text: question.option4, num: 4 },
                  ].map((option) => (
                    <div
                      key={option.num}
                      className="bg-gray-50 hover:bg-blue-50 cursor-pointer px-6 py-4 rounded-2xl transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:shadow-lg"
                      ref={option.ref}
                      onClick={(e) => checkAnser(e, option.num)}
                    >
                      <div className="flex items-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold mr-4 text-sm">
                          {String.fromCharCode(64 + option.num)}
                        </span>
                        <span className="text-gray-800 font-medium">
                          {option.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl hover:scale-105 transition-transform duration-200 font-semibold shadow-lg text-lg"
                    onClick={next}
                  >
                    {index === filteredQuestions.length - 1
                      ? "🏁 Terminer"
                      : "➡️ Suivant"}
                  </button>
                </div>

                {/* Barre de progression */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Progression</span>
                    <span>
                      {Math.round(
                        ((index + 1) / filteredQuestions.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((index + 1) / filteredQuestions.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;
