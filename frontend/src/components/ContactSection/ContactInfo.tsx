import { Phone, Mail, Clock, ArrowDown } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center space-y-12">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center">
            <Phone className="mr-2 h-5 w-5" />
            <span>Téléphone : +33 (0) 1 23 45 67 89</span>
          </div>

          <div className="flex items-center justify-center">
            <Mail className="mr-2 h-5 w-5" />
            <span>Email : support@letitsport.com</span>
          </div>

          <div className="flex items-center justify-center">
            <Clock className="mr-2 h-5 w-5" />
            <span>Disponibilité : du lundi au vendredi de 9h à 22h</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <ArrowDown className="h-16 w-16 text-orange-500" />

          <div className="bg-white text-orange-500 py-3 px-8 inline-block rounded">
            <p className="font-medium text-center">
              Avant de nous contacter, consultez notre FAQ !
            </p>
          </div>

          <ArrowDown className="h-16 w-16 text-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
