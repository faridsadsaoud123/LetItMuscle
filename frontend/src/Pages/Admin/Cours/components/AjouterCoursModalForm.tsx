import React, { useEffect, useState } from "react";
import { InputSelect } from "../../../../components/ui/InputSelect";
import { Input } from "../../../../components/ui/Input";
import { useCategories } from "../../Categorie/hooks/useCategoriesProvider";
import { useCoachs } from "../../Utilisateurs/hooks/useUtilisateurProvider";
import { z, ZodFormattedError } from "zod";
import { IoMdClose } from "react-icons/io";

export type CourseFormData = {
  description: string;
  category: string;
  coach: string;
  date: string;
  startTime: string;
  places: number;
};

type Coach = {
  id: number;
  nom: string;
  prenom: string;
};

type Categorie = {
  id: number;
  nomCategorie: string;
};

interface Props {
  onClose: () => void;
  onSubmit: (data: CourseFormData) => Promise<void>;
  initialData?: CourseFormData;
  isEditing?: boolean;
  onAnnuler?: () => Promise<void>;
  statut?: string;
}

const AjouterCoursModalForm: React.FC<Props> = ({
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
  onAnnuler,
  statut,
}) => {
  const [form, setForm] = useState<CourseFormData>(
    initialData || {
      description: "",
      category: "",
      coach: "",
      date: "",
      startTime: "",
      places: 0,
    }
  );

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const { data: categories } = useCategories();
  const { data: coachs } = useCoachs();
  const [errors, setErrors] = useState<ZodFormattedError<CourseFormData>>();

  const schema = z.object({
    description: z.string().min(1, { message: "La description est requise" }),
    category: z.string().min(1, { message: "La catégorie est requise" }),
    coach: z.string().min(1, { message: "Le coach est requis" }),
    places: z.number().min(1, {
      message: "Le nombre de places doit être supérieur à zéro",
    }),
    date: z.string().refine(
      (val) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(val);
        return selectedDate >= today;
      },
      { message: "La date doit être à partir d'aujourd'hui ou plus tard" }
    ),

    startTime: z.string().refine(
      (val) => {
        const [hour, minute] = val.split(":").map(Number);
        const totalMinutes = hour * 60 + minute;
        return totalMinutes >= 360 && totalMinutes <= 1440;
      },
      {
        message: "L'heure doit être entre 06:00 et 00:00",
      }
    ),
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      category:
        !prev.category && categories?.length
          ? categories[0].id.toString()
          : prev.category,
      coach:
        !prev.coach && coachs?.length ? coachs[0].id.toString() : prev.coach,
    }));
  }, [categories, coachs]);

  const validateForm = (data: CourseFormData) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.format());
      return false;
    }
    setErrors(undefined);
    return true;
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: name === "places" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.coach) {
      alert("Veuillez sélectionner un coach");
      return;
    }

    if (validateForm(form)) {
      await onSubmit(form);
    }
  };

  const statutActuel = statut || "";
  const annulationPossible = statutActuel === "À Venir";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-black"
        >
          <IoMdClose />
        </button>

        <h2 className="text-2xl font-bold mb-4 border-b-2 border-orange-500 pb-2">
          {isEditing ? "Modifier un cours" : "Ajouter un cours"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col">
            <InputSelect
              id="category"
              label="Catégorie"
              options={
                categories?.map((c: Categorie) => ({
                  value: c.id.toString(),
                  label: c.nomCategorie,
                })) || []
              }
              value={form.category}
              onChange={(val) => handleChange("category", val)}
              disabled={!categories}
            />
            {errors?.category && (
              <p className="text-red-500 text-sm">
                {errors.category._errors[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <InputSelect
              id="coach"
              label="Coach"
              options={
                coachs?.map((c: Coach) => ({
                  value: c.id.toString(),
                  label: `${c.prenom} ${c.nom}`,
                })) || []
              }
              value={form.coach}
              onChange={(val) => handleChange("coach", val)}
              disabled={!coachs}
            />
            {errors?.coach && (
              <p className="text-red-500 text-sm">{errors.coach._errors[0]}</p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <Input
              id="description"
              label="Description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              labelColor="black"
            />
            {errors?.description && (
              <p className="text-red-500 text-sm">
                {errors.description._errors[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              id="date"
              label="Date"
              type="date"
              min={new Date(Date.now()).toISOString().split("T")[0]} // demain
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              labelColor="black"
            />

            {errors?.date && (
              <p className="text-red-500 text-sm">{errors.date._errors[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              id="places"
              label="Places"
              type="number"
              value={form.places.toString()}
              onChange={(e) => handleChange("places", e.target.value)}
              labelColor="black"
            />
            {errors?.places && (
              <p className="text-red-500 text-sm">{errors.places._errors[0]}</p>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              id="startTime"
              label="Heure de début"
              type="time"
              min="06:00"
              max="00:00"
              value={form.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
              labelColor="black"
            />

            {errors?.startTime && (
              <p className="text-red-500 text-sm">
                {errors.startTime._errors[0]}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
            {isEditing && onAnnuler && (
              <button
                type="button"
                onClick={() => {
                  if (!annulationPossible) {
                    alert(
                      "❌ Ce cours est déjà en cours, terminé ou annulé. Il ne peut pas être annulé."
                    );
                    return;
                  }
                  onAnnuler();
                }}
                className={`px-6 py-2 rounded-lg text-white ${
                  annulationPossible
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Annuler le cours
              </button>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {isEditing ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjouterCoursModalForm;
