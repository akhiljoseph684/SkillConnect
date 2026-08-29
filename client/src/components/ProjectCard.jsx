import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <article className="card project-card">
      <div className="project-icon">
        {project.name?.charAt(0)?.toUpperCase() || "P"}
      </div>

      <div className="project-card-content">
        <h3>{project.name}</h3>

        {project.description && <p>{project.description}</p>}

        <div className="project-meta">
          <span>
            {project.developerCount ?? 0}{" "}
            {project.developerCount === 1 ? "developer" : "developers"}
          </span>
        </div>

        <Link to={`/projects/${project.id}`} className="developer-link">
          View project →
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
