import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SmartRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("🔐 Token =", token);
    console.log("👤 Rôle =", role);

    if (!token) {
      navigate("/");
    } else if (role === "Admin") {
      navigate("/admin/profil");
    } else {
      navigate("/adherent/accueil");
    }
  }, [navigate]);

  return null;
};
