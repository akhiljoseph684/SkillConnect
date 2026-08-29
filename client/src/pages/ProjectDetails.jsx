import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProject } from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProject(id);

        setProject(data);
      } catch (err) {
        console.error("Failed to load project:", err);

        setError(err.message || "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <div className="container page-content">
          <Loading message="Loading project..." />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="container page-content">
          <ErrorState
            title="Unable to load project"
            message={error}
            backTo="/projects"
            backText="Back to projects"
          />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="page">
        <div className="container page-content">
          <ErrorState
            title="Project not found"
            message="The project you're looking for does not exist."
            backTo="/projects"
            backText="Back to projects"
          />
        </div>
      </main>
    );
  }

  const developers = Array.isArray(project.developers)
    ? project.developers
    : [];

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

  return (
    <main className="page">
      <div className="container page-content">
        <Link to="/projects" className="back-link">
          ← Back to projects
        </Link>

        {/* Project Header */}

        <section className="card project-detail-header">
          <div className="project-detail-icon">
            {project.name?.charAt(0)?.toUpperCase() || "P"}
          </div>

          <div>
            <span className="section-label">Project</span>

            <h1>{project.name}</h1>

            {project.description && <p>{project.description}</p>}
          </div>
        </section>

        {/* Developers */}

        <section className="details-section">
          <div className="section-title">
            <div>
              <span className="section-label">Contributors</span>

              <h2>Developers</h2>
            </div>

            <p>Developers who worked on this project.</p>
          </div>

          {developers.length > 0 ? (
            <div className="grid grid-2">
              {developers.map((developer) => (
                <Link
                  key={developer.id}
                  to={`/developers/${developer.id}`}
                  className="card project-developer"
                >
                  <div className="connection-avatar">
                    {developer.name?.charAt(0)?.toUpperCase() || "D"}
                  </div>

                  <div>
                    <h3>{developer.name}</h3>

                    {developer.bio && <p>{developer.bio}</p>}

                    <span>View profile →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card empty-state">
              <h2>No developers found</h2>

              <p>No developers are currently connected to this project.</p>
            </div>
          )}
        </section>

        {/* Technologies */}

        <section className="details-section">
          <div className="section-title">
            <div>
              <span className="section-label">Technology</span>

              <h2>Technologies</h2>
            </div>

            <p>Technologies used by this project.</p>
          </div>

          {technologies.length > 0 ? (
            <div className="detail-tags">
              {technologies.map((technology) => (
                <span key={technology.id} className="detail-tag">
                  {technology.name}
                </span>
              ))}
            </div>
          ) : (
            <div className="card empty-state">
              <h2>No technologies listed</h2>

              <p>This project has no technologies listed.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProjectDetails;
