import React from "react";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = ({ onLogin, onRegister, onHome }) => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    const { message } = await logout();
    console.log(message);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onHome}
              className="text-xl font-bold hover:text-blue-200 transition cursor-pointer"
            >
              QuizMask
            </button>
          </div>

          {!user ? (
            <div className="flex space-x-4">
              <button
                onClick={onLogin}
                className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition"
              >
                Login
              </button>
              <button
                onClick={onRegister}
                className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg transition"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold">
                Welcome, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
