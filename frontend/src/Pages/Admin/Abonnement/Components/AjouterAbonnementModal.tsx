import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { OPTIONS_POSSIBLES } from "./abonnementOptions";
import { useCreateAbonnement } from "../hooks/useCreateAbonnement";
import { z, ZodFormattedError } from "zod";

const abonnementSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  tarif: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "Le tarif est requis",
        invalid_type_error: "Le tarif doit être un nombre",
      })
      .positive("Le tarif doit être supérieur à 0")
  ),
  duree: z.string().min(1, "La durée est requise"),
  options: z.array(z.string()).optional(),
});

type AbonnementFormData = {
  nom: string;
  tarif: string;
  duree: string;
  options: string[];
  statusAbonnement: string;
  nbrAdherent: number;
};

export const AjouterAbonnementModal: React.FC<{
  onClose: () => void;
  onRefresh: () => void;
}> = ({ onClose, onRefresh }) => {
  const [form, setForm] = useState<AbonnementFormData>({
    nom: "",
    tarif: "",
    duree: "",
    options: [],
    statusAbonnement: "Actif",
    nbrAdherent: 0,
  });

  const [errors, setErrors] =
    useState<ZodFormattedError<AbonnementFormData> | null>(null);
  const createMutation = useCreateAbonnement();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleOption = (option: string) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter((o) => o !== option)
        : [...prev.options, option],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = abonnementSchema.safeParse(form);
    if (!validation.success) {
      setErrors(validation.error.format());
    } else {
      setErrors(null);

      const payload = {
        nomAbonnement: form.nom,
        tarif: Number(form.tarif),
        duree: form.duree,
        nbrAdherent: 0,
        statusAbonnement: form.statusAbonnement,
        createurId: 1,
        optionsAbonnement: form.options.join(", ").trim(),
      };

      createMutation.mutate(payload, {
        onSuccess: () => {
          alert("✅ Abonnement créé avec succès !");
          onRefresh();
          onClose();
        },
        onError: (err: any) => {
          alert("❌ Erreur lors de la création : " + err.message);
        },
      });
    }
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
          AJOUTER UN ABONNEMENT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-bold">Nom de l’abonnement</label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 mt-1 text-black"
              placeholder="Ex: Abonnement Premium"
            />
            {errors?.nom && (
              <p className="text-red-500 text-sm">{errors.nom._errors[0]}</p>
            )}
          </div>

          <div>
            <label className="font-bold">Tarif (€)</label>
            <input
              name="tarif"
              type="number"
              value={form.tarif}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 mt-1 text-black"
              placeholder="Ex: 49.99"
            />
            {errors?.tarif && (
              <p className="text-red-500 text-sm">{errors.tarif._errors[0]}</p>
            )}
          </div>

          <div>
            <label className="font-bold">Durée</label>
            <input
              name="duree"
              value={form.duree}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 mt-1 text-black"
              placeholder="Ex: 1 mois"
            />
            {errors?.duree && (
              <p className="text-red-500 text-sm">{errors.duree._errors[0]}</p>
            )}
          </div>

          <div>
            <label className="font-bold block mb-2">Options incluses</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OPTIONS_POSSIBLES.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.options.includes(option)}
                    onChange={() => toggleOption(option)}
                    className="accent-orange-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1">Statut</label>
            <select
              name="statusAbonnement"
              value={form.statusAbonnement}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-black"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-black font-bold"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjouterAbonnementModal;
