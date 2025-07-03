import React from "react";

const Home = ({ onStartQuiz }) => {
  return (
    <div className="max-w-xl mx-auto mt-36 bg-white rounded-lg p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Bienvenue au Quiz
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Testez vos connaissances avec notre quiz interactif ! Répondez aux
        questions et découvrez votre score.
      </p>
      <div className="bg-gray-100 rounded-lg p-6 mb-8 w-full">
        <h3 className="font-semibold text-lg mb-2">Règles du jeu :</h3>
        <ul className="text-gray-600 space-y-2">
          <li>• Répondez à toutes les questions</li>
          <li>• Une seule réponse par question</li>
          <li>• Votre score sera affiché à la fin</li>
        </ul>
      </div>
      <button
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
        onClick={onStartQuiz}
      >
        Commencer le Quiz
      </button>
    </div>
  );
};

export default Home;
