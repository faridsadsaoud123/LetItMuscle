import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface CreateAbonnementDto {
  nomAbonnement: string;
  tarif: number;
  duree: string;
  nbrAdherent: number;
  statusAbonnement: string;
  createurId: number;
  optionsAbonnement: string; // Les options sélectionnées
}

export const useCreateAbonnement = () => {
  return useMutation({
    mutationFn: async (data: CreateAbonnementDto) => {
      const response = await axios.post("http://localhost:5050/api/Abonnement", data);
      return response.data;
    },
  });
};
