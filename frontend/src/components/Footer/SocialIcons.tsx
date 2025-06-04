import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="flex gap-4 items-center justify-center md:justify-start">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-[#3b5998] p-2 rounded-full hover:bg-[#3b5998] hover:text-white transition"
      >
        <FaFacebookF className="text-xl" />
      </a>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-[#e4405f] p-2 rounded-full hover:bg-[#e4405f] hover:text-white transition"
      >
        <FaInstagram className="text-xl" />
      </a>

      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-[#ff0000] p-2 rounded-full hover:bg-[#ff0000] hover:text-white transition"
      >
        <FaYoutube className="text-xl" />
      </a>

      <a
        href="https://tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-black p-2 rounded-full hover:bg-black hover:text-white transition"
      >
        <FaTiktok className="text-xl" />
      </a>
    </div>
  );
};

export default SocialIcons;
