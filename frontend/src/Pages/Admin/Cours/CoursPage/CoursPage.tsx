import React, { useState } from "react";
import ComplexNavbar from "../../Components/NavbarAdmin";
import SidebarAdmin from "../../Components/SideBarAdmin";
import { useHomeProvider } from "../../Home/hooks/useHomeProvider";
import { useCoursPageProvider } from "../hooks/useCoursPageProvider";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDeleteCours } from "../hooks/useDeleteCoursProvider";
import { SiCoursera } from "react-icons/si";
import { FaFilter } from "react-icons/fa";
import AjouterCoursModalForm, {
  CourseFormData,
} from "../components/AjouterCoursModalForm";
import { useAddCours } from "../hooks/useAddCoursProvider";
import { useUpdateCours } from "../hooks/useUpdateCoursProvider";
import { useAnnulerCours } from "../hooks/useAnnulerCours";
import type { Cours } from "../hooks/useCoursPageProvider";
import SideFilterCours from "../components/SideFilterCours";

const calculerStatutCours = (cours: Cours): string => {
  if (cours.statut === "Annulé") return "Annulé";

  const maintenant = new Date();
  const dateHeureCours = new Date(`${cours.date}T${cours.heure}`);
  const finCours = new Date(dateHeureCours.getTime() + 60 * 60 * 1000);

  if (maintenant < dateHeureCours) return "À Venir";
  if (maintenant >= dateHeureCours && maintenant <= finCours) return "En cours";
  return "Passé";
};

const CoursPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useHomeProvider();

  const { annulerCours } = useAnnulerCours();
  const [ordreDate, setOrdreDate] = useState<"asc" | "desc">("asc");

  const [showAddModal, setShowAddModal] = useState(false);
  const { addCours } = useAddCours();

  const [showFilter, setShowFilter] = useState(false);
  const [coachFilters, setCoachFilters] = useState<string[]>([]);
  const [statutFilters, setStatutFilters] = useState<string[]>([]);

  const {
    data: cours,
    isLoading: coursLoading,
    isError: coursError,
  } = useCoursPageProvider();
  const { deleteCours } = useDeleteCours();
  const { updateCours } = useUpdateCours();

  const [showEditModal, setShowEditModal] = useState(false);
  const [coursAModifier, setCoursAModifier] = useState<any | null>(null);

  const handleEditClick = (cours: any) => {
    setCoursAModifier(cours);
    setShowEditModal(true);
  };

  if (userLoading || coursLoading)
    return <p className="text-center mt-20">Chargement...</p>;

  if (userError || !user || coursError || !cours)
    return (
      <p className="text-center mt-20 text-red-500">
        Erreur lors du chargement
      </p>
    );

  const handleDeleteClick = async (id: number) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer ce cours ?");
    if (!confirm) return;

    try {
      await deleteCours(id.toString());
      alert("✅ Cours supprimé !");
      navigate(0);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("❌ Échec de la suppression");
    }
  };

  const coursFiltres = cours.filter((c) => {
    const matchSearch =
      c.categorie.toLowerCase().includes(search.toLowerCase()) ||
      c.coach.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    const matchCoach =
      coachFilters.length === 0 || coachFilters.includes(c.coach);

    const statutActuel = calculerStatutCours(c);
    const matchStatut =
      statutFilters.length === 0 || statutFilters.includes(statutActuel);

    return matchSearch && matchCoach && matchStatut;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "À Venir":
        return "text-green-500";
      case "En cours":
        return "text-blue-500";
      case "Passé":
        return "text-orange-500";
      case "Annulé":
        return "text-red-500";
      default:
        return "";
    }
  };
  const coursTries = [...coursFiltres].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.heure}`);
    const dateB = new Date(`${b.date}T${b.heure}`);
    return ordreDate === "asc"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <ComplexNavbar />
      </div>

      <div className="fixed top-20 left-0 w-80 h-[calc(100vh-80px)] z-40 bg-black">
        <SidebarAdmin />
      </div>

      <main className="ml-80 mt-20 p-6">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold text-gray-800 mb-6 mt-6 border-b-4 border-orange-500 pb-2 shadow-sm uppercase tracking-wide">
          <SiCoursera className="text-orange-500 text-4xl" />
          Gestion des Cours
        </h1>

        <div className="flex flex-col items-start md:items-end gap-2 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            <div className="flex items-center bg-[#D7D2CF] px-4 py-2 rounded-xl w-full md:w-[400px]">
              <Search className="text-gray-600 mr-2" size={18} />
              <input
                type="text"
                placeholder="Rechercher catégorie"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-gray-800 w-full"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#3366CC] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              <Plus size={18} /> Créer un cours
            </button>
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="mt-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-orange-600 transition"
          >
            <FaFilter className="inline" />
            Filtres
          </button>
        </div>

        <table className="w-full text-black">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-2 text-left">Catégorie</th>
              <th
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() =>
                  setOrdreDate((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                Date {ordreDate === "asc" ? "↑" : "↓"}
              </th>

              <th className="px-4 py-2 text-left">Heure</th>
              <th className="px-4 py-2 text-left">Places</th>
              <th className="px-4 py-2 text-left">Coach</th>
              <th className="px-4 py-2 text-left">Statut</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursTries.map((c, i) => (
              <tr
                key={c.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-2">{c.categorie}</td>
                <td className="px-4 py-2">{c.date}</td>
                <td className="px-4 py-2">{c.heure}</td>
                <td className="px-4 py-2">{c.places}</td>
                <td className="px-4 py-2">{c.coach}</td>
                <td
                  className={`px-4 py-2 ${getStatusColor(
                    calculerStatutCours(c)
                  )}`}
                >
                  {calculerStatutCours(c)}
                </td>

                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => {
                      const statut = calculerStatutCours(c);
                      if (statut === "Passé") {
                        alert(
                          "❌ Ce cours est terminé. Il ne peut plus être modifié."
                        );
                        return;
                      }
                      handleEditClick(c);
                    }}
                    className={`${
                      calculerStatutCours(c) === "Passé"
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-green-600 hover:text-green-700"
                    }`}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(c.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showAddModal && (
          <AjouterCoursModalForm
            onClose={() => setShowAddModal(false)}
            onSubmit={async (form: CourseFormData) => {
              try {
                await addCours({
                  description: form.description,
                  date: form.date,
                  startTime: form.startTime,
                  places: form.places,
                  coachId: form.coach,
                  categoryId: form.category,
                });
                alert("✅ Cours ajouté !");
                setShowAddModal(false);
                navigate(0);
              } catch (err) {
                alert("❌ Erreur lors de l'ajout.");
                console.error(err);
              }
            }}
          />
        )}

        {showEditModal && coursAModifier && (
          <AjouterCoursModalForm
            onClose={() => {
              setShowEditModal(false);
              setCoursAModifier(null);
            }}
            initialData={{
              description: coursAModifier.description,
              date: coursAModifier.date,
              startTime: coursAModifier.heure,
              places: coursAModifier.places,
              coach: coursAModifier.coachId.toString(),
              category: coursAModifier.categorieId.toString(),
            }}
            isEditing
            statut={calculerStatutCours(coursAModifier)}
            onSubmit={async (form: CourseFormData) => {
              try {
                await updateCours(coursAModifier.id, {
                  description: form.description,
                  date: form.date,
                  startTime: form.startTime,
                  places: form.places,
                });
                alert("✅ Cours modifié !");
                setShowEditModal(false);
                setCoursAModifier(null);
                navigate(0); // Refresh
              } catch (err) {
                alert("❌ Erreur lors de la modification.");
                console.error(err);
              }
            }}
            onAnnuler={async () => {
              if (window.confirm("Voulez-vous vraiment annuler ce cours ?")) {
                try {
                  await annulerCours(coursAModifier.id);
                  alert("✅ Cours annulé !");
                  setShowEditModal(false);
                  navigate(0);
                } catch (err) {
                  alert("❌ Erreur lors de l'annulation.");
                  console.error(err);
                }
              }
            }}
          />
        )}

        {showFilter && (
          <SideFilterCours
            onClose={() => setShowFilter(false)}
            cours={cours}
            onApply={(selectedCoachs, selectedStatuts) => {
              setCoachFilters(selectedCoachs);
              setStatutFilters(selectedStatuts);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default CoursPage;
