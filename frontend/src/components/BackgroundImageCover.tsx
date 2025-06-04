import React from "react";

interface BackgroundImageProps {
  imagePath: string;
  children?: React.ReactNode;
}

const BackgroundImageCover: React.FC<BackgroundImageProps> = ({ imagePath, children }) => {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${imagePath})`,
      }}
    >
      <div className="absolute inset-0 gradient-overlay" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen py-16 px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImageCover;