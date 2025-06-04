import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-[#ea7e38] to-blue-500 bg-clip-text text-transparent">Choisissez votre profil</h1>
        <p className="text-xl text-white/70">Connectez-vous avec le profil approprié</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
        <div 
          onClick={() => navigate("/login")}
          className="flex-1 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group hover:scale-105"
        >
          <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <div className="p-8 flex flex-col items-center">
            <div className="p-4 rounded-full bg-blue-100 mb-6 group-hover:bg-blue-200 transition-colors">
              <User size={48} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Adhérent</h2>
            <p className="text-gray-600 text-center mb-6">Connectez-vous en tant qu'adhérent</p>
            <button className="py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold hover:opacity-90 transition-opacity">
              Accéder
            </button>
          </div>
        </div>
        
        <div 
          onClick={() => navigate("/admin/login")}
          className="flex-1 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group hover:scale-105"
        >
          <div className="h-2 bg-gradient-to-r from-[#ea7e38] to-[#ea7e38]/80"></div>
          <div className="p-8 flex flex-col items-center">
            <div className="p-4 rounded-full bg-[#ea7e38]/20 mb-6 group-hover:bg-[#ea7e38]/30 transition-colors">
              <Lock size={48} className="text-[#ea7e38]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Administrateur</h2>
            <p className="text-gray-600 text-center mb-6">Connectez-vous avec des privilèges d'administrateur</p>
            <button className="py-3 px-6 rounded-full bg-gradient-to-r from-[#ea7e38] to-[#ea7e38]/80 text-white font-semibold hover:opacity-90 transition-opacity">
              Accéder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;