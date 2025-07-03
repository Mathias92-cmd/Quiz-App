import React, { useRef, useState, useEffect } from "react";
import { data } from "../../assets/data";

const Quiz = ({ category, onBackToHome }) => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    if (data[category] && data[category].length > 0) {
      setQuestion(data[category][0]);
      setIndex(0);
      setScore(0);
      setLock(false);
      setResult(false);
    }
  }, [category]);

  const reset = () => {
    setIndex(0);
    setQuestion(data[category][0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  const next = () => {
    if (lock) {
      if (index === data[category].length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[category][index]);
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
      if (question.ans === answer) {
        element.target.classList.add("bg-green-500");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        element.target.classList.add("bg-red-500");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("bg-green-500");
      }
    }
  };

  if (!question) {
    return <div>Chargement ... </div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-36 bg-white rounded-lg p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Quiz - {category}
      </h1>
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
              className="w-full h-auto mb-4 rounded-lg shadow-md"
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
            Next
          </button>
          <div className="text-gray-500 text-sm">
            Question {index + 1} of {data[category].length}
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You scored {score} of {data[category].length}
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
  );
};

export default Quiz;
