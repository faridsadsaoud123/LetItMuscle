import React from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../../../utils/jwtUtils";

import Navbar from "../../../../components/Navbar";
import { useLoginProvider } from "../hooks/useLoginProvider";
import LoginForm from "../Components/LoginForm";
import { useState } from "react";
import LoginCover from "../../../../assets/LoginCover.png";
import LogoBlanc from "../../../../assets/LogoBlanc.png";

const Login: React.FC = () => {
  const [loginError, setLoginError] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
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
      
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 min-h-[calc(100vh-5rem)]">
          {/* Login Form */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <LoginForm 
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={loginError}
            />
          </div>

          {/* Logo Section */}
          <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
            <div className="relative w-full max-w-md flex flex-col justify-center items-center p-8">
              <img
                src={LogoBlanc}
                alt="Fitness Logo"
                className="w-120 h-120 mb-6 animate-pulse-slow"
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;