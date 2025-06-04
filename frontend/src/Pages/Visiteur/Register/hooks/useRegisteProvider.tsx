import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface RegisterDto {
  nom: string;
  prenom: string;
  email: string;
  login: string;
  password: string;
  role: string;
  numTel: number;
  dateDeNaissance: string;
}
interface RegisterResponse {
  message: string;
  id: number;
}

export const useRegisterProvider = () => {
  return useMutation<RegisterResponse, Error, RegisterDto>({
    mutationFn: async (data: RegisterDto) => {
  try {
    console.log("Payload envoyé :", data);
    const response = await axios.post("http://localhost:5050/api/Auth/register", data);
    return response.data;
  } catch (error: any) {
    console.error("Erreur Axios :", error.response?.data);
    throw new Error(
  error.response?.data?.error ??
  (error.response?.data?.errors
    ? Object.values(error.response.data.errors).join(" | ")
    : "Erreur lors de l'inscription")
);
  }
}

  });
};
