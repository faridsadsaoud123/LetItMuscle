import React from "react";
import { Card, CardContent } from "../../../components/ui/Card";
import equipmentIcon from "../../../assets/equipment-icon.png";
import coachingIcon from "../../../assets/coaching-icon.png";
import classesIcon from "../../../assets/classes-icon.png";

const features = [
  {
    icon: equipmentIcon,
    title: "Des équipements modernes et de qualité",
    description:
      "Profitez d'un environnement moderne et agréable, avec des équipements de pointe conçus pour optimiser vos performances et votre confort.",
  },
  {
    icon: coachingIcon,
    title: "Un suivi personnalisé pour atteindre vos objectifs",
    description:
      "Perdre du poids, gagner en tonus musculaire, améliorer votre endurance, ou simplement vous détendre.",
  },
  {
    icon: classesIcon,
    title: "Des cours variés pour tous les niveaux",
    description:
      "Yoga, fitness, musculation, danse, et bien plus encore. Chaque activité est adaptée à tous les niveaux, des débutants aux sportifs confirmés.",
  },
];

const WhyUsSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Pourquoi choisir <span className="gradient-text">Let It Muscle</span>?
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto">
            Découvrez ce qui nous rend uniques et pourquoi des centaines de personnes nous font confiance pour leur transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-hover bg-card border-border group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 p-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-12 h-12 object-contain filter brightness-0 saturate-100 invert"
                    style={{
                      filter: "brightness(0) saturate(100%) invert(60%) sepia(99%) saturate(1280%) hue-rotate(8deg) brightness(97%) contrast(91%)"
                    }}
                  />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à transformer votre vie ?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Rejoignez notre communauté et commencez votre parcours vers une meilleure version de vous-même.
            </p>
            <button className="btn-hero">
              Réserver votre séance d'essai gratuite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyUsSection;

