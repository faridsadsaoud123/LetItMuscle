import React from "react";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card"
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Standard",
    price: "30",
    featured: true,
    features: [
      "Accès illimité à la salle",
      "Vestiaires et douches",
      "Programmes d'entraînement de base",
      "Support par email",
      "Accès aux cours collectifs",
    ],
  },
  {
    name: "Premium",
    price: "50",
    featured: false,
    features: [
      "Tout du plan Standard",
      "Coaching personnalisé",
      "Suivi nutritionnel",
      "Accès prioritaire aux cours",
      "Analyses corporelles mensuelles",
      "Support 24/7",
    ],
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Nos <span className="gradient-text">Abonnements</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto">
            Découvrez nos formules d'abonnement conçues pour répondre à tous les
            besoins et tous les budgets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Description */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Choisis ton plan</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Que vous soyez débutant ou confirmé, que vous recherchiez un suivi
              personnalisé ou une pratique en autonomie, nous avons l'abonnement
              idéal pour vous.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Check className="h-4 w-4 text-primary mr-2" />
                Aucun engagement
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Check className="h-4 w-4 text-primary mr-2" />
                Résiliation à tout moment
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Check className="h-4 w-4 text-primary mr-2" />
                Première séance offerte
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`card-hover relative ${
                plan.featured
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Populaire
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}€
                  </span>
                  <span className="text-gray-400">/mois</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start text-sm"
                    >
                      <Check className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.featured
                      ? "btn-hero"
                      : "bg-secondary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Choisir l'abonnement {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Tous les prix sont TTC. Séance d'essai gratuite pour les nouveaux membres.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;