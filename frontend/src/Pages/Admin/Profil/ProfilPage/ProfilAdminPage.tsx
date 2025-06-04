import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useHomeProvider } from "../../Home/hooks/useHomeProvider";

import ComplexNavbar from "../../Components/NavbarAdmin";
import SidebarAdmin from "../../Components/SideBarAdmin";
import AdNavbar from "../../../Adherent/AdNavbar";

import ProfilAdmin from "../components/ProfilAdmin";

const ProfilAdminPage: React.FC = () => {
  const { data: user, isLoading } = useHomeProvider();

  if (isLoading || !user) return <p>Chargement...</p>;

  const isAdmin = user.role === "Admin";

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        {isAdmin ? <ComplexNavbar /> : <AdNavbar />}
      </div>

      <div className="fixed top-20 left-0 w-80 h-[calc(100vh-80px)] z-40">
        {isAdmin ? <SidebarAdmin /> : null}
      </div>

      <div className="ml-80 mt-20 p-6">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800 mb-6 mt-6 border-b-4 border-orange-500 pb-2 shadow-sm uppercase tracking-wide">
          <FaUserCircle className="text-orange-500 text-4xl" />
          Mon Profil
        </h1>

        <ProfilAdmin isAdmin={isAdmin} />
      </div>
    </>
  );
};

export default ProfilAdminPage;
