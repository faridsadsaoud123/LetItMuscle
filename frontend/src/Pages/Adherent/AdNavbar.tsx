import React, { useEffect, useRef, useState, Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useHomeProvider } from "../Admin/Home/hooks/useHomeProvider";
import { Menu, Transition } from "@headlessui/react";
import { LogOut, UserCircle } from "lucide-react";

const AdNavbar: React.FC = () => {
  const location = useLocation();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const navLinks = [
    { label: "Accueil", href: "/adherent/accueil" },
    { label: "Réservation de cours", href: "/adherent/reservationcours" },
    { label: "Entrainements Vidéo", href: "/adherent/videos" },
    {
      label: "Recettes",
      href: "https://www.canva.com/design/DAGlIBDwCsc/vUCovyw4io1zXZkZfd8VNA/view?utm_content=DAGlIBDwCsc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h750ef83fd4",
      external: true,
    },
    { label: "Contact", href: "/adherent/Contact" },
  ];

  useEffect(() => {
    const activeLink = document.querySelector(
      ".nav-link-active"
    ) as HTMLElement;
    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    }
  }, [location.pathname]);

  const { data: user, isLoading, isError } = useHomeProvider();

  return (
    <nav className="bg-black fixed z-50 top-0 left-0 w-full h-[10vh] text-white px-10 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Let It Muscle" className="h-12" />
      </div>

      <div className="relative hidden md:flex gap-10 font-medium text-base items-center">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            className={`relative pb-2 transition-colors duration-300 ${
              location.pathname === href
                ? "nav-link-active text-white font-bold"
                : "hover:text-[#ea7e38]"
            }`}
          >
            {label}
          </Link>
        ))}
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-1 bg-[#ea7e38] rounded-full transition-all duration-300 ease-in-out"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      </div>

      <div className="hidden md:flex items-center gap-2">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 focus:outline-none">
            <UserCircle className="w-7 h-7 text-[#ea7e38]" />
            <div className="flex flex-col text-left">
              <span className="text-sm">Bonjour</span>
              <span className="font-semibold text-sm text-[#ea7e38]">
                {user?.prenom} {user?.nom}
              </span>
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-[#ea7e38] rounded-lg shadow-lg z-50">
              <Menu.Item>
                {({ active }) => (
                  <a href="/redirect"
                    className={`flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-orange-600 rounded-t-lg ${
                      active && "bg-orange-600"
                    }`}
                  >
                    <UserCircle className="w-4 h-4" />
                    Mon profil
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/";
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-sm text-white w-full text-left hover:bg-orange-600 rounded-b-lg ${
                      active && "bg-orange-600"
                    }`}
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default AdNavbar;
