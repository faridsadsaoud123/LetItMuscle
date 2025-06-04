import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface UpdateAbonnementDto {
  id: number;
  nomAbonnement: string;
  tarif: number;
  duree: string;
  nbrAdherent: number;
  statusAbonnement: string;
  optionsAbonnement: string;
}

export const useUpdateAbonnement = () => {
  return useMutation({
    mutationFn: async (data: UpdateAbonnementDto) => {
      const response = await axios.put(
        `http://localhost:5050/api/Abonnement/${data.id}`,
        data
      );
      return response.data;
    },
  });
};
