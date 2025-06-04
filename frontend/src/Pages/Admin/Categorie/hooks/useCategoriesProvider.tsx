import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCategories = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5050/api/Categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!token,
  });
};
