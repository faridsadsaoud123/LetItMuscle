import { useRef } from "react";
import emailjs from "emailjs-com";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import logo from "../../assets/LogoBlanc.png";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_jekyitv",
        "template_i04kbjj",
        formRef.current,
        "dShlXRVN3VgrShKmE"
      )
      .then(
        () => {
          alert("Message envoyé avec succès !");
          formRef.current?.reset();
        },
        (error) => {
          alert("Erreur lors de l'envoi.");
          console.error(error);
        }
      );
  };

  return (
    <div className="bg-black p-6 rounded-lg relative">
      <div className="mb-10 flex justify-center">
        <img
          src={logo}
          alt="Let It Muscle"
          className="w-40 h-40 object-contain"
        />
      </div>

      <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-2">
            Nom
          </label>
          <Input
            name="from_name"
            id="name"
            placeholder="Votre nom"
            className="bg-white text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <Input
            name="reply_to"
            id="email"
            type="email"
            placeholder="xyz@gmail.com"
            className="bg-white text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2">
            Message
          </label>
          <Textarea
            name="message"
            id="message"
            placeholder="Votre message"
            className="min-h-[160px] bg-white text-black"
            required
          />
        </div>

        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            className="bg-orange-500 text-white px-12 py-3 text-lg font-bold uppercase tracking-wider rounded-none"
          >
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
