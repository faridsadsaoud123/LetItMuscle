import React, { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{children}</h2>
      <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
    </div>
  );
};

export default SectionTitle;