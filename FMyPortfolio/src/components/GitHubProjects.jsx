import React, { useState, useEffect } from 'react';
import { formatTextWithNumbers } from "../utils/formatTextWithNumbers";
import Img from "./Img";
import logo from "../assets/logo.png"; // Using a placeholder image

const RepoCard = ({ repo }) => {
  return (
    <article
      className="group project-card relative overflow-hidden rounded-lg border border-accent shadow-sm bg-black/30 flex flex-col h-full"
    >
      <div className="flex-grow">
        <div className="w-full h-40 sm:h-44 lg:h-36 bg-black/20 overflow-hidden relative">
          <Img
            src={logo} // Using the placeholder logo
            alt={`${repo.name} placeholder`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 max-h-52 sm:max-h-60 overflow-auto content-area">
          <h3 className="font-semibold text-lg">{repo.name}</h3>
          <p className="mt-2 text-sm">{formatTextWithNumbers(repo.description || 'No description provided.')}</p>
        </div>
      </div>

      <div className="p-4 pt-0 view-button-container">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center rounded-md px-3 py-2 btn-accent view-button"
          aria-label={`View ${repo.name} on GitHub`}
        >
          View on GitHub →
        </a>
      </div>
    </article>
  );
};


const GitHubProjects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'Morest1124';

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=''`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            'User-Agent': 'GitHub-API-Fetcher-App'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          let message = `Error fetching repositories. Status: ${response.status}.`;
          throw new Error(message);
        }

        const data = await response.json();
        setRepos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return (
    <section className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">From GitHub</h2>
            <p className="mt-2">My latest repositories on GitHub.</p>
          </div>
        </div>

        {loading && <div className="text-center py-10">Loading projects...</div>}
        {error && <div className="text-center py-10 text-red-500">Error fetching projects: {error}</div>}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubProjects;
