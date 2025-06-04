import axios from "axios";

export const useAddCours = () => {
  const token = localStorage.getItem("token");

  const addCours = async (data: {
    description: string;
    date: string;
    startTime: string;
    places: number;
    coachId: string;
    categoryId: string;
  }) => {
    console.log({
      Description: data.description,
      Date: data.date,
      Heure: data.startTime,
      Places: data.places,
      CoachId: Number(data.coachId),
      CategorieId: Number(data.categoryId),
    });
    const response = await axios.post(
      "http://localhost:5050/api/Cours/creer",
      {
        Description: data.description,
        Date: data.date,
        Heure: data.startTime,
        Places: data.places,
        CoachId: parseInt(data.coachId),
        CategorieId: parseInt(data.categoryId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Cours ajouté:", response.data);
    return response.data;
  };

  return { addCours };
};
