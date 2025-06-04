import React from "react";
import { Link } from "react-router-dom";

interface ProgramCardProps {
  id?: number;
  title: string;
  image: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ id = 1, title, image }) => {
  return (
    <Link
      to={`/programme/${id}`}
      className="block transition duration-300 hover:opacity-90"
    >
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-60">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;
