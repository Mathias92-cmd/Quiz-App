import React from "react";

const Home = ({ onStartQuiz }) => {
  const handleCategorySelect = (category) => {
    onStartQuiz(category);
  };

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
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl mt-6 px-6 p-3 cursor-pointer text-white font-bold text-2xl">
            Commencer
          </button>
        </span>
      </header>
      <section className="bg-gradient-to-br from-custom-cyan via-custom-blue-2 to-custom-purple p-6 w-auto h-auto mt-6 flex-1">
        <h2 className="flex items-center justify-center text-4xl font-bold text-custom-blue-light mb-4">
          Quiz populaires
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 max-w-6xl mx-auto">
          <button
            onClick={() => handleCategorySelect("sport")}
            className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 h-82 flex flex-col justify-center focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            <div className="text-white text-6xl mb-6">⚽</div>
            <h3 className="text-white font-bold text-2xl">Sport</h3>
          </button>

          <button
            onClick={onStartQuiz}
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
            onClick={onStartQuiz}
            className="bg-gradient-to-br from-cyan-300 to-blue-400 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition-transform duration-200 h-82 flex flex-col justify-center focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            <div className="text-white text-6xl mb-6">🏛️</div>
            <h3 className="text-white font-bold text-2xl">Histoire</h3>
          </button>
        </div>
      </section>

      <footer className=" text-custom-text-blue font-bold py-8 flex items-center justify-center">
        <div className="container mx-auto text-center px-4">
          <p className="text-lg md:text-xl">
            &copy; {new Date().getFullYear()} Morel Mathias - Quiz de culture
            générale. Tous droits réservés.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Home;
