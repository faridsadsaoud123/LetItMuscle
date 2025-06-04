import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Alert } from "../../../../components/ui/Alert";

const schema = z
  .object({
    ancien: z.string().min(6, "Mot de passe requis"),
    nouveau: z.string().min(6, "Mot de passe trop court"),
    confirmation: z.string().min(6, "Confirmation requise"),
  })
  .refine((data) => data.nouveau === data.confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmation"],
  });

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangerMotDePasseModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setErreur("");
    setSuccess("");

    try {
      await axios.post(
        "http://localhost:5050/api/auth/change-password",
        {
          oldPassword: data.ancien,
          newPassword: data.nouveau,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("✅ Mot de passe modifié avec succès !");
      reset();

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      if (
        error?.response?.status === 400 &&
        typeof error?.response?.data === "string"
      ) {
        setErreur(error.response.data);
      } else {
        setErreur("❌ Erreur lors de la modification du mot de passe.");
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
        aria-hidden="true"
      />

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <Dialog.Panel className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4">
            🔐 Modifier mon mot de passe
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="ancien"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Ancien mot de passe
              </label>
              <Input id="ancien" type="password" {...register("ancien")} />
              {errors.ancien && (
                <p className="text-red-500 text-sm">{errors.ancien.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="nouveau"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Nouveau mot de passe
              </label>
              <Input id="nouveau" type="password" {...register("nouveau")} />
              {errors.nouveau && (
                <p className="text-red-500 text-sm">{errors.nouveau.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="confirmation"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Confirmer le mot de passe
              </label>
              <Input
                id="confirmation"
                type="password"
                {...register("confirmation")}
              />
              {errors.confirmation && (
                <p className="text-red-500 text-sm">
                  {errors.confirmation.message}
                </p>
              )}
            </div>

            {erreur && <Alert variant="destructive">{erreur}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <div className="flex justify-end gap-2">
              <Button type="button" onClick={onClose} variant="ghost">
                Annuler
              </Button>
              <Button type="submit">Changer</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ChangerMotDePasseModal;
