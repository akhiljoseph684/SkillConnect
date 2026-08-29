import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getDeveloper, getDeveloperConnections } from "../services/api";

import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const DeveloperDetails = () => {
  const { id } = useParams();

  const [developer, setDeveloper] = useState(null);
  const [connections, setConnections] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDeveloper = async () => {
      try {
        setLoading(true);
        setError("");

        const [developerData, connectionData] = await Promise.all([
          getDeveloper(id),
          getDeveloperConnections(id),
        ]);

        setDeveloper(developerData);
        setConnections(Array.isArray(connectionData) ? connectionData : []);
      } catch (err) {
        console.error("Failed to load developer:", err);

        setError(err.message || "Failed to load developer.");
      } finally {
        setLoading(false);
      }
    };

    loadDeveloper();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <div className="container page-content">
          <Loading message="Loading developer..." />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="container page-content">
          <ErrorState
            title="Unable to load developer"
            message={error}
            backTo="/developers"
            backText="Back to developers"
          />
        </div>
      </main>
    );
  }

  if (!developer) {
    return (
      <main className="page">
        <div className="container page-content">
          <ErrorState
            title="Developer not found"
            message="The developer you're looking for does not exist."
            backTo="/developers"
            backText="Back to developers"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container page-content">
        <Link to="/developers" className="back-link">
          ← Back to developers
        </Link>

        {/* Developer profile */}

        <section className="profile-header card">
          <div className="profile-avatar">
            {developer.name?.charAt(0)?.toUpperCase() || "D"}
          </div>

          <div>
            <span className="section-label">Developer</span>

            <h1>{developer.name}</h1>

            {developer.email && (
              <p className="profile-email">{developer.email}</p>
            )}

            {developer.bio && <p className="profile-bio">{developer.bio}</p>}
          </div>
        </section>

        {/* Skills */}

        <section className="details-section">
          <div className="section-title">
            <div>
              <span className="section-label">Expertise</span>

              <h2>Skills</h2>
            </div>
          </div>

          {developer.skills?.length > 0 ? (
            <div className="detail-tags">
              {developer.skills.map((skill) => (
                <Link
                  key={skill.id}
                  to={`/skills/${skill.id}`}
                  className="detail-tag"
                >
                  {skill.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="card empty-state">
              <h2>No skills listed</h2>

              <p>This developer has no skills listed yet.</p>
            </div>
          )}
        </section>

        {/* Projects */}

        <section className="details-section">
          <div className="section-title">
            <div>
              <span className="section-label">Experience</span>

              <h2>Projects</h2>
            </div>
          </div>

          {developer.projects?.length > 0 ? (
            <div className="grid grid-2">
              {developer.projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="card detail-project"
                >
                  <h3>{project.name}</h3>

                  {project.description && <p>{project.description}</p>}

                  <span>View project →</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card empty-state">
              <h2>No projects listed</h2>

              <p>This developer has no projects listed yet.</p>
            </div>
          )}
        </section>

        {/* Connections */}

        <section className="details-section">
          <div className="section-title">
            <div>
              <span className="section-label">Graph Connections</span>

              <h2>Connected Developers</h2>
            </div>

            <p>Developers connected through shared projects.</p>
          </div>

          {connections.length > 0 ? (
            <div className="grid grid-2">
              {connections.map((connection) => (
                <Link
                  key={connection.id}
                  to={`/developers/${connection.id}`}
                  className="card connection-card-item"
                >
                  <div className="connection-avatar">
                    {connection.name?.charAt(0)?.toUpperCase() || "D"}
                  </div>

                  <div>
                    <h3>{connection.name}</h3>

                    {connection.sharedProjects?.length > 0 && (
                      <p>
                        Worked together on{" "}
                        {connection.sharedProjects
                          .map((project) => project.name)
                          .join(", ")}
                      </p>
                    )}

                    {connection.skills?.length > 0 && (
                      <div className="tag-list">
                        {connection.skills.slice(0, 3).map((skill) => (
                          <span className="tag" key={skill.id}>
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card empty-state">
              <h2>No connections found</h2>

              <p>This developer has no shared project connections yet.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default DeveloperDetails;
