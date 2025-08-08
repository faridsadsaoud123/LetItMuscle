import React from "react";
import { useGetAbonnements, AbonnementDto } from "../../../Admin/Abonnement/hooks/useGetAbonnements";
// import { BadgeEuro, CalendarDays, Users, Puzzle } from "lucide-react";
// import { cn } from "../../../../lib/utils";
import { Button } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";
interface Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const AbonnementSelector: React.FC<Props> = ({ selectedId, onSelect }) => {
    const { data: abonnements, isLoading, isError } = useGetAbonnements(true); 

  if (isLoading) return <p className="text-white">Chargement des abonnements...</p>;
  if (isError) return <p className="text-red-500">Erreur lors du chargement des abonnements.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {abonnements?.map((abonnement) => (
        <Card
          key={abonnement.id}
          className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedId === abonnement.id
              ? "ring-2 ring-primary bg-primary/10"
              : "bg-white/90 hover:bg-white"
          }`}
          onClick={() => onSelect(abonnement.id)}
        >
          <div className="text-center">
            <div className="text-primary text-2xl font-bold mb-2">
              €{abonnement.tarif}
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Durée: {abonnement.duree}
            </div>
            <h3 className="text-lg font-semibold mb-3">{abonnement.nomAbonnement}</h3>
           
              
                <li className="flex items-center justify-center">
                  <span className="text-green-600 mr-2">✓</span>
                  {abonnement.optionsAbonnement}
                </li>
          
            <Button
              variant={selectedId === abonnement.id ? "default" : "outline"}
              className="w-full"
            >
              {selectedId === abonnement.id ? "Sélectionné" : "Choisir"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AbonnementSelector;