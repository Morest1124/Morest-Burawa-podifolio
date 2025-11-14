import { formatTextWithNumbers } from "../utils/formatTextWithNumbers";
import React, { useState, useEffect } from "react";
import {
  FaReact, FaPython, FaDocker, FaHtml5, FaCss3Alt, FaGitAlt, FaPaintBrush,
} from "react-icons/fa";
import {
  SiJavascript, SiTailwindcss, SiDjango, SiJsonwebtokens, SiMysql, SiSwagger, SiAdobeillustrator, SiAdobephotoshop,
} from "react-icons/si";

// Icon mapping
const iconMap = {
  React: <FaReact />,
  JavaScript: <SiJavascript />,
  HTML5: <FaHtml5 />,
  CSS3: <FaCss3Alt />,
  Python: <FaPython />,
  Django: <SiDjango />,
  Docker: <FaDocker />,
  "Tailwind CSS": <SiTailwindcss />,
  MySQL: <SiMysql />,
  Git: <FaGitAlt />,
  Swagger: <SiSwagger />,
  Illustrator: <SiAdobeillustrator />,
  Photoshop: <SiAdobephotoshop />,
  "Graphic Design": <FaPaintBrush />,
};

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [workExperience, setWorkExperience] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, workRes, skillsRes] = await Promise.all([
          fetch("https://binaryblade24.pythonanywhere.com/api/about/"),
          fetch("https://binaryblade24.pythonanywhere.com/api/work-experience/"),
          fetch("https://binaryblade24.pythonanywhere.com/api/skills/"),
        ]);

        if (!aboutRes.ok || !workRes.ok || !skillsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const about = await aboutRes.json();
        const work = await workRes.json();
        const skills = await skillsRes.json();

        setAboutData(about[0]); 
        setWorkExperience(work);
        setTechStack(skills);

      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch about page data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <section id="about" className="min-h-screen flex items-center justify-center"><p>Loading...</p></section>;
  }

  if (error) {
    return <section id="about" className="min-h-screen flex items-center justify-center"><p className="text-red-500">Error: {error}</p></section>;
  }

  return (
    <section id="about" className="py-20 bg-black/20 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{aboutData?.tagline || "What I do"}</h2>
          <p className="max-w-3xl mx-auto text-gray-300">
            {aboutData?.bio || "I am a dedicated Software Engineer..."}
          </p>
          <a href="#mywork" className="inline-block btn-accent mt-6 px-6 py-2 rounded font-semibold">
            See case studies
          </a>
        </div>

        <hr className="border-gray-700 my-12" />

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-gray-700 h-full">
              <h3 className="text-3xl font-bold mb-6 text-center">Work Experience</h3>
              <div className="relative border-l-2 border-gray-700 pl-4">
                {workExperience.map((job, index) => (
                  <div key={index} className="mb-8 ml-4">
                    <div className="absolute w-4 h-4 bg-gray-400 rounded-full -left-2 border-2 border-gray-900"></div>
                    <p className="text-sm text-gray-400">
                      {formatTextWithNumbers(job.years)}
                    </p>
                    <h4 className="text-xl font-semibold">{job.title}</h4>
                    <p className="text-md font-medium text-gray-300">
                      {job.company}
                    </p>
                    <p className="mt-2 text-gray-400">
                      {formatTextWithNumbers(job.responsibilities)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-gray-700 h-full">
              <h3 className="text-3xl font-bold mb-6 text-center">Tech Stack</h3>
              <div className="flex flex-wrap justify-center">
                {techStack.filter(s => s.is_key_skill).map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-800/20 rounded-lg p-4 m-2 border border-gray-700 transform transition-transform duration-300 hover:scale-105"
                  >
                    <div className="text-3xl mr-4">{iconMap[tech.name] || <FaPaintBrush />}</div>
                    <span className="text-lg">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}