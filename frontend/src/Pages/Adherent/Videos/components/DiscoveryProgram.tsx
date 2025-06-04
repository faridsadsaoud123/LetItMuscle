
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Clock, CalendarDays, Star } from "lucide-react";
import SectionTitle from "./SectionTitle";

const DiscoveryProgram: React.FC = () => {
  const programDetails = {
    title: "Programme Découverte",
    subtitle: "Explorez différentes disciplines et trouvez ce qui vous convient",
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Notre programme découverte est idéal pour les débutants qui souhaitent explorer différentes méthodes d'entraînement et trouver celle qui leur convient le mieux. Vous expérimenterez une variété de disciplines et techniques pour construire des bases solides et découvrir ce qui vous motive.",
    duration: "6 semaines",
    sessions: "2-3 sessions par semaine",
    level: "Débutant",
    objectives: [
      "Découvrir différentes méthodes d'entraînement",
      "Apprendre les mouvements fondamentaux",
      "Développer une base de condition physique",
      "Identifier vos préférences et talents naturels"
    ],
    disciplines: [
      {
        name: "Musculation fonctionnelle",
        description: "Apprenez les mouvements de base qui renforcent l'ensemble du corps et améliorent votre vie quotidienne."
      },
      {
        name: "Cardio-training",
        description: "Découvrez différentes formes d'exercices cardiovasculaires pour améliorer votre endurance."
      },
      {
        name: "Mobilité et étirements",
        description: "Améliorez votre souplesse et préparez votre corps aux exercices plus intenses."
      },
      {
        name: "HIIT (High Intensity Interval Training)",
        description: "Expérimentez l'entraînement par intervalles à haute intensité pour des résultats rapides."
      },
      {
        name: "Yoga fitness",
        description: "Combinez renforcement et flexibilité avec des mouvements inspirés du yoga."
      }
    ],
    weekSample: [
      {
        day: "Lundi",
        focus: "Musculation fonctionnelle",
        exercises: ["Squat avec poids de corps", "Pompes modifiées", "Ponts fessiers", "Planche"]
      },
      {
        day: "Mercredi",
        focus: "Cardio et HIIT",
        exercises: ["Échauffement cardio", "Circuits HIIT", "Exercices de mobilité"]
      },
      {
        day: "Vendredi",
        focus: "Yoga fitness",
        exercises: ["Flow dynamique", "Postures de renforcement", "Étirements profonds"]
      }
    ]
  };

  return (
    <div className="bg-gray-900">
      <div 
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${programDetails.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center px-8">
          <div className="container mx-auto">
            <Link to="/programmes" className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-4">
              <ChevronLeft size={20} />
              <span>Retour aux programmes</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{programDetails.title}</h1>
            <p className="text-xl text-orange-500">{programDetails.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6">À propos du programme</h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              {programDetails.description}
            </p>

            <h3 className="text-2xl font-semibold text-white mb-4">Objectifs du programme</h3>
            <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
              {programDetails.objectives.map((objective, index) => (
                <li key={index} className="text-lg">{objective}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-4">Disciplines explorées</h3>
            <div className="space-y-4 mb-8">
              {programDetails.disciplines.map((discipline, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-5">
                  <h4 className="text-xl font-semibold text-orange-500 mb-2">{discipline.name}</h4>
                  <p className="text-gray-300">{discipline.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-orange-500 bg-opacity-10 border border-orange-500 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Pourquoi ce programme ?</h3>
              <p className="text-gray-300 mb-4">
                La clé pour maintenir une routine d'exercice à long terme est de trouver des activités que vous appréciez vraiment. Ce programme vous permet d'explorer différentes options sans vous engager dans une seule voie trop rapidement.
              </p>
              <p className="text-gray-300">
                À la fin des 6 semaines, vous aurez une meilleure idée de ce qui vous motive et des activités où vous excellez naturellement, ce qui vous permettra de choisir votre prochain programme en toute connaissance de cause.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">Exemple de semaine</h3>
            <div className="space-y-4 mb-8">
              {programDetails.weekSample.map((day, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-5">
                  <h4 className="text-xl font-semibold text-white mb-2">{day.day} - {day.focus}</h4>
                  <ul className="list-disc pl-6 text-gray-300">
                    {day.exercises.map((exercise, idx) => (
                      <li key={idx}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-6">Informations</h3>
              
              <div className="flex items-center mb-4">
                <Clock size={20} className="text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Durée</p>
                  <p className="text-white">{programDetails.duration}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <CalendarDays size={20} className="text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Fréquence</p>
                  <p className="text-white">{programDetails.sessions}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <Star size={20} className="text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Niveau</p>
                  <p className="text-white">{programDetails.level}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Prêt à commencer ?</h4>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded transition duration-300">
                  Rejoindre ce programme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <SectionTitle>Témoignages</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"Ce programme est parfait pour les débutants comme moi. J'ai découvert que j'adorais le HIIT et maintenant je m'oriente vers un programme plus spécialisé."</p>
              <p className="font-semibold text-orange-500">Nicolas P.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"Après des années d'hésitation, j'ai enfin trouvé des activités physiques qui me plaisent. Les coachs sont attentifs et les explications claires."</p>
              <p className="font-semibold text-orange-500">Laura M.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"J'avais peur de me lancer dans le fitness. Ce programme m'a permis d'apprendre à mon rythme et de me sentir en confiance avant de rejoindre des cours collectifs."</p>
              <p className="font-semibold text-orange-500">David S.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscoveryProgram;
