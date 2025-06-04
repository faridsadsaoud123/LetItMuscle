import React, { useEffect, useState } from "react";
import axios from "axios";
import AdNavbar from "../../AdNavbar"; 
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "../components/Calendar"; 
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";
import { Button } from "../../../../components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { cn2 } from "../../../../utils/jwtUtils";
import { reserverCours, useCoursReserves } from "../hooks/CourseService";
import { useHomeProvider } from "../../../Admin/Home/hooks/useHomeProvider";
import { useNavigate } from "react-router-dom";
export interface CourseDto {
  id: number;
  description: string;
  categorie: string;
  categorieId: number;
  coachId: number;
  date: string;
  heure: string;
  places: number;
  coach: string;
  statut: string;
}
const Cours = () => {
  const [cours, setCours] = useState<CourseDto[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [filteredCourses, setFilteredCourses] = useState<CourseDto[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseDto | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [coursReservesIds, setCoursReservesIds] = useState<number[]>([]);
  
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useHomeProvider();
  const { data: coursReserves, isLoading: loadingRes } = useCoursReserves(user?.id);
  const calculerStatutCours = (cours: CourseDto): string => {
  if (cours.statut === "Annulé") return "Annulé";

  const maintenant = new Date();
  const dateHeureCours = new Date(`${cours.date}T${cours.heure}`);
  const finCours = new Date(dateHeureCours.getTime() + 60 * 60 * 1000);

  if (maintenant < dateHeureCours) return "À Venir";
  if (maintenant >= dateHeureCours && maintenant <= finCours) return "En cours";
  return "Passé";
};

const reservedIds = coursReserves?.map((c) => c.id) ?? [];

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const res = await axios.get<CourseDto[]>(
          "http://localhost:5050/api/cours/All"
        );
        setCours(res.data);
        console.log("Cours récupérés :", res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCours();
  }, []);

  useEffect(() => {
    if (cours.length > 0) {
      const now = new Date();

      if (!selectedDate) {
        const coursAVenir = cours.filter(
  (c) => new Date(c.date) >= now && calculerStatutCours(c)!== "Annulé" &&
    !reservedIds.includes(c.id)
);
        setFilteredCourses(coursAVenir);
      } else {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
       const coursCeJour = cours.filter(
  (c) => c.date === formattedDate &&calculerStatutCours(c)!== "Annulé"&&
    !reservedIds.includes(c.id)
);
        setFilteredCourses(coursCeJour);
      }
    }
  }, [selectedDate, cours]);
  const handleReservation = async () => {
    if (!selectedCourse || !user?.id) return;

    try {
      await reserverCours(selectedCourse.id, user.id);
      alert("Réservation réussie !");
      setSelectedCourse(null);
      navigate("/adherent/accueil");
    } catch (error) {
      alert("Erreur lors de la réservation. Peut-être déjà inscrit ?");
    }
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <AdNavbar />

      <div className="pt-[10vh] px-4 sm:px-10 py-10 container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 mb-4 animate-fade-in">
            Réservation de Cours
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto rounded-full" />
        </div>

        <div className="mb-12 max-w-md mx-auto backdrop-blur-lg bg-white p-6 rounded-2xl border border-orange-500/20 shadow-md">
          <label className="block mb-4 text-gray-800 font-medium text-center text-lg">
            Sélectionnez une date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn2(
                  "w-full justify-start bg-white text-left font-medium border-orange-500/30 hover:border-orange-500/50 hover:bg-gray-50 transition-all duration-300",
                  !selectedDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-3 h-5 w-5 text-orange-500" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                className="rounded-lg border-orange-500/20"
              />
            </PopoverContent>
          </Popover>
        </div>

        {loading ? (
          <div className="text-center mt-20 animate-pulse">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-6 text-gray-600 text-lg">
              Chargement des cours...
            </p>
          </div>
        ) : selectedDate && filteredCourses.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white backdrop-blur-lg rounded-2xl border border-orange-500/10">
            <div className="text-5xl mb-6">🤔</div>
            <h3 className="text-2xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
              Aucun cours disponible
            </h3>
            <p className="text-gray-500 text-lg">
              Il n'y a pas de cours programmés pour cette date.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((cours) => (
              <div
                key={cours.id}
                onClick={() => setSelectedCourse(cours)}
                className="group backdrop-blur-lg bg-white p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-orange-600">
                    {cours.categorie}
                  </h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 font-medium">
                    {calculerStatutCours(cours)}
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="flex items-center text-base text-gray-500 group-hover:text-gray-800 transition-colors">
                    <span className="w-8 h-8 flex items-center justify-center bg-orange-500/10 rounded-full mr-3 text-orange-600">
                      👤
                    </span>
                    <span className="font-medium">{cours.coach}</span>
                  </p>
                  <p className="flex items-center text-base text-gray-500 group-hover:text-gray-800 transition-colors">
                    <span className="w-8 h-8 flex items-center justify-center bg-orange-500/10 rounded-full mr-3 text-orange-600">
                      📅
                    </span>
                    <span>
                      {format(new Date(cours.date), "PPP", { locale: fr })}
                    </span>
                  </p>
                  <p className="flex items-center text-base text-gray-500 group-hover:text-gray-800 transition-colors">
                    <span className="w-8 h-8 flex items-center justify-center bg-orange-500/10 rounded-full mr-3 text-orange-600">
                      🕒
                    </span>
                    <span>{cours.heure}</span>
                  </p>
                  <p className="flex items-center text-base text-gray-500 group-hover:text-gray-800 transition-colors">
                    <span className="w-8 h-8 flex items-center justify-center bg-orange-500/10 rounded-full mr-3 text-orange-600">
                      👥
                    </span>
                    <span>{cours.places} places disponibles</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCourse && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div
              className="bg-white/90 rounded-2xl max-w-2xl w-full p-8 relative border border-orange-500/20 shadow-xl shadow-orange-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ✕
              </button>

              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-3 text-orange-600">
                  {selectedCourse.categorie}
                </h2>
                <p className="text-lg text-gray-600">
                  avec{" "}
                  <span className="text-gray-800 font-medium">
                    {selectedCourse.coach}
                  </span>
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <p className="text-base text-gray-500 leading-relaxed">
                  <strong className="text-orange-600">Description :</strong>{" "}
                  {selectedCourse.description ||
                    "Aucune description disponible."}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-4">
                    <p className="flex items-center text-base text-gray-500">
                      <span className="w-8 h-8 flex items-center justify-center bg-orange-500/10 rounded-full mr-3 text-orange-600">
                        📅
                      </span>
                      <span>
                        <strong className="block text-gray-800">Date</strong>
                        {format(new Date(selectedCourse.date), "PPP", {
                          locale: fr,
                        })}
                      </span>
                    </p>
                    <p className="flex items-center text-base text-gray-500">
                      <span className="w-8 h-8 flex items-center justify-center bg-orange-500/10 rounded-full mr-3 text-orange-600">
                        🕒
                      </span>
                      <span>
                        <strong className="block text-gray-800">Heure</strong>
                        {selectedCourse.heure}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="flex items-center text-base text-gray-500">
                      <span className="w-8 h-8 flex items-center justify-center bg-orange-500/10 rounded-full mr-3 text-orange-600">
                        👥
                      </span>
                      <span>
                        <strong className="block text-gray-800">Places</strong>
                        {selectedCourse.places} disponibles
                      </span>
                    </p>
                    <p className="flex items-center text-base text-gray-500">
                      <span className="w-8 h-8 flex items-center justify-center bg-orange-500/10 rounded-full mr-3 text-orange-600">
                        📌
                      </span>
                      <span>
                        <strong className="block text-gray-800">Statut</strong>
                        {calculerStatutCours(selectedCourse)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleReservation}
                className="w-full py-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-all duration-300 text-lg font-medium rounded-xl"
              >
                Réserver ce cours
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cours;
