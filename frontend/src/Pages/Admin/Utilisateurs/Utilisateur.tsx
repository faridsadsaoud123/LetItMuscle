import React from "react";
import ComplexNavbar from "../Components/NavbarAdmin";
import SidebarAdmin from "../Components/SideBarAdmin";
import ListeUtilisateurs from "./Components/ListeUtilisateurs";
import { FaUsers } from "react-icons/fa";


const Utilisateur: React.FC = () => {
  const user = {
    role: "Admin",
    firstName: "Jean",
    lastName: "Canella",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    hasNotification: true,
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <ComplexNavbar user={user} />
      </div>

      <div className="fixed top-20 left-0 w-80 h-[calc(100vh-80px)] z-40">
        <SidebarAdmin />
      </div>

      <div className="ml-80 mt-20 p-6">
      <h1 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800 mb-6 mt-6 border-b-4 border-orange-500 pb-2 shadow-sm uppercase tracking-wide">
        <FaUsers className="text-orange-500 text-4xl" />
        Gestion des utilisateurs
        </h1>


        <ListeUtilisateurs />
      </div>
    </>
  );
};

export default Utilisateur;
