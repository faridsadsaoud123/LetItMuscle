import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { AbonnementDto } from "../hooks/useGetAbonnements";
import { useUpdateAbonnement } from "../hooks/useUpdateAbonnement";
import { OPTIONS_POSSIBLES } from "./abonnementOptions"; // Assure-toi qu'il existe

interface ModifierAbonnementModalProps {
  abonnement: AbonnementDto;
  onClose: () => void;
  onSave: () => void;
}

export const ModifierAbonnementModal: React.FC<
  ModifierAbonnementModalProps
> = ({ abonnement, onClose, onSave }) => {
  const [editMode, setEditMode] = useState({
    nom: false,
    tarif: false,
    duree: false,
    statusAbonnement: false,
  });

  const [form, setForm] = useState({
    ...abonnement,
    optionsAbonnement: abonnement.optionsAbonnement
      ? abonnement.optionsAbonnement.split(",").map((opt) => opt.trim())
      : [],
  });

  const updateMutation = useUpdateAbonnement();

  const toggleOption = (option: string) => {
    setForm((prev) => ({
      ...prev,
      optionsAbonnement: prev.optionsAbonnement.includes(option)
        ? prev.optionsAbonnement.filter((o) => o !== option)
        : [...prev.optionsAbonnement, option],
    }));
  };

  const toggleEdit = (field: keyof typeof editMode) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate(
      {
        id: form.id,
        nomAbonnement: form.nomAbonnement,
        tarif: form.tarif,
        duree: form.duree,
        nbrAdherent: form.nbrAdherent,
        statusAbonnement: form.statusAbonnement,
        optionsAbonnement: form.optionsAbonnement.join(", ").trim(),
      },
      {
        onSuccess: () => {
          alert("✅ Abonnement modifié avec succès !");
          onSave();
        },
        onError: () => {
          alert("❌ Erreur lors de la modification.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 text-2xl"
        >
          <IoMdClose />
        </button>

        <h2 className="text-2xl font-bold mb-4 border-b-2 border-orange-500 pb-2">
          MODIFIER L’ABONNEMENT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2">
            <label className="font-bold">Nom de l’abonnement</label>
            {editMode.nom ? (
              <input
                value={form.nomAbonnement}
                onChange={(e) =>
                  setForm({ ...form, nomAbonnement: e.target.value })
                }
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <span>{form.nomAbonnement}</span>
            )}
            <button
              onClick={() => toggleEdit("nom")}
              type="button"
              className="text-blue-600"
            >
              <FaEdit />
            </button>
          </div>

          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2">
            <label className="font-bold">Tarif (€)</label>
            {editMode.tarif ? (
              <input
                type="number"
                value={form.tarif}
                onChange={(e) =>
                  setForm({ ...form, tarif: parseFloat(e.target.value) })
                }
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <span>{form.tarif}</span>
            )}
            <button
              onClick={() => toggleEdit("tarif")}
              type="button"
              className="text-blue-600"
            >
              <FaEdit />
            </button>
          </div>

          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-2">
            <label className="font-bold">Durée</label>
            {editMode.duree ? (
              <input
                value={form.duree}
                onChange={(e) => setForm({ ...form, duree: e.target.value })}
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <span>{form.duree}</span>
            )}
            <button
              onClick={() => toggleEdit("duree")}
              type="button"
              className="text-blue-600"
            >
              <FaEdit />
            </button>
          </div>

          <div>
            <label className="font-bold block mb-2">Options incluses</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OPTIONS_POSSIBLES.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.optionsAbonnement.includes(option)}
                    onChange={() => toggleOption(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[auto,1fr] items-center gap-2">
            <label className="font-bold">Statut</label>
            <select
              value={form.statusAbonnement}
              onChange={(e) =>
                setForm({ ...form, statusAbonnement: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-black font-bold"
            >
              Retour
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
