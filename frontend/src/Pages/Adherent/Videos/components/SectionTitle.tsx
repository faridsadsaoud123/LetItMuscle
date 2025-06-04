import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block pb-3">
        {children}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-orange-500"></span>
      </h2>
    </div>
  );
};

export default SectionTitle;
