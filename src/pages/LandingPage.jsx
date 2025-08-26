import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Welcome to AR Restaurant Menu 🍽️
      </h1>
      <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">
        Explore your dishes in Augmented Reality. Restaurants can create menus,
        upload 3D dishes, and customers can view them live!
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-transparent border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
