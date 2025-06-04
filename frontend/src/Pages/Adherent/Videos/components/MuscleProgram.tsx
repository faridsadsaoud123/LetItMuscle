
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Dumbbell, Clock, CalendarDays } from "lucide-react";
import SectionTitle from "./SectionTitle";

const MuscleProgram: React.FC = () => {
  const programDetails = {
    title: "Programme Musculation",
    subtitle: "Développez votre force et votre masse musculaire",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Notre programme de musculation est conçu pour vous aider à développer vos muscles, augmenter votre force et transformer votre physique. Que vous soyez débutant ou avancé, ce programme s'adapte à votre niveau et vous permettra d'atteindre vos objectifs.",
    duration: "12 semaines",
    sessions: "4-5 sessions par semaine",
    level: "Intermédiaire à avancé",
    objectives: [
      "Augmentation de la masse musculaire",
      "Développement de la force",
      "Amélioration de la définition musculaire",
      "Optimisation des performances physiques"
    ],
    plan: [
      {
        name: "Phase 1: Adaptation (2 semaines)",
        description: "Préparation du corps aux charges lourdes avec des exercices de base et un volume modéré."
      },
      {
        name: "Phase 2: Hypertrophie (6 semaines)",
        description: "Travail d'hypertrophie avec séries moyennes (8-12 répétitions) et volume élevé pour développer la masse musculaire."
      },
      {
        name: "Phase 3: Force (4 semaines)",
        description: "Travail de force avec charges lourdes, séries courtes (4-6 répétitions) et récupération complète."
      }
    ],
    weekSample: [
      {
        day: "Lundi",
        focus: "Poitrine et Triceps",
        exercises: ["Développé couché", "Écarté haltères", "Presse déclinée", "Extensions triceps"]
      },
      {
        day: "Mardi",
        focus: "Dos et Biceps",
        exercises: ["Tractions", "Rowing", "Tirage poitrine", "Curl biceps"]
      },
      {
        day: "Mercredi",
        focus: "Récupération active ou cardio",
        exercises: []
      },
      {
        day: "Jeudi",
        focus: "Épaules et Abdominaux",
        exercises: ["Développé militaire", "Élévations latérales", "Élévations frontales", "Crunchs"]
      },
      {
        day: "Vendredi",
        focus: "Jambes et Fessiers",
        exercises: ["Squat", "Presse à cuisses", "Extensions", "Soulevé de terre"]
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

            <h3 className="text-2xl font-semibold text-white mb-4">Structure du programme</h3>
            <div className="space-y-6 mb-10">
              {programDetails.plan.map((phase, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-orange-500 mb-2">{phase.name}</h4>
                  <p className="text-gray-300">{phase.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">Exemple de semaine</h3>
            <div className="space-y-4 mb-8">
              {programDetails.weekSample.map((day, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-5">
                  <h4 className="text-xl font-semibold text-white mb-2">{day.day} - {day.focus}</h4>
                  {day.exercises.length > 0 ? (
                    <ul className="list-disc pl-6 text-gray-300">
                      {day.exercises.map((exercise, idx) => (
                        <li key={idx}>{exercise}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300">Journée de récupération</p>
                  )}
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
                <Dumbbell size={20} className="text-orange-500 mr-3" />
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
              <p className="text-gray-300 italic mb-4">"Grâce à ce programme, j'ai pris 5kg de muscle en 3 mois. Les exercices sont bien expliqués et la progression est adaptée."</p>
              <p className="font-semibold text-orange-500">Thomas D.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"J'ai vu une réelle amélioration de ma force et de ma définition musculaire. Le programme est intense mais les résultats sont là !"</p>
              <p className="font-semibold text-orange-500">Julie M.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"Ce programme m'a permis de sortir de ma routine et d'explorer de nouveaux exercices. Mon corps a très bien répondu à cette nouvelle stimulation."</p>
              <p className="font-semibold text-orange-500">Maxime R.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MuscleProgram;
