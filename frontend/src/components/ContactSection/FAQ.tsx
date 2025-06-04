import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Quels types d'abonnements proposez-vous ?",
      answer:
        "Nous proposons plusieurs formules d'abonnements adaptées à tous les besoins : mensuel, trimestriel et annuel. Chaque formule inclut l'accès aux équipements et aux cours collectifs. Des options premium sont également disponibles pour accéder à des services supplémentaires.",
    },
    {
      question: "Puis-je consulter vos tarifs en ligne ?",
      answer:
        "Oui, tous nos tarifs sont consultables en ligne dans la section 'Abonnements' de notre site. Vous y trouverez le détail de chaque formule ainsi que les options disponibles. N'hésitez pas à nous contacter pour plus d'informations.",
    },
    {
      question:
        "Offrez-vous des réductions pour les étudiants ou les seniors ?",
      answer:
        "Absolument ! Nous proposons des tarifs préférentiels pour les étudiants et les seniors. Sur présentation d'un justificatif valide, vous pouvez bénéficier d'une réduction sur votre abonnement.",
    },
    {
      question: "Quels types de cours proposez-vous ?",
      answer:
        "Notre salle propose une grande variété de cours : yoga, pilates, HIIT, zumba, spinning, musculation guidée et bien d'autres. Consultez notre planning hebdomadaire pour découvrir l'ensemble des cours disponibles.",
    },
    {
      question: "Avez-vous des cours adaptés aux débutants ?",
      answer:
        "Tout à fait ! Nos cours sont accessibles à tous les niveaux, y compris les débutants. Nos coachs sont formés pour adapter les exercices à chaque pratiquant. N'hésitez pas à signaler que vous débutez, et ils vous guideront avec une attention particulière.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="max-w-3xl mx-auto">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-orange-500"
        >
          <AccordionTrigger className="text-left text-lg font-medium py-4 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-md mb-2">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-300">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;
