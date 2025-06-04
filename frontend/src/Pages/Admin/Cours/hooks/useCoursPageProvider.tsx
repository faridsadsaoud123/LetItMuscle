import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Cours {
  id: number;
  description: string;
  categorie: string;
  date: string;
  heure: string;
  places: number;
  coach: string;
  statut: "À Venir" | "Passé" | "Annulé";
}

export const useCoursPageProvider = () => {
  const token = localStorage.getItem("token");

  return useQuery<Cours[]>({
    queryKey: ["cours"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5050/api/Cours/All", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Cours reçus:", response.data);
      return response.data;
    },
    enabled: !!token,
    retry: false,
  });
};
