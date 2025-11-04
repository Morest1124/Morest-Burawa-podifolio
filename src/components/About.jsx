import React from "react";
import {
  FaReact,
  FaPython,
  FaDocker,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaPaintBrush,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiDjango,
  SiJsonwebtokens,
  SiMysql,
  SiSwagger,
  SiAdobeillustrator,
  SiAdobephotoshop,
} from "react-icons/si";

export default function About() {
  const techStack = [
    { name: "React", icon: <FaReact /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "Python", icon: <FaPython /> },
    { name: "Django", icon: <SiDjango /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "Swagger", icon: <SiSwagger /> },
    { name: "Illustrator", icon: <SiAdobeillustrator /> },
    { name: "Photoshop", icon: <SiAdobephotoshop /> },
    { name: "Graphic Design", icon: <FaPaintBrush /> },
  ];

  const workExperience = [
    {
      role: "Data Entry Intern",
      company: "AFGRI Centurion, Gauteng",
      period: "May 2024 - July 2024",
      description:
        "Compiled and analysed a comprehensive 5-year summary for multiple companies, enhancing data reporting and presentation accuracy by 90% using Microsoft Office tools.",
    },
    {
      role: "Data Entry part-time",
      company: "Nalo Careers – Murrayfield, Pretoria",
      period: "April 2025 - May 2025",
      description:
        "Collaborated in a team of 6 to register over 5,000 students for a game competition within a tight one-week deadline, resulting in a significant time savings of 2 weeks for the company.",
    },
    {
      role: "Data Entry part-time",
      company:
        "The South African Institute of Professional Accountings, Pretoria",
      period: "May 2025 - May 2025",
      description: "Data Capturing from 800 documents, compiling it in Excel",
    },
    {
      role: "Graphic Design",
      company: "Centurion",
      period: "August 2025 - October 2025",
      description:
        "Logo design for a gas company supplying the whole Township. Brand development and execution created and implemented the brand identity for a dual-category retail business",
    },
  ];

  return (
    <section id="about" className="py-20 bg-black/20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                      <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-gray-700 h-full">
                        <h3 className="text-3xl font-bold mb-6">Work Experience</h3>
                        <div className="relative border-l-2 border-gray-700 pl-4"> 
                          {workExperience.map((job, index) => (
                            <div key={index} className="mb-8 ml-4"> 
                              <div className="absolute w-4 h-4 bg-gray-400 rounded-full -left-2 border-2 border-gray-900"></div>
                              <p className="text-sm text-gray-400 font-numeric">{job.period}</p> 
                              <h4 className="text-xl font-semibold">{job.role}</h4>
                              <p className="text-md font-medium text-gray-300">{job.company}</p>
                              <p className="mt-2 text-gray-400">{job.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                      <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-gray-700 h-full">
                        <h3 className="text-3xl font-bold mb-6">Tech Stack</h3>
                        <div className="flex flex-wrap justify-center">
                          {techStack.map((tech, index) => (
                            <div key={index} className="flex items-center bg-gray-800/20 rounded-lg p-4 m-2 border border-gray-700"> 
                              <div className="text-3xl mr-4">{tech.icon}</div>
                              <span className="text-lg">{tech.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>        </div>
      </div>
    </section>
  );
}