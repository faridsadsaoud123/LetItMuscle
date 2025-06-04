import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaUserShield,
  FaChalkboardTeacher,
  FaUserTag,
  FaUndo,
  FaFilter
} from "react-icons/fa";
import { UtilisateurDto } from "../hooks/useGetUtilisateurs";

interface Props {
  onClose: () => void;
  onApply: (roles: string[], abonnements: string[]) => void;
  utilisateurs: UtilisateurDto[];
}

const SideFilterPanel: React.FC<Props> = ({ onClose, onApply, utilisateurs }) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [abonnements, setAbonnements] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedAbos, setSelectedAbos] = useState<string[]>([]);

  useEffect(() => {
    const allRoles = utilisateurs.map((u) => u.role).filter(Boolean);
    const allAbos = utilisateurs.map((u) => u.abonnementInscrit).filter((a): a is string => !!a);

    setRoles([...new Set(allRoles)]);
    setAbonnements([...new Set(allAbos)]);
  }, [utilisateurs]);

  const toggle = (list: string[], value: string, setter: (val: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <FaUserShield className="text-blue-600 mr-2" />;
      case "Coach":
        return <FaChalkboardTeacher className="text-orange-500 mr-2" />;
      case "AdherentStandard":
        return <FaUserTag className="text-green-600 mr-2" />;
      case "AdherentCoachingEnLigne":
        return <FaUserTag className="text-purple-500 mr-2" />;
      default:
        return <FaUserTag className="text-gray-500 mr-2" />;
    }
  };

  const handleApply = () => {
    onApply(selectedRoles, selectedAbos);
    onClose();
  };

  const resetFilters = () => {
    setSelectedRoles([]);
    setSelectedAbos([]);
    onApply([], []);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      ></div>
  
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
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Rôles</h3>
          <ul className="space-y-2">
            {roles.map((role) => (
              <li
                key={role}
                onClick={() => toggle(selectedRoles, role, setSelectedRoles)}
                className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition ${
                  selectedRoles.includes(role)
                    ? "bg-orange-100 font-semibold ring-2 ring-orange-400"
                    : "hover:bg-gray-100"
                }`}
              >
                {getRoleIcon(role)}
                {role === "AdherentStandard"
                  ? "Adhérent"
                  : role === "AdherentCoachingEnLigne"
                  ? "Adhérent (Coaching)"
                  : role}
              </li>
            ))}
          </ul>
        </div>
  
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Abonnements</h3>
          <ul className="space-y-2">
            {abonnements.map((abo) => (
              <li
                key={abo}
                onClick={() => toggle(selectedAbos, abo, setSelectedAbos)}
                className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                  selectedAbos.includes(abo)
                    ? "bg-blue-100 font-semibold ring-2 ring-blue-400"
                    : "hover:bg-gray-100"
                }`}
              >
                {abo === "Standard" && <span className="mr-2">🟢</span>}
                {abo === "Premium" && <span className="mr-2">👑</span>}
                {abo}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Boutons */}
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

export default SideFilterPanel;
