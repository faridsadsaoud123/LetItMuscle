import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer/Footer";

const VisiteurLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default VisiteurLayout;
