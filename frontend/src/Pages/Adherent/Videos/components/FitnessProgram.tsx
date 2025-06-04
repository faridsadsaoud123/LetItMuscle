
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Clock, CalendarDays, Activity } from "lucide-react";
import SectionTitle from "./SectionTitle";

const FitnessProgram: React.FC = () => {
  const programDetails = {
    title: "Programme Remise en Forme",
    subtitle: "Retrouvez votre énergie et votre vitalité",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Notre programme de remise en forme est parfait pour ceux qui souhaitent retrouver une bonne condition physique, perdre du poids et gagner en énergie. Ce programme complet combine cardio, renforcement musculaire et exercices de mobilité pour des résultats optimaux.",
    duration: "8 semaines",
    sessions: "3-4 sessions par semaine",
    level: "Tous niveaux",
    objectives: [
      "Perte de poids et réduction de la masse graisseuse",
      "Amélioration de l'endurance cardiovasculaire",
      "Tonification musculaire générale",
      "Augmentation de l'énergie au quotidien"
    ],
    plan: [
      {
        name: "Phase 1: Réactivation (2 semaines)",
        description: "Remise en mouvement progressive avec des exercices à faible impact et intensité modérée pour préparer le corps."
      },
      {
        name: "Phase 2: Construction (4 semaines)",
        description: "Augmentation progressive de l'intensité et introduction d'exercices plus complexes pour brûler des calories et tonifier le corps."
      },
      {
        name: "Phase 3: Intensification (2 semaines)",
        description: "Sessions plus intenses utilisant des méthodes comme les circuits et HIIT pour maximiser les résultats."
      }
    ],
    weekSample: [
      {
        day: "Lundi",
        focus: "Full Body & Cardio",
        exercises: ["Squat avec poids de corps", "Pompes modifiées", "Mountain climbers", "Burpees"]
      },
      {
        day: "Mardi",
        focus: "Récupération active",
        exercises: ["Marche rapide", "Stretching", "Mobilité articulaire"]
      },
      {
        day: "Mercredi",
        focus: "Circuit Training",
        exercises: ["Fentes alternées", "Rowing avec élastique", "Planche", "Jumping jacks"]
      },
      {
        day: "Jeudi",
        focus: "Repos complet",
        exercises: []
      },
      {
        day: "Vendredi",
        focus: "HIIT & Core",
        exercises: ["Intervals sprints/marche", "Crunchs", "Russian twist", "Planche latérale"]
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

            <div className="bg-orange-500 bg-opacity-10 border border-orange-500 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Idéal pour:</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>Les personnes ayant un style de vie sédentaire</li>
                <li>Ceux qui reprennent une activité physique après une longue pause</li>
                <li>Les personnes souhaitant perdre du poids sainement</li>
                <li>Ceux qui recherchent un programme complet sans équipement spécialisé</li>
              </ul>
            </div>

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
                    <p className="text-gray-300">Journée de repos</p>
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
                <Activity size={20} className="text-orange-500 mr-3" />
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
              <p className="text-gray-300 italic mb-4">"Ce programme m'a permis de perdre 8kg en 2 mois sans me sentir affamé ou épuisé. Les exercices sont variés et motivants."</p>
              <p className="font-semibold text-orange-500">Sophie L.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"Après des années sans activité physique, ce programme a été parfait pour me remettre en mouvement progressivement. Je me sens beaucoup plus énergique !"</p>
              <p className="font-semibold text-orange-500">Marc D.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"La combinaison cardio et renforcement est excellente. J'ai perdu du poids tout en tonifiant mon corps. Je recommande vivement !"</p>
              <p className="font-semibold text-orange-500">Émilie T.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FitnessProgram;
