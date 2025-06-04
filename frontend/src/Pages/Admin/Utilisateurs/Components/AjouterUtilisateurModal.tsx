import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useCreateUtilisateur } from "../hooks/useCreateUtilisateur";
import { useGetUtilisateurs } from "../hooks/useGetUtilisateurs";
import { useGetAbonnements } from "../../Abonnement/hooks/useGetAbonnements";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const utilisateurSchema = z
  .object({
    nom: z
      .string()
      .nonempty("Le nom est requis")
      .regex(
        /^[A-Za-zÀ-ÿ\s]+$/,
        "Le nom doit contenir uniquement des lettres."
      ),

    prenom: z
      .string()
      .nonempty("Le prénom est requis")
      .regex(
        /^[A-Za-zÀ-ÿ\s]+$/,
        "Le prénom doit contenir uniquement des lettres."
      ),

    email: z.string().nonempty("L'email est requis").email("Email invalide."),

    login: z
      .string()
      .nonempty("Le login est requis")
      .refine((val) => !/\s/.test(val), {
        message: "Le login ne doit pas contenir d'espaces.",
      }),

    password: z
      .string()
      .nonempty("Mot de passe requis")
      .refine(
        (val) =>
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}/.test(val),
        {
          message:
            "Mot de passe faible (majuscule, minuscule, chiffre, caractère spécial requis).",
        }
      ),

    numTel: z
      .string()
      .nonempty("Le téléphone est requis")
      .regex(/^\d+$/, "Le téléphone doit contenir uniquement des chiffres."),

    dateDeNaissance: z.string().nonempty("Date de naissance requise"),

    role: z.enum([
      "Admin",
      "Coach",
      "AdherentStandard",
      "AdherentCoachingEnLigne",
    ]),

    abonnementId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.role === "AdherentStandard" ||
        data.role === "AdherentCoachingEnLigne") &&
      (!data.abonnementId || data.abonnementId.trim() === "")
    ) {
      ctx.addIssue({
        path: ["abonnementId"],
        code: z.ZodIssueCode.custom,
        message: "L’abonnement est requis pour un adhérent.",
      });
    }
  });

interface Props {
  onClose: () => void;
  onRefresh: () => void;
}

const AjouterUtilisateurModal: React.FC<Props> = ({ onClose, onRefresh }) => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    login: "",
    password: "",
    numTel: "",
    dateDeNaissance: "",
    role: "AdherentStandard",
    abonnementId: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { data: utilisateurs = [] } = useGetUtilisateurs();
  const { data: abonnements = [] } = useGetAbonnements();
  const createMutation = useCreateUtilisateur();

  const validateForm = () => {
    const parsed = utilisateurSchema.safeParse(form);

    const zodErrors: { [key: string]: string } = {};
    if (!parsed.success) {
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          zodErrors[err.path[0]] = err.message;
        }
      });
      setErrors(zodErrors);
      return false;
    }

    if (
      utilisateurs.some((u) => u.email === form.email && u.role === form.role)
    ) {
      setErrors((prev) => ({
        ...prev,
        email: "Cette adresse email est déjà utilisée pour ce rôle",
      }));
      return false;
    }

    if (
      (form.role === "AdherentStandard" ||
        form.role === "AdherentCoachingEnLigne") &&
      !form.abonnementId
    ) {
      setErrors((prev) => ({
        ...prev,
        abonnementId: "L’abonnement est requis pour un adhérent",
      }));
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

  const { abonnementId, ...rest } = form;

const payload = {
  ...rest,
  numTel: Number(form.numTel),
  abonnementInscritId: abonnementId || null,
};
    console.log("Payload envoyé au backend :", payload);

    createMutation.mutate(payload, {
      onSuccess: () => {
        alert("✅ Utilisateur créé !");
        onClose();
        onRefresh();
      },
      onError: (err: any) => {
  console.error("Erreur détaillée backend :", err.response?.data);
  alert("Erreur : " + (err.response?.data?.title || "Vérifiez les données envoyées"));
} ,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-orange-500 pb-2">
          Ajouter un utilisateur
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col">
            <label className="font-medium">Nom</label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              placeholder="Nom"
              className="border p-2 rounded"
            />
            {errors.nom && (
              <span className="text-red-500 text-sm">{errors.nom}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Prénom</label>
            <input
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              placeholder="Prénom"
              className="border p-2 rounded"
            />
            {errors.prenom && (
              <span className="text-red-500 text-sm">{errors.prenom}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Login</label>
            <input
              name="login"
              value={form.login}
              onChange={handleChange}
              placeholder="Login"
              className="border p-2 rounded"
            />
            {errors.login && (
              <span className="text-red-500 text-sm">{errors.login}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="border p-2 rounded"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Téléphone</label>
            <input
              name="numTel"
              value={form.numTel}
              onChange={handleChange}
              placeholder="Téléphone"
              className="border p-2 rounded"
            />
            {errors.numTel && (
              <span className="text-red-500 text-sm">{errors.numTel}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Date de naissance</label>
            <input
              type="date"
              name="dateDeNaissance"
              value={form.dateDeNaissance}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            {errors.dateDeNaissance && (
              <span className="text-red-500 text-sm">
                {errors.dateDeNaissance}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Rôle</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="AdherentStandard">Adhérent</option>
              <option value="AdherentCoachingEnLigne">Adhérent Coaching</option>
              <option value="Coach">Coach</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {(form.role === "AdherentStandard" ||
            form.role === "AdherentCoachingEnLigne") && (
            <div className="flex flex-col">
              <label className="font-medium">Abonnement</label>
              <select
                name="abonnementId"
                value={form.abonnementId}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">-- Sélectionner --</option>
                {abonnements.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nomAbonnement}
                  </option>
                ))}
              </select>
              {errors.abonnementId && (
                <span className="text-red-500 text-sm">
                  {errors.abonnementId}
                </span>
              )}
            </div>
          )}

          <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Créer l’utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjouterUtilisateurModal;
