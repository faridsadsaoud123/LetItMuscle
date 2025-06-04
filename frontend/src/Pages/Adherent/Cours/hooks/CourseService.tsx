import axios from "axios";
import { CourseDto } from "../ui/Cours";
import {useMutation, useQuery} from "@tanstack/react-query";

export const getCourses = async (): Promise<CourseDto[]> => {
  const response = await axios.get<CourseDto[]>("/api/Cours/All");
  return response.data;
};

export const getCoursesByDate = async (date: string): Promise<CourseDto[]> => {
  const response = await axios.get<CourseDto[]>(`/api/Cours/par-date/${date}`);
  return response.data;
};
export const reserverCours = async (coursId: number, adherentId: number) => {
  try {
    const res = await axios.post(
      `http://localhost:5050/api/Cours/${coursId}/ajouter-adherent/${adherentId}`
    );
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la réservation :", error);
    throw error;
  }
};
export const useAnnulerReservation = () => {
  return useMutation({
    mutationFn: async ({ coursId, adherentId }: { coursId: number; adherentId: number }) => {
      const response = await axios.delete(
        `http://localhost:5050/api/Cours/${coursId}/annuler-reservation/${adherentId}`
      );
      return response.data;
    },
  });
};
export const useCoursReserves = (adherentId: number | undefined) => {
  return useQuery<CourseDto[]>({
    queryKey: ["cours-reserves", adherentId],
    queryFn: async () => {
      const response = await axios.get<CourseDto[]>(
        `http://localhost:5050/api/cours/adherent/${adherentId}/reservations`
      );
      return response.data;
    },
    enabled: !!adherentId, // n’exécute la requête que si l’ID est défini
  });
};