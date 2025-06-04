import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useGetAbonnements } from "../../Abonnement/hooks/useGetAbonnements";
import { UtilisateurDto } from "../hooks/useGetUtilisateurs";
import { useUpdateUtilisateur } from "../hooks/useUpdateUtilisateur";
import { z } from "zod";

interface Props {
  utilisateur: UtilisateurDto;
  onClose: () => void;
  onRefresh: () => void;
}

const ModifierUtilisateurModal: React.FC<Props> = ({ utilisateur, onClose, onRefresh }) => {
  const [form, setForm] = useState({
    id: utilisateur.id,
    nom: utilisateur.nom,
    prenom: utilisateur.prenom,
    email: utilisateur.email,
    numTel: utilisateur.numTel.toString(),
    dateDeNaissance: utilisateur.dateDeNaissance?.split("T")[0] || "",
    role: utilisateur.role,
    abonnementInscritId: utilisateur.abonnementInscritId?.toString() || ""
  });


const utilisateurUpdateSchema = z.object({
  id: z.number(),
  nom: z.string().min(1, "Le nom est requis.").regex(/^[A-Za-zÀ-ÿ\s]+$/, "Le nom doit contenir uniquement des lettres."),
  prenom: z.string().min(1, "Le prénom est requis.").regex(/^[A-Za-zÀ-ÿ\s]+$/, "Le prénom doit contenir uniquement des lettres."),
  email: z.string().email("Email invalide."),
  numTel: z.string().regex(/^\d+$/, "Le téléphone doit contenir uniquement des chiffres."),
  dateDeNaissance: z.string().min(1, "Date de naissance requise."),
  role: z.string(),
  abonnementInscritId: z.string().optional().nullable(),
});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { data: abonnements = [] } = useGetAbonnements();
  const updateMutation = useUpdateUtilisateur();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const parsed = utilisateurUpdateSchema.safeParse(form);
    const newErrors: { [key: string]: string } = {};
  
    if (!parsed.success) {
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }
  
    if ((form.role === "AdherentStandard" || form.role === "AdherentCoachingEnLigne") && !form.abonnementInscritId) {
      setErrors((prev) => ({
        ...prev,
        abonnementInscritId: "L’abonnement est requis pour ce rôle",
      }));
      return;
    }
  
    setErrors({});
    const payload = {
      ...form,
      numTel: Number(form.numTel),
      abonnementInscritId: form.abonnementInscritId || null,
    };
  
    updateMutation.mutate(payload, {
      onSuccess: () => {
        alert("✅ Utilisateur modifié !");
        onClose();
        onRefresh();
      },
      onError: () => {
        alert("❌ Erreur lors de la modification.");
      },
    });
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-orange-500 pb-2">
          MODIFIER L’UTILISATEUR
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-medium">Nom</label>
            <input name="nom" value={form.nom} onChange={handleChange} className="border p-2 rounded" />
            {errors.nom && <span className="text-red-500 text-sm">{errors.nom}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Prénom</label>
            <input name="prenom" value={form.prenom} onChange={handleChange} className="border p-2 rounded" />
            {errors.prenom && <span className="text-red-500 text-sm">{errors.prenom}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Téléphone</label>
            <input name="numTel" value={form.numTel} onChange={handleChange} className="border p-2 rounded" />
            {errors.numTel && <span className="text-red-500 text-sm">{errors.numTel}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Date de naissance</label>
            <input type="date" name="dateDeNaissance" value={form.dateDeNaissance} onChange={handleChange} className="border p-2 rounded" />
            {errors.dateDeNaissance && <span className="text-red-500 text-sm">{errors.dateDeNaissance}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Rôle</label>
            <select name="role" value={form.role} onChange={handleChange} className="border p-2 rounded">
              <option value="AdherentStandard">Adhérent</option>
              <option value="AdherentCoachingEnLigne">Adhérent Coaching</option>
              <option value="Coach">Coach</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {(form.role === "AdherentStandard" || form.role === "AdherentCoachingEnLigne") && (
            <div className="flex flex-col">
              <label className="font-medium">Abonnement</label>
              <select name="abonnementInscritId" value={form.abonnementInscritId} onChange={handleChange} className="border p-2 rounded">
                <option value="">-- Sélectionner --</option>
                {abonnements.map((a) => (
                  <option key={a.id} value={a.id}>{a.nomAbonnement}</option>
                ))}
              </select>
              {errors.abonnementInscritId && <span className="text-red-500 text-sm">{errors.abonnementInscritId}</span>}
            </div>
          )}

          <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
              Modifier l’utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifierUtilisateurModal;
