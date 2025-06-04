// src/pages/admin/Utilisateur/hooks/useUpdateUtilisateur.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface UpdateUtilisateurDto {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  login?: string;
  password?: string;
  role: string;
  numTel: number;
  dateDeNaissance: string;
  abonnementInscritId?: string | null;
}

export const useUpdateUtilisateur = () => {
    return useMutation({
      mutationFn: async (data: UpdateUtilisateurDto) => {
        const response = await axios.put(
          `http://localhost:5050/api/utilisateurs/${data.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return response.data;
      },
    });
  };
