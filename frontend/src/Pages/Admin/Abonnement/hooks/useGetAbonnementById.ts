import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AbonnementDto } from "./useGetAbonnements";

export const useGetAbonnementById = (id: number | null) => {
    return useQuery<AbonnementDto, Error>({
      queryKey: ["abonnement", id],
      queryFn: async () => {
        const response = await axios.get(`http://localhost:5050/api/Abonnement/${id}`);
        return response.data;
      },
      enabled: id !== null, // ⬅️ pour éviter d'appeler l'API avec "null"
    });
  };
  
