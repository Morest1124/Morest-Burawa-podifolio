import { formatTextWithNumbers } from "../utils/formatTextWithNumbers";
import React, { useState } from "react";
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch(`https://BinaryBlade24.pythonanywhere.com/api/contact-submissions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="mb-8 text-gray-300">
            Have a project in mind, a question, or just want to say hello? Drop me a line or find me on social media.
          </p>
          <ul className="space-y-4 text-lg">
            {contacts.map((contact, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-4 text-accent">{contact.icon}</span>
                {contact.href ? (
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    {formatTextWithNumbers(contact.text)}
                  </a>
                ) : (
                  <span>{formatTextWithNumbers(contact.text)}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
              ></textarea>
            </div>
            
            <div>
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full btn-accent px-4 py-3 rounded font-semibold transition disabled:bg-gray-600"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {status === 'success' && (
              <p className="mt-4 text-green-500">Message sent successfully! Thank you.</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-500">Something went wrong. Please try again later.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
