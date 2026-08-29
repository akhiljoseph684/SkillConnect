import { useEffect, useState } from "react";

import { getProjects } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load projects:", err);

      setError(err.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <main className="page">
      <div className="container page-content">
        <div className="page-header">
          <span className="section-label">Work</span>

          <h1>Projects</h1>

          <p>
            Explore projects, the developers behind them, and the technologies
            they use.
          </p>
        </div>

        {loading && <Loading message="Loading projects..." />}

        {!loading && error && (
          <ErrorState
            title="Unable to load projects"
            message={error}
            backTo="/"
            backText="Back to home"
          />
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="card empty-state">
            <h2>No projects found</h2>

            <p>There are currently no projects available.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Projects;
