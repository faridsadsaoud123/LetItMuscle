import React, { useState } from "react";
import AbonnementSelector from "../../../Visiteur/Register/components/AbonnementSelector";
import { Button } from "../../../../components/ui/Button";
import { useUpdateUtilisateur } from "../../Utilisateurs/hooks/useUpdateUtilisateur";
import { useHomeProvider } from "../../Home/hooks/useHomeProvider";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangerAbonnementModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data: user } = useHomeProvider();
  const [selectedId, setSelectedId] = useState<number | null>(user?.abonnementInscritId || null);
  const updateMutation = useUpdateUtilisateur();

  const handleSave = () => {
    if (!user || selectedId === null) return;

    updateMutation.mutate(
      {
        id: user.id,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        login: user.login,
        numTel: user.numTel,
        dateDeNaissance: user.dateDeNaissance,
        abonnementInscritId: selectedId !== null ? selectedId.toString() : null
      },
      {
        onSuccess: () => {
          alert("✅ Abonnement mis à jour !");
          onClose();
        },
        onError: () => alert("❌ Erreur lors de la mise à jour."),
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full shadow-xl">
        <h2 className="text-xl font-bold text-center mb-4">Choisir un nouvel abonnement</h2>
        <AbonnementSelector selectedId={selectedId} onSelect={setSelectedId} />
        <div className="flex justify-end mt-6 gap-4">
          <Button variant="ghost" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </div>
      </div>
    </div>
  );
};

export default ChangerAbonnementModal;
