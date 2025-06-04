import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const menuItems = ["Accueil", "Cours", "Contact"];
  const menuLinks = ["/", "/coursCollectifs", "/contact"];

  const location = useLocation();

  useEffect(() => {
    const index = menuLinks.findIndex((link) => location.pathname === link);
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname]);

  useEffect(() => {
    const current = menuRefs.current[activeIndex];
    if (current) {
      const rect = current.getBoundingClientRect();
      const containerRect = current.parentElement?.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - (containerRect?.left || 0),
        width: rect.width,
      });
    }
  }, [activeIndex]);

  return (
    <nav className=" fixed top-0 left-0 w-full h-[10vh] bg-black text-white px-10 py-4 flex justify-between items-center z-[10000]">
      <img src={logo} alt="Let It Muscle" className="h-12" />

      <ul className="relative hidden md:flex gap-10 text-base font-medium">
        {menuItems.map((item, index) => (
          <a
            key={item}
            href={menuLinks[index]}
            ref={(el) => (menuRefs.current[index] = el)}
            onClick={() => setActiveIndex(index)}
            className={`relative cursor-pointer transition-colors duration-300 ${
              activeIndex === index
                ? "text-[#ea7e38]"
                : "text-white hover:text-[#ea7e38]"
            }`}
          >
            {item}
          </a>
        ))}
        <span
          className="absolute bottom-[-4px] h-1 bg-[#ea7e38] transition-all duration-300"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      </ul>

      <Link
        to="/selection"
        className="bg-[#ea7e38] text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-300 hover:bg-[#d86c2d]"
      >
        S'inscrire
      </Link>
    </nav>
  );
};

export default Navbar;
