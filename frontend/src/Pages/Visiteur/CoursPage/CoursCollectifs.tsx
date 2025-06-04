import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import {
  Dumbbell,
  Timer,
  StretchHorizontal,
  Heart,
  Flower,
  Activity,
  Weight,
  Bed,
} from "lucide-react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer/Footer";

const CoursCollectifs = () => {
  const courses = [
    {
      title: "Boxe Fit",
      description:
        "Un entraînement dynamique qui combine les mouvements de boxe avec du cardio pour une séance explosive qui sculpte le corps et libère le stress.",
      icon: Dumbbell,
      image:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&h=300&fit=crop",
    },
    {
      title: "HIIT Express",
      description:
        "Un entraînement par intervalles de haute intensité efficace qui maximise la dépense calorique et améliore l'endurance en seulement 30 minutes.",
      icon: Timer,
      image:
        "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=400&h=300&fit=crop",
    },
    {
      title: "Stretching Relaxant",
      description:
        "Une séance dédiée à l'étirement des muscles et à la détente du corps, idéale pour améliorer la souplesse et réduire les tensions.",
      icon: StretchHorizontal,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&h=300&fit=crop",
    },
    {
      title: "Renforcement Musculaire",
      description:
        "Un cours complet axé sur le renforcement des principaux groupes musculaires à l'aide de poids et d'exercices ciblés.",
      icon: Dumbbell,
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&h=300&fit=crop",
    },
    {
      title: "Zumba Énergique",
      description:
        "Un cours de danse fitness énergique qui mélange des rythmes latins et des mouvements faciles à suivre pour une séance cardio amusante.",
      icon: Heart,
      image:
        "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=400&h=300&fit=crop",
    },
    {
      title: "Pilates pour débutants",
      description:
        "Une introduction aux principes fondamentaux du Pilates, focalisée sur le renforcement du core et l'amélioration de la posture.",
      icon: Flower,
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400&h=300&fit=crop",
    },
    {
      title: "Cardio Intense",
      description:
        "Une séance cardiovasculaire complète qui combine différents exercices pour améliorer l'endurance et brûler un maximum de calories.",
      icon: Activity,
      image:
        "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=400&h=300&fit=crop",
    },
    {
      title: "Musculation Avancée",
      description:
        "Un programme intensif de musculation pour les pratiquants expérimentés, focalisé sur la progression et les techniques avancées.",
      icon: Weight,
      image:
        "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=400&h=300&fit=crop",
    },
    {
      title: "Yoga Débutant",
      description:
        "Une introduction douce au yoga, mettant l'accent sur les postures de base, la respiration et la relaxation.",
      icon: Bed,
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&h=300&fit=crop",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-[#231f20] min-h-screen text-white overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative w-full h-[90vh] overflow-hidden">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89e6f2b796a8e52b18a3cc61bec1fbb29f16df85"
            alt="Cours collectifs"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center">
            <div className="text-center max-w-2xl px-6">
              <h1 className="text-4xl font-bold mb-4 text-white">
                Découvrez nos cours collectifs
              </h1>
              <p className="text-gray-300 text-lg">
                Une sélection variée de cours dynamiques, relaxants ou
                intensifs, encadrés par des coachs professionnels.
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="w-full h-48 relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <course.icon className="w-6 h-6 text-[#ea7e38]" />
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{course.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CoursCollectifs;
