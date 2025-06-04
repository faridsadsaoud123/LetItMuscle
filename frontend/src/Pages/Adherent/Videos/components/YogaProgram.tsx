
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Clock, CalendarDays, Heart } from "lucide-react";
import SectionTitle from "./SectionTitle";

const YogaProgram: React.FC = () => {
  const programDetails = {
    title: "Programme Yoga",
    subtitle: "Harmonisez votre corps et votre esprit",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    description: "Notre programme de yoga est conçu pour améliorer votre flexibilité, votre force et votre équilibre tout en favorisant la relaxation mentale et la pleine conscience. Que vous soyez débutant ou pratiquant expérimenté, ce programme vous guidera à travers diverses techniques de yoga pour développer une pratique équilibrée.",
    duration: "10 semaines",
    sessions: "3-5 sessions par semaine",
    level: "Tous niveaux",
    objectives: [
      "Amélioration de la flexibilité et de la mobilité",
      "Développement de la force et de l'équilibre",
      "Réduction du stress et amélioration du bien-être mental",
      "Apprentissage d'une respiration consciente",
      "Développement d'une pratique personnelle"
    ],
    styles: [
      {
        name: "Hatha Yoga",
        description: "Un style doux et accessible qui se concentre sur les postures de base et la respiration pour développer force et souplesse."
      },
      {
        name: "Vinyasa Flow",
        description: "Un style dynamique qui synchronise le mouvement avec la respiration pour créer une séquence fluide et énergisante."
      },
      {
        name: "Yin Yoga",
        description: "Une pratique lente où les postures sont maintenues plus longtemps pour travailler les tissus conjonctifs et améliorer la souplesse."
      },
      {
        name: "Yoga restauratif",
        description: "Une pratique douce axée sur la relaxation profonde et la récupération, utilisant des accessoires pour soutenir le corps."
      }
    ],
    weekSample: [
      {
        day: "Lundi",
        focus: "Hatha Yoga - Force",
        duration: "45 minutes"
      },
      {
        day: "Mardi",
        focus: "Repos ou pratique légère",
        duration: "15-20 minutes"
      },
      {
        day: "Mercredi",
        focus: "Vinyasa Flow",
        duration: "60 minutes"
      },
      {
        day: "Jeudi",
        focus: "Yin Yoga - Flexibilité",
        duration: "45 minutes"
      },
      {
        day: "Vendredi",
        focus: "Repos complet",
        duration: "-"
      },
      {
        day: "Samedi",
        focus: "Vinyasa dynamique",
        duration: "60 minutes"
      },
      {
        day: "Dimanche",
        focus: "Yoga restauratif",
        duration: "30 minutes"
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
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Bienfaits du yoga</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-1">
                <li>Réduit le stress et l'anxiété</li>
                <li>Améliore la qualité du sommeil</li>
                <li>Augmente la flexibilité et la mobilité</li>
                <li>Renforce les muscles et améliore la posture</li>
                <li>Favorise la pleine conscience et la clarté mentale</li>
                <li>Peut soulager les douleurs chroniques</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">Styles de yoga pratiqués</h3>
            <div className="space-y-4 mb-10">
              {programDetails.styles.map((style, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-5">
                  <h4 className="text-xl font-semibold text-orange-500 mb-2">{style.name}</h4>
                  <p className="text-gray-300">{style.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">Exemple de semaine</h3>
            <div className="space-y-4 mb-8">
              {programDetails.weekSample.map((day, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-5 flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">{day.day}</h4>
                    <p className="text-gray-300">{day.focus}</p>
                  </div>
                  <div className="text-orange-500 font-medium">{day.duration}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Équipement recommandé</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Tapis de yoga antidérapant</li>
                <li>2 blocs de yoga</li>
                <li>Sangle de yoga (en option)</li>
                <li>Couverture ou serviette</li>
                <li>Vêtements confortables</li>
              </ul>
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
                <Heart size={20} className="text-orange-500 mr-3" />
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

            <div className="bg-gray-800 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Comment se préparer</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Pratiquez de préférence à jeun ou 2-3 heures après un repas
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Hydratez-vous avant et après la pratique
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Portez des vêtements confortables et non restrictifs
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Créez un espace calme et sans distraction
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <SectionTitle>Témoignages</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"Ce programme m'a permis de découvrir différents styles de yoga et d'intégrer la pratique à mon quotidien. Ma flexibilité s'est nettement améliorée et je me sens beaucoup plus détendu."</p>
              <p className="font-semibold text-orange-500">Lucie R.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"En tant que débutant, j'étais inquiet, mais les instructions sont claires et les alternatives proposées permettent d'adapter les postures à mon niveau. Je sens déjà les bienfaits !"</p>
              <p className="font-semibold text-orange-500">Antoine M.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-gray-300 italic mb-4">"Ce programme a transformé ma vision du yoga. Au-delà de l'aspect physique, j'ai appris à gérer mon stress et à être plus présent. Une vraie révélation."</p>
              <p className="font-semibold text-orange-500">Sarah B.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YogaProgram;
