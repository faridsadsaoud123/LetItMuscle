import axios from "axios";

import { useQuery } from "@tanstack/react-query";

export const useUpdateCours = () => {
  const token = localStorage.getItem("token");

  const updateCours = async (
    id: string,
    data: {
      description: string;
      date: string;
      startTime: string;
      places: number;
    }
  ) => {
    await axios.put(`http://localhost:5050/api/Cours/update/${id}`, {
      Description: data.description,
      Date: data.date,
      Heure: data.startTime,
      Places: data.places,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { updateCours };
};

export const useGetCoursById = (id: string) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["cours", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5050/api/Cours/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
};