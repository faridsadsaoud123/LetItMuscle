import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CurrentUserResponse {
  email: string;
  id: number;
  utilisateurId: number;
  nom: string;
  prenom: string;
  login: string;
  numTel: number;
  dateDeNaissance: string;
  role: string;
  abonnementInscritId?: number | null;
}

export const useHomeProvider = () => {
  const token = localStorage.getItem("token");

  return useQuery<CurrentUserResponse, Error>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5050/api/Utilisateurs/currentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: !!token,
    retry: false,     
  });
};



export const useDashboardStats = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5050/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
};
