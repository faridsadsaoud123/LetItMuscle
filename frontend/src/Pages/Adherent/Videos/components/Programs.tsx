import React from "react";
import HeroSlider from "./HeroSlider";
import SectionTitle from "./SectionTitle";
import ProgramCard from "./ProgramCard";
import { Footer } from "react-day-picker";
import AdNavbar from "../../AdNavbar";


export const Programs: React.FC = () => {
  const trainingPrograms = [
    {
      id: 1,
      title: "Programme Musculation",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Programme Remise en Forme",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Programme Découverte",
      image:
        "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Programme Yoga",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="bg-black">
      <AdNavbar />
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <main className="flex-grow pt-10">
          <section>
            <HeroSlider />
          </section>

          <section className="py-16 bg-black">
            <div className="container mx-auto px-6">
              <SectionTitle>
                Découvrez nos programmes d'entraînement
              </SectionTitle>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trainingPrograms.map((program) => (
                  <ProgramCard
                    key={program.id}
                    id={program.id}
                    title={program.title}
                    image={program.image}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Programs;
