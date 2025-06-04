import React, { useState } from "react";
import ComplexNavbar from "../Components/NavbarAdmin";
import SidebarAdmin from "../Components/SideBarAdmin";
import { AjouterAbonnementModal } from "./Components/AjouterAbonnementModal";
import ListeAbonnements from "./Components/ListeAbonnements";
import { ModifierAbonnementModal } from "./Components/ModifierAbonnementModal";
import { AbonnementDto } from "./hooks/useGetAbonnements";
import { useGetAbonnements } from "./hooks/useGetAbonnements";
import { FaTicketAlt } from "react-icons/fa";

const AjouterAbonnement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [abonnementToEdit, setAbonnementToEdit] =
    useState<AbonnementDto | null>(null);

  const { refetch } = useGetAbonnements();

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <ComplexNavbar />
      </div>

      <div className="fixed top-20 left-0 w-80 h-[calc(100vh-80px)] z-40">
        <SidebarAdmin />
      </div>

      <div className="ml-80 mt-20 p-6">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800 mb-6 mt-6 border-b-4 border-orange-500 pb-2 shadow-sm uppercase tracking-wide">
          <FaTicketAlt className="text-orange-500 text-4xl" />
          Gestion des Abonnements
        </h1>
        <ListeAbonnements
          onCreateClick={() => setIsModalOpen(true)}
          onEditClick={(abonnement) => {
            setAbonnementToEdit(abonnement);
            setIsEditModalOpen(true);
          }}
          onRefresh={() => refetch()}
        />

        {isModalOpen && (
          <AjouterAbonnementModal
            onClose={() => setIsModalOpen(false)}
            onRefresh={() => refetch()}
          />
        )}

        {isEditModalOpen && abonnementToEdit && (
          <ModifierAbonnementModal
            abonnement={abonnementToEdit}
            onClose={() => setIsEditModalOpen(false)}
            onSave={() => {
              refetch();
              setIsEditModalOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default AjouterAbonnement;
