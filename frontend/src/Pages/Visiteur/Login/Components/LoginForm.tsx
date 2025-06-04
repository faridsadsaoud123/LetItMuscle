import React, { useState } from "react";
import { z } from "zod";
import { FaGoogle, FaApple } from "react-icons/fa";

import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { Alert } from "../../../../components/ui/Alert";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setShowError(error);
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors: any = {};
      result.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    onSubmit(email, password);
  };

  return (
    <div className="w-full max-w-md mx-auto glass-effect p-8 rounded-xl">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Démarrez votre parcours{" "}
        <span className="text-brand-orange">bien-être</span>
      </h2>

      <div className="flex flex-col space-y-4 mb-6">
        <Button
          variant="social"
          size="full"
          className="bg-white text-foreground hover:bg-gray-100"
        >
          <FaGoogle className="mr-2 text-blue-600" />
          Se connecter avec Google
        </Button>
        <Button
          variant="social"
          size="full"
          className="bg-white text-foreground hover:bg-gray-100"
        >
          <FaApple className="mr-2 text-black" />
          Se connecter avec Apple
        </Button>
      </div>

      <div className="relative flex items-center my-8">
        <div className="flex-grow border-t border-white/30"></div>
        <span className="mx-4 text-gray-300 text-sm">Ou continuer avec</span>
        <div className="flex-grow border-t border-white/30"></div>
      </div>

      {showError && (
        <Alert
          variant="destructive"
          onClose={() => setShowError(false)}
          className="mb-4 animate-fadeIn"
        >
          Identifiants invalides. Veuillez réessayer.
        </Alert>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Adresse Email"
          type="email"
          placeholder="xyz@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelColor="text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm -mt-2">{errors.email}</p>
        )}

        <Input
          id="password"
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          labelColor="text-white"
        />
        {errors.password && (
          <p className="text-red-500 text-sm -mt-2">{errors.password}</p>
        )}

        <div className="flex justify-end">
          <a
            href="#"
            className="text-white text-sm hover:underline transition-colors"
          >
            Mot de passe oublié ?
          </a>
        </div>

        <div className="pt-4 space-y-4">
          <Button
            type="submit"
            disabled={isLoading}
            size="full"
            className="transition-transform hover:scale-105"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="full"
            onClick={() => navigate("/register")}
            className="text-white border-white/50 hover:bg-white/10 transition-transform hover:scale-105"
          >
            Créer un compte
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
