import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginDto {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const useLoginProvider = () => {
  return useMutation<LoginResponse, Error, LoginDto>({
    mutationFn: async (data: LoginDto) => {
      const response = await axios.post("http://localhost:5050/api/Auth/login", data);
      return response.data;
    },
  });
};
