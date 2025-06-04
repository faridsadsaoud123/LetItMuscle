import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface AbonnementDto {
  id: number;
  nomAbonnement: string;
  tarif: number;
  duree: string;
  nbrAdherent: number;
  statusAbonnement: string;
  createurId: number;
  optionsAbonnement: string;
}

export const useGetAbonnements = (actifsSeulement: boolean = false) => {
  return useQuery<AbonnementDto[], Error>({
    queryKey: ["abonnements", actifsSeulement],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5050/api/Abonnement");
      const data = response.data;
      return actifsSeulement
        ? data.filter((a: AbonnementDto) => a.statusAbonnement === "Actif")
        : data;
    },
  });
};