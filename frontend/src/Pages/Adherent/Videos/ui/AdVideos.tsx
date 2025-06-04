import React from "react";
import HeroSlider from "../../../../components/ui/HeroSlider";
import SectionTitle from "../../../../components/ui/SectionTitle";
import ProgramCard from "../../../../components/ui/ProgramCard";
import remiseEnForm from "../../../../assets/remiseEnForm.jpg";
import AdNavbar from "../../AdNavbar"; 
import Footer from "../../../../components/Footer/Footer";

export const AdVideos: React.FC = () => {
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
      image: remiseEnForm,
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
    <div className=" bg-black">
      <AdNavbar />
      <div className="mt-[2vh] min-h-screen bg-gray-900 flex flex-col">
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
