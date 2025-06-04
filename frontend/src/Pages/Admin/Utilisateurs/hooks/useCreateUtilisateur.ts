// src/pages/admin/Utilisateur/hooks/useCreateUtilisateur.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface CreateUtilisateurDto {
  nom: string;
  prenom: string;
  email: string;
  login: string;
  password: string;
  role: string;
  numTel: number;
  dateDeNaissance: string;
  abonnementInscritId?: string | null;
}

export const useCreateUtilisateur = () => {
  return useMutation({
    mutationFn: async (data: CreateUtilisateurDto) => {
      const response = await axios.post("http://localhost:5050/api/Auth/register", data);
      return response.data;
    },
  });
};
