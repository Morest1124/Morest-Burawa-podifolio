import React from "react";
import {
  FaReact,
  FaPython,
  FaDocker,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiDjango,
  SiJsonwebtokens,
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
  ];

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About me</h1>
          {/* <p>I build modern web apps and delightful UIs.</p> */}
          <p className="p-4">
            About Morest More than just a title—let’s dive deeper! I am a
            passionate Software Engineer with a knack for building full-stack
            web applications using modern technologies like React and Tailwind
            CSS. My journey in tech began with a curiosity for solving
            real-world problems through innovative solutions, which evolved into
            a love for crafting user-centric digital experiences. With a strong
            foundation in JavaScript frameworks, I focus on creating scalable,
            efficient, and visually appealing applications. Currently, I am
            diving deeper into backend development with Django to expand my
            skill set and deliver powerful, server-side solutions. Beyond
            coding, I thrive in collaborative environments and enjoy tackling
            challenging problems with creative solutions. I aim to contribute to
            impactful projects that make a difference in users' lives.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-lg shadow-md bg-gray-800"
                >
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <div>{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

