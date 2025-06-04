import React from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../../../utils/jwtUtils";

import Navbar from "../../../../components/Navbar";
import { useLoginProvider } from "../../../Visiteur/Login/hooks/useLoginProvider";
import LoginAdminForm from "../Components/LoginAdminForm";

import LoginCover from "../../../../assets/LoginCover.png";
import LogoBlanc from "../../../../assets/LogoBlanc.png";

const LoginAdmin: React.FC = () => {
  const [loginError, setLoginError] = React.useState(false);
  const [roleError, setRoleError] = React.useState(false);
  const loginMutation = useLoginProvider();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    setLoginError(false);
    setRoleError(false);

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          const decoded = parseJwt(data.token);

          const role =
            decoded?.role ||
            decoded?.[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

          if (!role) {
            console.error("Rôle introuvable dans le token.");
            setLoginError(true);
            return;
          }

          localStorage.setItem("role", role);

          if (role === "Admin") {
            navigate("/admin/home");
          } else {
            localStorage.removeItem("token");
            setRoleError(true);
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
            <LoginAdminForm
              onSubmit={handleLogin}
              isLoading={loginMutation.isPending}
              error={loginError || roleError}
            />

            {roleError && (
              <p className="text-xl text-red-500 mt-4 text-center">
                Accès refusé : seuls les administrateurs peuvent se connecter
                ici.
              </p>
            )}
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

export default LoginAdmin;
