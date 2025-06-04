import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";
import { Abonnement } from "../types/Abonnement";

// Fonction qui appelle l'API pour récupérer les abonnements actifs
const getAbonnementsActifs = async (): Promise<Abonnement[]> => {
  const response = await axios.get("/api/Abonnement/actifs");
  return response.data;
};

// Hook React Query
export const useAbonnements = () => {
  return useQuery({
    queryKey: ["abonnements-actifs"],
    queryFn: getAbonnementsActifs,
  });
};
