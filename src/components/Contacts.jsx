import React from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";

export default function Contacts() {
  const contacts = [
    {
      icon: <FaMapMarkerAlt />,
      text: "Centurion, Gauteng, South Africa",
    },
    {
      icon: <FaPhone />,
      text: "+27 69 245 2411",
      href: "tel:+27692452411",
    },
    {
      icon: <FaEnvelope />,
      text: "morestburawa05@gmail.com",
      href: "mailto:morestburawa05@gmail.com",
    },
    {
      icon: <FaLinkedin />,
      text: "linkedin.com/in/morest-burawa",
      href: "https://linkedin.com/in/morest-burawa",
    },
    {
      icon: <FaGithub />,
      text: "github.com/Morest1124",
      href: "https://github.com/Morest1124",
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Contact Me</h1>
        <ul className="space-y-4 text-lg">
          {contacts.map((contact, index) => (
            <li key={index} className="flex items-center justify-center">
              <span className="mr-4 text-accent">{contact.icon}</span>
              {contact.href ? (
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {contact.text}
                </a>
              ) : (
                <span>{contact.text}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
