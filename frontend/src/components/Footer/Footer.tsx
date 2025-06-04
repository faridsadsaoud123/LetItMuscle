import FooterColumn from "./FooterColumn";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="w-screen h-[40vh] bg-[#ea7e38] flex justify-center items-center relative z-[9] mt-[10px]">
      <div className="w-full max-w-[1641px] h-full flex">
        <div className="flex flex-col items-center justify-center gap-2.5 flex-1 w-full h-full bg-[#231f20]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bf1dbde5c0dc1736bacb291c1aff98302d69354"
            alt="Company Logo"
            className="w-1/2 h-1/2 object-contain"
          />
          <SocialIcons />
        </div>

        <nav className="flex-[3] grid grid-cols-3 gap-12 items-start pt-5 pl-[50px] text-[15px]">
          <FooterColumn
            title="Navigation et informations utiles"
            links={[
              { label: "Plan du site", href: "/Contact" },
              { label: "FAQ", href: "/Contact" },
              { label: "Mentions légales", href: "#" },
            ]}
          />
          <FooterColumn
            title="Fonctionnalités et services"
            links={[
              { label: "Types d'abonnements", href: "/" },
              { label: "Cours collectifs", href: "/coursCollectifs" },
              { label: "Coaching en ligne", href: "/coursCollectifs" },
            ]}
          />
          <FooterColumn
            title="Appels à l'action"
            links={[
              { label: "S'inscrire / Se connecter", href: "/selection" },
              { label: "Contact", href: "/Contact" },
            ]}
          />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
