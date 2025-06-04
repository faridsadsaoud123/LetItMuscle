import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaFilter,
  FaUserTie,
  FaPlayCircle,
  FaClock,
  FaCalendarAlt,
  FaBan,
  FaUndo,
} from "react-icons/fa";

interface Props {
  onClose: () => void;
  onApply: (coachs: string[], statuts: string[]) => void;
  cours: { coach: string; statut: string }[];
}

const SideFilterPanelCours: React.FC<Props> = ({ onClose, onApply, cours }) => {
  const [coachs, setCoachs] = useState<string[]>([]);
  const [statuts, setStatuts] = useState<string[]>([]);
  const [selectedCoachs, setSelectedCoachs] = useState<string[]>([]);
  const [selectedStatuts, setSelectedStatuts] = useState<string[]>([]);

  useEffect(() => {
    const allCoachs = cours.map((c) => c.coach).filter(Boolean);
    const allStatuts = cours.map((c) => c.statut).filter(Boolean);
    setCoachs([...new Set(allCoachs)]);
    setStatuts([...new Set(allStatuts)]);
  }, [cours]);

  const toggle = (list: string[], value: string, setter: (val: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const statutIcon = (s: string) => {
    switch (s) {
      case "À Venir":
        return <FaCalendarAlt className="text-green-500 mr-2" />;
      case "En cours":
        return <FaPlayCircle className="text-blue-500 mr-2" />;
      case "Passé":
        return <FaClock className="text-orange-500 mr-2" />;
      case "Annulé":
        return <FaBan className="text-red-500 mr-2" />;
      default:
        return <FaClock className="text-gray-500 mr-2" />;
    }
  };

  const statutTextColor = (s: string) => {
    switch (s) {
      case "À Venir":
        return "text-green-600";
      case "En cours":
        return "text-blue-600";
      case "Passé":
        return "text-orange-600";
      case "Annulé":
        return "text-red-600";
      default:
        return "text-gray-700";
    }
  };

  const handleApply = () => {
    onApply(selectedCoachs, selectedStatuts);
    onClose();
  };

  const resetFilters = () => {
    setSelectedCoachs([]);
    setSelectedStatuts([]);
    onApply([], []);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 z-50 overflow-auto transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-orange-500">
            <FaFilter size={18} />
            Filtres
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Coach</h3>
          <ul className="space-y-2">
            {coachs.map((coach) => (
              <li
                key={coach}
                onClick={() => toggle(selectedCoachs, coach, setSelectedCoachs)}
                className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition ${
                  selectedCoachs.includes(coach)
                    ? "bg-orange-100 font-semibold ring-2 ring-orange-400"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaUserTie className="text-orange-500 mr-2" />
                {coach}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Statut</h3>
          <ul className="space-y-2">
            {["À Venir", "En cours", "Passé", "Annulé"].map((s) => (
              <li
                key={s}
                onClick={() => toggle(selectedStatuts, s, setSelectedStatuts)}
                className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition ${statutTextColor(s)} ${
                  selectedStatuts.includes(s)
                    ? "bg-orange-100 font-semibold ring-2 ring-orange-400"
                    : "hover:bg-gray-100"
                }`}
              >
                {statutIcon(s)}
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition"
          >
            <FaUndo />
            Réinitialiser
          </button>

          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-medium"
          >
            Appliquer
          </button>
        </div>
      </div>
    </>
  );
};

export default SideFilterPanelCours;
