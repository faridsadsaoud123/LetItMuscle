import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/outline";
import logo from "../../../assets/logo.svg";
import account from "../../../assets/account.png";
import { useHomeProvider } from "../Home/hooks/useHomeProvider";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircle, Bell, LogOut } from "lucide-react";
const ComplexNavbar: React.FC = () => {
  const { data: user, isLoading, isError } = useHomeProvider();

  if (isLoading) {
    return (
      <Navbar className="bg-black px-6 py-3 w-full">
        <p className="text-white">Chargement...</p>
      </Navbar>
    );
  }

  if (isError || !user) {
    return (
      <Navbar className="bg-black px-6 py-3 w-full">
        <p className="text-red-500">Erreur lors du chargement du profil</p>
      </Navbar>
    );
  }

  return (
    <Navbar className="bg-black px-6 py-3 flex justify-between items-center rounded-none w-full border-b border-black">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-20" />
      </div>

      <div className="flex items-center gap-6">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 focus:outline-none">
            <Avatar
              src={account}
              alt="avatar"
              className="h-14 w-14 rounded-full border border-gray-700"
            />
            <div className="flex flex-col text-left">
              <Typography className="text-gray-400 text-xs">
                {user.role}
              </Typography>
              <Typography className="text-white text-sm font-medium">
                {user.prenom}{" "}
                <span className="text-orange-400">{user.nom}</span>
              </Typography>
            </div>
          </Menu.Button>

          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 bg-orange-500  rounded-lg shadow-lg z-50 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/redirect"
                    className={`flex items-center gap-3 px-4 py-3 text-white text-sm hover:rounded-lg hover:bg-orange-600 ${
                      active && "bg-orange-600"
                    }`}
                  >
                    <UserCircle className="w-5 h-5" />
                    Mon profil
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/login";
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-white hover:rounded-lg text-sm w-full text-left hover:bg-orange-600 ${
                      active && "bg-orange-600"
                    }`}
                  >
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </Navbar>
  );
};

export default ComplexNavbar;
