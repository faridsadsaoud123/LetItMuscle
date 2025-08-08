import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../../../components/Navbar";
import LoginCover from "../../../../assets/LoginCover.jpg";
import LogoBlanc from "../../../../assets/LogoBlanc.png";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { Alert } from "../../../../components/ui/Alert";
import { useRegisterProvider } from "../hooks/useRegisteProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AbonnementSelector from "../components/AbonnementSelector";
import { useGetUtilisateurs } from "../../../Admin/Utilisateurs/hooks/useGetUtilisateurs";

// ✅ Zod Schema
const registerSchema = z
  .object({
    nom: z.string().min(1, "Le nom est requis").regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Le nom ne doit contenir que des lettres"),
    prenom: z.string().min(1, "Le prénom est requis").regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Le prénom ne doit contenir que des lettres"),
    email: z.string().email("Email invalide"),
    login: z.string().min(1, "Le login est requis").regex(/^\S+$/, "Le login ne doit pas contenir d'espace"),
    password: z.string().min(6, "Mot de passe trop court"),
    confirmPassword: z.string().min(6, "Confirmation requise"),
    numTel: z.string().regex(/^[0-9]{10}$/, "Numéro invalide (10 chiffres sans +)"),
    dateDeNaissance: z.string().min(1, "Date de naissance requise"),
    abonnementInscritId: z.number({ required_error: "Veuillez sélectionner un abonnement" }).nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })
  .refine((data) => data.abonnementInscritId !== null, {
    message: "Veuillez sélectionner un abonnement",
    path: ["abonnementInscritId"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      abonnementInscritId: null,
    },
  });

  const registerMutation = useRegisterProvider();
  const { data: utilisateurs = [] } = useGetUtilisateurs();
  const [isLoading, setIsLoading] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    const emailExiste = utilisateurs.some(
      (u) => u.email === data.email && u.role === "AdherentStandard"
    );

    if (emailExiste) {
      setError("email", {
        type: "manual",
        message: "Cette adresse email est déjà utilisée par un adhérent.",
      });
      return;
    }

    try {
      setIsLoading(true);
      await registerMutation.mutateAsync(data); // <- suppose que c'est une mutation asynchrone
      setRegisterSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // Redirection après succès
    } catch (error) {
      console.error("Erreur d'inscription :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${LoginCover})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12">
          <div className="w-full lg:w-3/4 flex justify-center">
            <div className="glass-effect rounded-xl p-8 w-full max-w-4xl shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Pour créer <span className="text-brand-orange">ton compte</span>
              </h2>

              <div className="flex flex-col space-y-4 mb-6">
                <Button variant="outline" size="lg" className="bg-white text-black hover:bg-gray-100 border-0">
                  <FaGoogle className="mr-2 text-blue-600" />
                  S'inscrire avec Google
                </Button>
                <Button variant="outline" size="lg" className="bg-white text-black hover:bg-gray-100 border-0">
                  <FaApple className="mr-2 text-black" />
                  S'inscrire avec Apple
                </Button>
              </div>

              <div className="relative flex items-center my-8">
                <div className="flex-grow border-t border-white/30"></div>
                <span className="mx-4 text-gray-300 text-sm">Ou continuer avec</span>
                <div className="flex-grow border-t border-white/30"></div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Input id="nom" label="Nom" labelColor="text-white" {...register("nom")} />
                    {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Input id="prenom" label="Prénom" labelColor="text-white" {...register("prenom")} />
                    {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Input id="login" label="Nom d'utilisateur" labelColor="text-white" {...register("login")} />
                    {errors.login && <p className="text-red-500 text-sm">{errors.login.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Input id="dateDeNaissance" type="date" label="Date de naissance" labelColor="text-white" {...register("dateDeNaissance")} />
                    {errors.dateDeNaissance && <p className="text-red-500 text-sm">{errors.dateDeNaissance.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Input id="email" type="email" label="Adresse email" labelColor="text-white" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Input id="numTel" label="Numéro de téléphone" labelColor="text-white" {...register("numTel")} />
                    {errors.numTel && <p className="text-red-500 text-sm">{errors.numTel.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input id="password" type="password" label="Mot de passe" labelColor="text-white" {...register("password")} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Input id="confirmPassword" type="password" label="Confirmer votre mot de passe" labelColor="text-white" {...register("confirmPassword")} />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Choisir un abonnement</label>
                  <AbonnementSelector
                    selectedId={watch("abonnementInscritId")}
                    onSelect={(id) => setValue("abonnementInscritId", id)}
                  />
                  {errors.abonnementInscritId && <p className="text-red-500 text-sm mt-1">{errors.abonnementInscritId.message}</p>}
                </div>

                <div className="flex flex-col items-center gap-4 mt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? "Chargement..." : "S'inscrire"}
                  </Button>

                  {registerSuccess && (
                    <Alert variant="success" className="animate-fadeIn">
                      ✅ Inscription réussie ! Redirection en cours...
                    </Alert>
                  )}

                  <a href="/" className="text-white text-sm hover:text-brand-orange hover:underline transition-colors">
                    J'ai déjà un compte !
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-1/4 justify-center items-center">
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
    </div>
  );
};

export default Register;
