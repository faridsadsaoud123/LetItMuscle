import axios from "axios";

export const useAnnulerCours = () => {
  const token = localStorage.getItem("token");

  const annulerCours = async (id: number) => {
    await axios.put(`http://localhost:5050/api/Cours/${id}/annuler`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { annulerCours };
};
