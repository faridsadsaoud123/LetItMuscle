import axios from "axios";

export const useDeleteCours = () => {
  const token = localStorage.getItem("token");

  const deleteCours = async (id: string) => {
    await axios.delete(`http://localhost:5050/api/Cours/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { deleteCours };
};
