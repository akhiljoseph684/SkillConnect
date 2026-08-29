import { Link } from "react-router-dom";

const SkillCard = ({ skill }) => {
  return (
    <article className="card skill-card">
      <div className="skill-icon">
        {skill.name?.charAt(0)?.toUpperCase() || "S"}
      </div>

      <div className="skill-card-content">
        <h3>{skill.name}</h3>

        <p>
          {skill.developerCount ?? 0}{" "}
          {skill.developerCount === 1 ? "developer" : "developers"}
        </p>

        <Link to={`/skills/${skill.id}`} className="developer-link">
          Explore skill →
        </Link>
      </div>
    </article>
  );
};

export default SkillCard;
