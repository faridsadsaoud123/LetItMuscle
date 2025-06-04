// src/pages/admin/Utilisateur/hooks/useDeleteUtilisateur.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteUtilisateur = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token"); // ou depuis ton context si tu l’as mis là

      const response = await axios.delete(`http://localhost:5050/api/utilisateurs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};
