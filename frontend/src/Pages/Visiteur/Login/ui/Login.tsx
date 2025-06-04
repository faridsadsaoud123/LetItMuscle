import React from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../../../utils/jwtUtils";

import Navbar from "../../../../components/Navbar";
import BackgroundImageCover from "../../../../components/BackgroundImageCover";
import { useLoginProvider } from "../hooks/useLoginProvider";
import LoginForm from "../Components/LoginForm";

import LoginCover from "../../../../assets/LoginCover.png";
import LogoBlanc from "../../../../assets/LogoBlanc.png";
const Login: React.FC = () => {
  const [loginError, setLoginError] = React.useState(false);
  const loginMutation = useLoginProvider();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          const decoded = parseJwt(data.token);

          const role =
            decoded?.role ||
            decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

          if (!role) {
            console.error("Rôle introuvable dans le token.");
            return;
          }

          if (role === "Admin") {
            navigate("/admin/home");
          } else {
            navigate("/adherent/accueil");
          }
        },
        onError: () => {
          setLoginError(true);
        },
      }
    );
  };

  return (
    <div 
      className="login-page min-h-screen flex flex-col" 
      style={{ "--bg-image": `url(${LoginCover})` } as React.CSSProperties}
    >
      <Navbar />

      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 py-8">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="glass-effect rounded-xl p-8 w-full max-w-md shadow-lg">
            <LoginForm
              onSubmit={handleLogin}
              isLoading={loginMutation.isPending}
              error={loginError}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-md flex justify-center items-center p-4">
            <img
              src={LogoBlanc}
              alt="Logo"
              className="w-full max-w-md object-contain animate-pulse-slow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;