import React from "react";
import { useParams } from "react-router-dom";
import MuscleProgram from "./MuscleProgram";
import FitnessProgram from "./FitnessProgram";
import DiscoveryProgram from "./DiscoveryProgram";
import YogaProgram from "./YogaProgram";
import { Footer } from "react-day-picker";
import AdNavbar from "../../AdNavbar";

const ProgramLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const programId = Number(id);

  const renderProgram = () => {
    switch (programId) {
      case 1:
        return <MuscleProgram />;
      case 2:
        return <FitnessProgram />;
      case 3:
        return <DiscoveryProgram />;
      case 4:
        return <YogaProgram />;
      default:
        return (
          <div className="text-center text-white py-20">
            Programme introuvable
          </div>
        );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <AdNavbar />
      <main className="flex-grow">{renderProgram()}</main>
      <Footer />
    </div>
  );
};

export default ProgramLayout;
