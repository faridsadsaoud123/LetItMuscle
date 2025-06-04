import React from "react";

const HeroSlider: React.FC = () => {
  return (
    <div className="relative h-[60vh] bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Des programmes adaptés à vos objectifs
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Atteignez vos objectifs fitness avec nos programmes d'entraînement
            personnalisés
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Commencer maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
