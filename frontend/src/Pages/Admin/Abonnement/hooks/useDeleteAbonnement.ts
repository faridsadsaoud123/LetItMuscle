import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteAbonnement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:5050/api/Abonnement/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["abonnements"] });

    },
  });
};
