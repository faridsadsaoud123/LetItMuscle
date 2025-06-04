import * as React from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <section className="flex flex-col gap-6 px-2.5 py-2.5">
      <h3 className="text-[#0a0a0a] font-[Poppins] text-[15px] font-extrabold">
        {title}
      </h3>
      <ul className="flex flex-col gap-4 list-none m-0 p-0">
        {links.map((link, index) => (
          <li
            key={index}
            className="text-white font-[Poppins] text-[15px] font-medium cursor-pointer hover:underline"
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FooterColumn;
