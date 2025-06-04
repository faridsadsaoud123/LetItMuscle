import React from "react";
import AdNavbar from "../AdNavbar";
import { useHomeProvider } from "../../Admin/Home/hooks/useHomeProvider";
import Footer from "../../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAnnulerReservation } from "../Cours/hooks/CourseService";

interface CourseDto {
  id: number;
  description: string;
  categorie: string;
  categorieId: number;
  coachId: number;
  date: string;
  heure: string;
  places: number;
  coach: string;
  statut: string;
}

export const AdAccueil: React.FC = () => {
  const [mesCours, setMesCours] = useState<CourseDto[]>([]);
  const { data: user } = useHomeProvider();
  const { mutate: annulerReservation } = useAnnulerReservation();
  const calculerStatutCours = (cours: CourseDto): string => {
  if (cours.statut === "Annulé") return "Annulé";

  const maintenant = new Date();
  const dateHeureCours = new Date(`${cours.date}T${cours.heure}`);
  const finCours = new Date(dateHeureCours.getTime() + 60 * 60 * 1000);

  if (maintenant < dateHeureCours) return "À Venir";
  if (maintenant >= dateHeureCours && maintenant <= finCours) return "En cours";
  return "Passé";
};
const handleCancel = (coursId: number) => {
  console.log("user avant check :", user);
  if (!user?.id) return;
  console.log("Annuler réservation pour le cours ID:", coursId, "et l'adhérent ID:", user.id);
  annulerReservation(
    { coursId, adherentId: user.id },
    {
      onSuccess: () => {
        alert("Réservation annulée");
        setMesCours((prev) => prev.filter((c) => c.id !== coursId));
      },
      onError: (err) => {
        console.error(err);

        alert("Erreur lors de l'annulation");
      },
    }
  );
};

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user?.id) return;
      try {
        const res = await axios.get<CourseDto[]>(
          `http://localhost:5050/api/cours/adherent/${user.id}/reservations`
        );
        setMesCours(res.data);
      } catch (error) {
        console.error("Erreur chargement cours réservés :", error);
      }
    };

    fetchReservations();
  }, [user]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold";
    switch (status.toLowerCase()) {
      case "confirmé":
        return `${baseClasses} bg-green-500/20 text-green-400 border border-green-500/50`;
      case "terminé":
        return `${baseClasses} bg-orange-500/20 text-orange-400 border border-orange-500/50`;
      case "annulé":
        return `${baseClasses} bg-red-500/20 text-red-400 border border-red-500/50`;
      case "à venir":
        return `${baseClasses} bg-blue-500/20 text-blue-400 border border-blue-500/50`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-400 border border-gray-500/50`;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#222222] text-white">
      <AdNavbar />

      {/* Hero Section avec effet glassmorphism */}
      <div
        className="relative h-[65vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('/lovable-uploads/97d5ca2e-ac80-4210-a296-39666ac59c61.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-20 md:px-16">
          <div className="animate-fade-in space-y-6">
            <h1 className="text-6xl font-bold tracking-tight">
              BIENVENUE
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                {user?.nom}
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {user?.prenom}
              </span>
            </h1>
            <p className="text-xl font-light text-gray-300 max-w-2xl">
              Gère et modifie ton abonnement où et quand tu le veux via notre
              application web LET IT MUSCLE.
            </p>
          </div>
        </div>
      </div>

      {/* Section Tableau avec effet glassmorphism */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="flex items-center gap-3 text-3xl font-bold mb-8">
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Cours réservés
          </span>
          <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-orange-600/20" />
        </h2>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Catégorie
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Heure
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Coach
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                     Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mesCours.map((cours, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-white/5"
                  >
                    <td className="px-6 py-4 text-sm">
                      <span className="font-medium">{cours.categorie}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {cours.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {cours.heure}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {cours.coach}
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(calculerStatutCours(cours))}>
  {calculerStatutCours(cours)}
</span>

                    </td>
                    <td className="px-6 py-4">
  {calculerStatutCours(cours)=== "À Venir" ? (
    <button
      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm transition"
       onClick={() => handleCancel(cours.id)}
    >
      Annuler
    </button>
  ) : (
    <span className="text-gray-500 text-sm italic">—</span>
  )}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdAccueil;