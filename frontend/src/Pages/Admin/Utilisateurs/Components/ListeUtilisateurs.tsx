import React, { useState } from "react";
import { FaSearch, FaFilter, FaUserPlus } from "react-icons/fa";
import { Trash2, Pencil } from "lucide-react";
import {
  useGetUtilisateurs,
  UtilisateurDto,
} from "../hooks/useGetUtilisateurs";
import SideFilterPanel from "./SideFilterPanel";
import AjouterUtilisateurModal from "./AjouterUtilisateurModal";
import { useDeleteUtilisateur } from "../hooks/useDeleteUtilisateur";
import ModifierUtilisateurModal from "./ModifierUtilisateurModal";

const ListeUtilisateurs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [rolesFiltre, setRolesFiltre] = useState<string[]>([]);
  const [abonnementsFiltre, setAbonnementsFiltre] = useState<string[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const [utilisateurAModifier, setUtilisateurAModifier] =
    useState<UtilisateurDto | null>(null);

  const {
    data: utilisateurs = [],
    isLoading,
    isError,
    refetch,
  } = useGetUtilisateurs();
  const [showAddModal, setShowAddModal] = useState(false);

  const deleteMutation = useDeleteUtilisateur();

  const handleDelete = (id: number) => {
    if (window.confirm("Es-tu sûr de vouloir supprimer cet utilisateur ?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          alert("✅ Utilisateur supprimé !");
          refetch();
        },
        onError: (error: any) => {
          if (error.response?.status === 409) {
            alert(
              "❌ Cet utilisateur ne peut pas être supprimé car il est lié à d'autres données (ex: cours, messages, etc)."
            );
          } else {
            alert("❌ Erreur lors de la suppression.");
            console.error(error);
          }
        },
      });
    }
  };

  const utilisateursFiltres = utilisateurs.filter((u) => {
    const matchNom = `${u.nom} ${u.prenom}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchRole = rolesFiltre.length === 0 || rolesFiltre.includes(u.role);
    const matchAbonnement =
      abonnementsFiltre.length === 0 ||
      abonnementsFiltre.includes(u.abonnementInscrit ?? "");
    return matchNom && matchRole && matchAbonnement;
  });

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur de chargement ❌</p>;

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-xl w-full max-w-[400px]">
          <FaSearch className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-gray-800 w-full"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl flex items-center gap-2 shadow-md transition"
        >
          <FaUserPlus />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFilterPanel(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition flex items-center gap-2"
        >
          <FaFilter />
          Filtres
        </button>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Prénom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Téléphone</th>
            <th className="px-4 py-2">Date de naissance</th>
            <th className="px-4 py-2">Rôle</th>
            <th className="px-4 py-2">Abonnement</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateursFiltres.map((u, i) => (
            <tr key={u.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="px-4 py-2">{u.nom}</td>
              <td className="px-4 py-2">{u.prenom}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">0{u.numTel}</td>
              <td className="px-4 py-2">
                {new Date(u.dateDeNaissance).toLocaleDateString("fr-FR")}
              </td>
              <td className="px-4 py-2">
                {u.role === "AdherentStandard" ? "Adhérent" : u.role}
              </td>
              <td className="px-4 py-2">{u.abonnementInscrit || "Aucun"}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="text-green-500 hover:text-green-600"
                  onClick={() => setUtilisateurAModifier(u)}
                >
                  <Pencil size={18} />
                </button>

                {u.email !== "admin@letitmuscle.com" ? (
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(u.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                ) : (
                  <span
                    className="text-gray-400 cursor-not-allowed"
                    title="Impossible de supprimer cet utilisateur"
                  >
                    <Trash2 size={18} />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showFilterPanel && (
        <SideFilterPanel
          onClose={() => setShowFilterPanel(false)}
          onApply={(roles, abonnements) => {
            setRolesFiltre(roles);
            setAbonnementsFiltre(abonnements);
          }}
          utilisateurs={utilisateurs}
        />
      )}

      {showAddModal && (
        <AjouterUtilisateurModal
          onClose={() => setShowAddModal(false)}
          onRefresh={refetch}
        />
      )}

      {utilisateurAModifier && (
        <ModifierUtilisateurModal
          utilisateur={utilisateurAModifier}
          onClose={() => setUtilisateurAModifier(null)}
          onRefresh={refetch}
        />
      )}
    </div>
  );
};

export default ListeUtilisateurs;
