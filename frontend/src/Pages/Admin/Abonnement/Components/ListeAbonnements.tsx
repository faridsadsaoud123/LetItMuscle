import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Pencil, Trash2 } from "lucide-react";
import { useGetAbonnements, AbonnementDto } from "../hooks/useGetAbonnements";
import { useDeleteAbonnement } from "../hooks/useDeleteAbonnement";

interface ListeAbonnementsProps {
  onCreateClick: () => void;
  onEditClick: (abonnement: AbonnementDto) => void;
  onRefresh: () => void;
}

const ListeAbonnements: React.FC<ListeAbonnementsProps> = ({
  onCreateClick,
  onEditClick,
  onRefresh,
}) => {
  const [search, setSearch] = useState("");
  const { data: abonnements = [], isLoading, isError } = useGetAbonnements();
  const deleteMutation = useDeleteAbonnement();

  if (isLoading)
    return <p className="text-center mt-10 text-lg">Chargement en cours...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Erreur lors du chargement des abonnements.
      </p>
    );

  const abonnementsFiltres = abonnements.filter((abo) =>
    abo.nomAbonnement.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "❗ Es-tu sûr(e) de vouloir supprimer cet abonnement ?"
    );
    if (confirmed) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          alert("✅ Abonnement supprimé !");
          onRefresh();
        },
        onError: () => {
          alert("❌ Une erreur est survenue lors de la suppression.");
        },
      });
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center bg-[#D7D2CF] px-4 py-2 rounded-xl w-full md:w-[400px]">
          <FaSearch className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Rechercher ici...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-gray-800 w-full"
          />
        </div>
        <button
          onClick={onCreateClick}
          className="bg-[#3366CC] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <FaPlus /> Créer un abonnement
        </button>
      </div>

      <table className="w-full text-black">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-2 text-left">Nom de l’abonnement</th>
            <th className="px-4 py-2 text-left">Tarif</th>
            <th className="px-4 py-2 text-left">Durée</th>
            <th className="px-4 py-2 text-left">Nbr d’adhérents</th>
            <th className="px-4 py-2 text-left">Statut</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {abonnementsFiltres.map((abo, index) => (
            <tr
              key={abo.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="px-4 py-2">{abo.nomAbonnement}</td>
              <td className="px-4 py-2">{abo.tarif} €</td>
              <td className="px-4 py-2">{abo.duree}</td>
              <td className="px-4 py-2">{abo.nbrAdherent}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${
                    abo.statusAbonnement === "Actif"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => onEditClick(abo)}
                  className="text-green-500 hover:text-green-600"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(abo.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-black flex gap-4">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            Actif
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            Inactif
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeAbonnements;
