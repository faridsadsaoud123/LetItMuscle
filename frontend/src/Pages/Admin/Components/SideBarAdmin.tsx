import React from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { MdDashboard} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { label: "Tableau de bord", icon: MdDashboard, path: "/admin/home" },
  {
    label: "Gestion des utilisateurs",
    icon: FaUsers,
    path: "/admin/utilisateurs",
  },
  { label: "Gestion des cours", icon: SiCoursera, path: "/admin/cours" },
  {
    label: "Gestion des abonnements",
    icon: FaTicketAlt,
    path: "/admin/abonnement",
  },
];

const SidebarAdmin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-80 z-40">
      {" "}
      <Card
        className="h-full w-full bg-black shadow-lg rounded-none"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <List
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="pt-24 px-4 space-y-1"
        >
          {sidebarItems.map(({ label, icon: Icon, path }) => (
            <ListItem
              key={label}
              onClick={() => navigate(path)}
              className={`text-white text-base font-medium flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer transition-all duration-300 ${
                location.pathname === path
                  ? "bg-orange-500"
                  : "hover:bg-orange-500/50"
              }`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ListItemPrefix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Icon className="h-6 w-6 text-white" />
              </ListItemPrefix>
              <span className="whitespace-nowrap">{label}</span>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default SidebarAdmin;
