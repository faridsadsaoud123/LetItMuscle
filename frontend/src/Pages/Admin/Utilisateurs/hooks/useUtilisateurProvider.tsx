import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useCoachs = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["coachs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5050/api/Utilisateurs/coachs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // [{ id, prenom, nom }]
    },
    enabled: !!token,
  });
};