import React, { useRef, useState, useEffect } from "react";
import { data } from "../../assets/data";
import Footer from "../footer/footer.jsx";

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
    <>
      <div className="max-w-xl mx-auto mt-15 bg-white rounded-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Quiz - {category}
        </h1>
        <p className="text-gray-600 mb-6">Difficulté : {difficulty}</p>
        <div className="flex-col items-center mb-6">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            onClick={onBackToHome}
          >
            Home
          </button>
        </div>
        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <hr className="w-full mb-6 border-gray-200" />
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              {index + 1}. {question.question}
            </h2>
            {/* Si la question a une image on l'affiche */}
            {question.image && (
              <img
                src={question.image}
                alt="Question"
                className="w-96 h-96 mb-4 rounded-lg shadow-md"
              />
            )}
            <ul className="w-full mb-6 space-y-3">
              <li
                className="bg-gray-100 hover:bg-blue-100 cursor-pointer px-4 py-2 rounded transition"
                ref={Option1}
                onClick={(e) => {
                  checkAnser(e, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                className="bg-gray-100 hover:bg-blue-100 cursor-pointer px-4 py-2 rounded transition"
                ref={Option2}
                onClick={(e) => {
                  checkAnser(e, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                className="bg-gray-100 hover:bg-blue-100 cursor-pointer px-4 py-2 rounded transition"
                ref={Option3}
                onClick={(e) => {
                  checkAnser(e, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                className="bg-gray-100 hover:bg-blue-100 cursor-pointer px-4 py-2 rounded transition"
                ref={Option4}
                onClick={(e) => {
                  checkAnser(e, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mb-4 cursor-pointer"
              onClick={next}
            >
              Suivant
            </button>
            <div className="text-gray-500 text-sm">
              Question {index + 1} sur {filteredQuestions.length}
            </div>
          </>
        )}
        {result ? (
          <>
            <h2>
              You scored {score} of {filteredQuestions.length}
            </h2>
            <button
              className="bg-black text-red-500 p-5 m-5 rounded-2px cursor-pointer"
              onClick={reset}
            >
              Reset
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Quiz;
