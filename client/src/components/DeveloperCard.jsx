import { Link } from "react-router-dom";

const DeveloperCard = ({ developer }) => {
  return (
    <article className="card developer-card">
      <div className="developer-avatar">
        {developer.name?.charAt(0)?.toUpperCase() || "D"}
      </div>

      <div className="developer-card-content">
        <h3>{developer.name}</h3>

        {developer.bio && <p>{developer.bio}</p>}

        {developer.skills?.length > 0 && (
          <div className="tag-list">
            {developer.skills.slice(0, 4).map((skill) => (
              <span className="tag" key={skill.id}>
                {skill.name}
              </span>
            ))}
          </div>
        )}

        <Link to={`/developers/${developer.id}`} className="developer-link">
          View profile →
        </Link>
      </div>
    </article>
  );
};

export default DeveloperCard;
