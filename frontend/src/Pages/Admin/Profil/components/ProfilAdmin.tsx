import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { useHomeProvider } from "../../Home/hooks/useHomeProvider";
import { useUpdateUtilisateur } from "../../Utilisateurs/hooks/useUpdateUtilisateur";
import ChangerMotDePasseModal from "./ChangerMotDePasseModal";
import ChangerAbonnementModal from "./ChangerAbonnementModal";
import { useGetAbonnements } from "../../Abonnement/hooks/useGetAbonnements";
import { useGetAbonnementById } from "../../Abonnement/hooks/useGetAbonnementById";
import { Pencil } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const profilSchema = z.object({
  nom: z
    .string()
    .nonempty("Nom requis")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Le nom ne doit contenir que des lettres"),
  prenom: z
    .string()
    .nonempty("Prénom requis")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Le prénom ne doit contenir que des lettres"),
  email: z.string().email("Email invalide"),
  login: z
    .string()
    .nonempty("Login requis")
    .refine((val) => !val.includes(" "), {
      message: "Le login ne doit pas contenir d'espaces",
    }),
  numTel: z.string().regex(/^\d+$/, "Numéro invalide"),
  dateDeNaissance: z.string().nonempty("Date requise"),
  abonnementInscritId: z.string().optional(),
});


interface ProfilAdminProps {
  isAdmin: boolean;
}
type ProfilForm = z.infer<typeof profilSchema>;

const ProfilAdmin: React.FC<ProfilAdminProps> = ({ isAdmin }) => {
  const { data: user,isLoading: isUserLoading } = useHomeProvider();
  console.log("👤 Utilisateur récupéré via useHomeProvider :", user);
  const updateMutation = useUpdateUtilisateur();
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const queryClient = useQueryClient();



  const {
    data: abonnementLie,
    isLoading: isAbonnementLieLoading,
  } = useGetAbonnementById(user?.abonnementInscritId ?? null);

  console.log("📨 useGetAbonnementById appelé avec ID :", user?.abonnementInscritId);
console.log("📥 Résultat de useGetAbonnementById :", abonnementLie);
  
  


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfilForm>({
    resolver: zodResolver(profilSchema),
  });

  useEffect(() => {
    console.log("🎯 useEffect déclenché avec user :", user);
    if (user) {
      setValue("nom", user.nom);
      setValue("prenom", user.prenom);
      setValue("email", user.email);
      setValue("login", user.login);
      setValue("numTel", user.numTel.toString());
      setValue("dateDeNaissance", user.dateDeNaissance.slice(0, 10));
  
      if (!isAdmin && user.abonnementInscritId) {
        console.log("📦 ID abonnement trouvé dans le user :", user.abonnementInscritId);
        setValue("abonnementInscritId", user.abonnementInscritId.toString());
        setSelectedAbonnement(user.abonnementInscritId);
      }
    }
  }, [user]);
  

  const { data: allAbonnements = [],isLoading: isAbonnementLoading } = useGetAbonnements();
const abonnements = allAbonnements.filter(a => a.statusAbonnement === "Actif");


  const [showAbonnementModal, setShowAbonnementModal] = useState(false);
  const [selectedAbonnement, setSelectedAbonnement] = useState<number | null>(null);



  const onSubmit = (data: ProfilForm) => {
    console.log("📤 Données du formulaire envoyées :", data);

    if (!user) return;

    updateMutation.mutate(
      {
        ...data,
        numTel: Number(data.numTel),
        id: user.id,
        role: user.role,
        abonnementInscritId: !isAdmin ? data.abonnementInscritId || null : null
      },
      {
        onSuccess: () => {
          setSuccessMessage("✅ Profil mis à jour avec succès !");
          setTimeout(() => setSuccessMessage(""), 3000);
        },
      }
    );
  };

  if (isUserLoading) return <p>Chargement...</p>;
  console.log("🔍 Nom de l'abonnement affiché dans l'input :", abonnementLie?.nomAbonnement);


  return (
    <>
      {successMessage && (
        <div className="max-w-5xl mx-auto mt-4 p-4 rounded-lg bg-green-100 text-green-800 shadow">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Mon Profil</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Nom</label>
            <Input {...register("nom")} />
            {errors.nom && <span className="text-red-500 text-sm">{errors.nom.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <Input {...register("prenom")} />
            {errors.prenom && <span className="text-red-500 text-sm">{errors.prenom.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input type="email" {...register("email")} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Login</label>
            <Input {...register("login")} />
            {errors.login && <span className="text-red-500 text-sm">{errors.login.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <Input {...register("numTel")} />
            {errors.numTel && <span className="text-red-500 text-sm">{errors.numTel.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <Input type="date" {...register("dateDeNaissance")} />
            {errors.dateDeNaissance && (
              <span className="text-red-500 text-sm">{errors.dateDeNaissance.message}</span>
            )}
          </div>
          

          {!isAdmin && abonnementLie && (
            <div className="flex flex-col col-span-full">
              <label className="text-sm font-medium text-gray-700 mb-1">Abonnement</label>

              <div className="flex justify-between items-start gap-4 p-4 rounded-lg border bg-gray-50 shadow-sm">
                <div>
                  <h4 className="text-lg font-bold text-orange-600 mb-1">
                    {abonnementLie.nomAbonnement}
                  </h4>
                  <p className="text-sm text-gray-700 mb-1">
                    💰 Tarif : <strong>{abonnementLie.tarif} €</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    ⏳ Durée : <strong>{abonnementLie.duree}</strong>
                  </p>

                  {abonnementLie.optionsAbonnement && (
                    <p className="text-sm text-gray-700">
                      🧩 Options :{" "}
                      <span className="text-gray-800">
                        {abonnementLie.optionsAbonnement
                          .split(",")
                          .map((opt) => opt.trim())
                          .join(" • ")}
                      </span>
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="text-orange-600 hover:text-orange-800 text-lg mt-1"
                  onClick={() => setShowAbonnementModal(true)}
                >
                  <Pencil/>
                </button>
              </div>
            </div>
          )}




        </div>

        <div className="flex justify-end mt-8 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setModalOpen(true)}
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            🔒 Modifier mon mot de passe
          </Button>

          <Button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow font-semibold"
          >
            Modifier mon profil
          </Button>
        </div>
      </form>
      <ChangerAbonnementModal
  isOpen={showAbonnementModal}
  onClose={() => {
    setShowAbonnementModal(false);

    // 🔁 Re-fetch le user (clé "currentUser")
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });

    // 🔁 Re-fetch l’abonnement lié (clé ["abonnement", id])
    if (user?.abonnementInscritId) {
      queryClient.invalidateQueries({
        queryKey: ["abonnement", user.abonnementInscritId],
      });
    }
  }}
/>


      <ChangerMotDePasseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ProfilAdmin;
