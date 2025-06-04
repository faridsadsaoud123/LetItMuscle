import ComplexNavbar from "../../Components/NavbarAdmin";
import SidebarAdmin from "../../Components/SideBarAdmin";
import { useHomeProvider } from "../hooks/useHomeProvider";
import DashboardContent from "../../Components/Dashboard";

const HomeAdmin = () => {
  const { data: user, isLoading, isError } = useHomeProvider();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500" />
      </div>
    );

  if (isError || !user)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">
          Erreur lors du chargement du profil
        </p>
      </div>
    );

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <ComplexNavbar />
      </div>

      <div className="fixed top-20 left-0 w-80 h-[calc(100vh-80px)] z-40">
        <SidebarAdmin />
      </div>

      <main className="ml-80 mt-20 w-[calc(100%-20rem)] h-[calc(100vh-80px)] overflow-y-auto p-6 bg-white">
        <div className="space-y-6 mt-6">
          <DashboardContent />
        </div>
      </main>
    </div>
  );
};

export default HomeAdmin;
