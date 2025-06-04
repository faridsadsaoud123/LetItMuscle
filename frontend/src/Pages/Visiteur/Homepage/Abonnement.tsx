import { useAbonnements } from "./hooks/useAbonnements";
import point from "../../../assets/point.png";

const Abonnement = () => {
  const { data: abonnements, isLoading } = useAbonnements();
  // console.log("Abonnements récupérés :", abonnements);

  if (isLoading)
    return (
      <div className="text-white text-center">
        Chargement des abonnements...
      </div>
    );

  return (
    <div className="w-screen min-h-[90vh] relative flex flex-col text-white font-[Poppins]">
      <h1 className="w-full text-center py-2 text-[20px] font-extrabold relative">
        Nos Abonnement
        <span className="absolute top-[40px] left-1/2 transform -translate-x-1/2 w-[150px] h-[3px] bg-[#fc8436] rounded-full"></span>
      </h1>

      <div className="flex w-full h-full p-2.5">
        <div className="flex-1 flex flex-col items-center justify-center text-[15px]">
          <h2 className="text-[20px] font-semibold mb-2 mt-5">
            Choisis ton plan
          </h2>
          <p className="text-[12px] font-light leading-loose w-4/5 text-justify">
            Découvrez nos formules d'abonnement conçues pour répondre à tous les
            besoins et tous les budgets. Que vous soyez débutant ou confirmé,
            que vous recherchiez un suivi personnalisé ou une pratique en
            autonomie, nous avons l'abonnement idéal pour vous.
          </p>
        </div>

        {abonnements?.map((abonnement) => {
          let options: string[] = [];
          console.log(
            `OptionsAbonnement pour ${abonnement.nomAbonnement} :`,
            abonnement.optionsAbonnement
          );

          try {
            options = JSON.parse(abonnement.optionsAbonnement);
          } catch {
            options = abonnement.optionsAbonnement.split(",");
          }

          const isPremium = abonnement.nomAbonnement
            .toLowerCase()
            .includes("premium");

          return (
            <div
              key={abonnement.id}
              className={`flex-1 ${
                isPremium ? "" : "bg-[#fc8436]"
              } flex flex-col items-center justify-start w-full h-full gap-2.5`}
            >
              <h2 className="text-[20px] font-semibold mb-2 mt-5">
                {abonnement.nomAbonnement}
              </h2>
              <h3 className="text-[15px] font-medium">
                {abonnement.tarif}€/mois
              </h3>

              <ul className="flex flex-col gap-4 mt-[10%]">
                {options.map((option, index) => (
                  <li key={index} className="flex items-center">
                    <img
                      src={point}
                      alt="point"
                      className="w-[18px] h-[13px] mr-4"
                    />
                    <span className="text-[15px] font-light">
                      {option.trim()}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-auto px-4 py-2 mb-4 rounded-lg text-[15px] font-medium transition-all duration-300 border-2 border-transparent ${
                  isPremium
                    ? "bg-[#fc8436] text-white hover:bg-[#0a0a0a] hover:border-[#fc8436]"
                    : "bg-[#0a0a0a] text-[#fc8436] hover:bg-[#fc8436] hover:text-black hover:border-[#0a0a0a]"
                }`}
              >
                <a href="/register">
                  Choisir l'abonnement {abonnement.nomAbonnement}
                </a>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Abonnement;
