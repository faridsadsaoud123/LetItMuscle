import React from "react";

interface ProgramCardProps {
  title: string;
  image: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, image }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 group h-64">
      <div className="relative h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <h3 className="text-white text-xl font-bold p-6 w-full">{title}</h3>
        </div>
      </div>
    </div>
  );
};
export default ProgramCard;
