import { Outlet } from "react-router-dom";
import AdNavbar from "../../../Pages/Adherent/AdNavbar";
import Footer from "../../../components/Footer/Footer";

const AdherentLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <AdNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdherentLayout;
