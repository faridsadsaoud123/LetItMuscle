import React, { useState, useEffect } from "react";
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const HeroSlider: React.FC = () => {
  const slides: Slide[] = [
    {
      id: 1,
      title: "Cours collectifs",
      description:
        "Rejoignez nos cours collectifs dynamiques et motivants. Exercez-vous en groupe, dans une ambiance conviviale et énergique avec nos coachs expérimentés. Idéal pour rester motivé et progresser ensemble.",
      image: slide3,
    },
    {
      id: 2,
      title: "Coaching",
      description:
        "Bénéficiez d'un accompagnement personnalisé avec nos coachs professionnels. Notre programme de coaching individuel est conçu pour vous aider à atteindre vos objectifs spécifiques, en adaptant les exercices à votre niveau et vos besoins.",
      image: slide2,
    },
    {
      id: 3,
      title: "Yoga",
      description:
        "Découvrez notre programme de yoga pour une harmonie corps-esprit parfaite. Nos séances vous aident à développer votre souplesse, renforcer votre corps et trouver votre équilibre intérieur dans un environnement calme et apaisant.",
      image: slide1,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto h-full px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white max-w-xl mt-10 md:mt-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg mb-8">{slide.description}</p>
            </div>
            <div className="md:w-1/2 p-4 hidden md:block">
              <div className="bg-orange-500/20 p-4 rounded-lg">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto rounded-lg object-cover max-h-[300px]"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-orange-500" : "bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
