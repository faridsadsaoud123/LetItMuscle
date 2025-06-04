import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Visiteur/Homepage/Home";
import Login from "./Pages/Visiteur/Login/ui/Login";
import Inscription from "./Pages/Visiteur/Register/ui/Register";
import CoursCollectifs from "./Pages/Visiteur/CoursPage/CoursCollectifs";
import AjouterAbonnement from "./Pages/Admin/Abonnement/Abonnement";
import { AdAccueil } from "./Pages/Adherent/Home/AdAccueil";
import { AdVideos } from "./Pages/Adherent/Videos/ui/AdVideos";
import AdContact from "./Pages/Adherent/Contact/AdContact";
import HomeAdmin from "./Pages/Admin/Home/ui/HomeAdmin";
import CoursPage from "./Pages/Admin/Cours/CoursPage/CoursPage";
import Utilisateur from "./Pages/Admin/Utilisateurs/Utilisateur";
import LoginAdmin from "./Pages/Admin/Login/ui/LoginAdmin";
import Index from "./Pages/SelectionLogin";
import ProfilAdminPage from "./Pages/Admin/Profil/ProfilPage/ProfilAdminPage";
import RequireAuth from "./components/Auth/RequireAuth";
import Contact from "./Pages/Visiteur/Contact/Contact";

import { SmartRedirect } from "./hooks/SmartRedirect";


import Cours from "./Pages/Adherent/Cours/ui/Cours";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/selection", element: <Index /> },
      { path: "/coursCollectifs", element: <CoursCollectifs /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Inscription /> },
      { path: "/Contact", element: <Contact /> },
      { path: "/admin/login", element: <LoginAdmin /> },

      {
        path: "/admin/home",
        element: (
          <RequireAuth>
            <HomeAdmin />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/profil",
        element: (
          <RequireAuth>
            <ProfilAdminPage />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/cours",
        element: (
          <RequireAuth>
            <CoursPage />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/abonnement",
        element: (
          <RequireAuth>
            <AjouterAbonnement />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/utilisateurs",
        element: (
          <RequireAuth>
            <Utilisateur />
          </RequireAuth>
        ),
      },

      { path: "/redirect", element: <SmartRedirect /> },

      {
        path: "/adherent/accueil",
        element: (
          <RequireAuth>
            <AdAccueil />
          </RequireAuth>
        ),
      },
      {
        path: "/adherent/videos",
        element: (
          <RequireAuth>
            <AdVideos /> 
          </RequireAuth>
        ),
      },
      {
        path: "/adherent/reservationcours",
        element: (
          <RequireAuth>
            <Cours />
          </RequireAuth>
        ),
      },
      {
        path: "/adherent/Contact",
        element: (
          <RequireAuth>
            <AdContact />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
