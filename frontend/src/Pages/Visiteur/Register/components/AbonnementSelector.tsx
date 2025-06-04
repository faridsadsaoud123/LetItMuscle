import React from "react";
import { useGetAbonnements, AbonnementDto } from "../../../Admin/Abonnement/hooks/useGetAbonnements";
import { BadgeEuro, CalendarDays, Users, Puzzle } from "lucide-react";
import { cn } from "../../../../lib/utils";

interface Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const AbonnementSelector: React.FC<Props> = ({ selectedId, onSelect }) => {
    const { data: abonnements, isLoading, isError } = useGetAbonnements(true); // 🔥 Actifs seulement

  if (isLoading) return <p className="text-white">Chargement des abonnements...</p>;
  if (isError) return <p className="text-red-500">Erreur lors du chargement des abonnements.</p>;

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {abonnements?.map((abonnement: AbonnementDto) => (
        <div
          key={abonnement.id}
          onClick={() => onSelect(abonnement.id)}
          className={cn(
            "cursor-pointer border p-6 rounded-xl shadow-lg bg-white hover:border-orange-500 transition-all",
            selectedId === abonnement.id
              ? "border-2 border-orange-500 ring-2 ring-orange-300 scale-105"
              : "border-gray-200"
          )}
        >
          <h3 className="text-2xl font-bold text-brand-orange mb-4 text-center">
            {abonnement.nomAbonnement}
          </h3>

          <div className="flex flex-col gap-3 text-gray-800 text-sm">
            <div className="flex items-center gap-2">
              <BadgeEuro className="h-5 w-5 text-orange-500" />
              <span>Tarif : {abonnement.tarif} €</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-blue-500" />
              <span>Durée : {abonnement.duree}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              <span>Adhérents inscrits : {abonnement.nbrAdherent}</span>
            </div>

            {abonnement.optionsAbonnement && (
              <div className="flex items-start gap-2">
                <Puzzle className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-semibold">Options :</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {abonnement.optionsAbonnement
                      .split(",")
                      .filter(opt => opt.trim() !== "")
                      .map((option, idx) => (
                        <li key={idx} className="text-sm">{option.trim()}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AbonnementSelector;