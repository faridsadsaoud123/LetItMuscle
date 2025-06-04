import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface UtilisateurDto {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  numTel: number;
  dateDeNaissance: string;
  role: string;
  abonnementInscritId?: string | null;
  abonnementInscrit?: string | null;
}

export const useGetUtilisateurs = () => {
  return useQuery<UtilisateurDto[], Error>({
    queryKey: ["utilisateurs"],
    queryFn: async () => {
      const token = localStorage.getItem("token"); // 🔐 récupérer le token stocké lors du login
      const response = await axios.get("http://localhost:5050/api/Utilisateurs", {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 on l’ajoute ici
        },
      });
      return response.data;
    },
  });
};
