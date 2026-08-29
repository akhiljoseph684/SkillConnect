import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { searchGraph } from "../services/api";
import SearchBar from "../components/searchBar";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import DeveloperCard from "../components/DeveloperCard";
import SkillCard from "../components/SkillCard";
import ProjectCard from "../components/ProjectCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setResults([]);
        setError("");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchGraph(query);

        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search failed:", err);

        setError(err.message || "Failed to perform search.");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const developers = results.filter((result) => result.type === "developer");

  const skills = results.filter((result) => result.type === "skill");

  const projects = results.filter((result) => result.type === "project");

  return (
    <main className="page">
      <div className="container page-content">
        <Link to="/" className="back-link">
          ← Back to home
        </Link>

        <div className="search-results-header">
          <div className="page-header">
            <span className="section-label">Search</span>

            <h1>{query ? `Results for "${query}"` : "Search SkillConnect"}</h1>

            <p>Search across developers, skills, and projects.</p>
          </div>

          <SearchBar />
        </div>

        {loading && <Loading message="Searching the graph..." />}

        {!loading && error && (
          <ErrorState
            title="Search failed"
            message={error}
            backTo="/"
            backText="Back to home"
          />
        )}

        {!loading && !error && !query && (
          <div className="card empty-state">
            <h2>Start searching</h2>

            <p>Enter a developer, skill, or project name above.</p>
          </div>
        )}

        {!loading && !error && query && results.length === 0 && (
          <div className="card empty-state">
            <h2>No results found</h2>

            <p>We couldn't find anything matching "{query}".</p>

            <p>Try a different developer, skill, or project name.</p>
          </div>
        )}

        {!loading && !error && developers.length > 0 && (
          <section className="search-section">
            <div className="section-title">
              <div>
                <span className="section-label">People</span>

                <h2>Developers</h2>
              </div>

              <span className="result-count">{developers.length}</span>
            </div>

            <div className="grid grid-2">
              {developers.map((developer) => (
                <DeveloperCard
                  key={`developer-${developer.id}`}
                  developer={{
                    id: developer.id,
                    name: developer.name,
                    bio: developer.description,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {!loading && !error && skills.length > 0 && (
          <section className="search-section">
            <div className="section-title">
              <div>
                <span className="section-label">Expertise</span>

                <h2>Skills</h2>
              </div>

              <span className="result-count">{skills.length}</span>
            </div>

            <div className="grid grid-3">
              {skills.map((skill) => (
                <SkillCard
                  key={`skill-${skill.id}`}
                  skill={{
                    id: skill.id,
                    name: skill.name,
                    developerCount: 0,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {!loading && !error && projects.length > 0 && (
          <section className="search-section">
            <div className="section-title">
              <div>
                <span className="section-label">Work</span>

                <h2>Projects</h2>
              </div>

              <span className="result-count">{projects.length}</span>
            </div>

            <div className="grid grid-3">
              {projects.map((project) => (
                <ProjectCard
                  key={`project-${project.id}`}
                  project={{
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    developerCount: 0,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
