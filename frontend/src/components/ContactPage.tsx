import ContactForm from "./ContactSection/ContactForm";
import ContactInfo from "./ContactSection/ContactInfo";
import FAQ from "./ContactSection/FAQ";

const ContactPage = () => {
  return (
    <>
      <section className="py-16 relative bg-black text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Contactez-nous
            <div className="h-1 w-48 bg-orange-500 mx-auto mt-2"></div>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            FAQ - Vos questions, nos réponses
            <div className="h-1 w-72 bg-orange-500 mx-auto mt-2"></div>
          </h2>
          <FAQ />
        </div>
      </section>
    </>
  );
};

export default ContactPage;
