import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getSkill } from "../services/api";
import DeveloperCard from "../components/DeveloperCard";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const SkillDetails = () => {
  const { id } = useParams();

  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSkill = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSkill(id);

        setSkill(data);
      } catch (err) {
        console.error("Failed to load skill:", err);

        setError(err.message || "Failed to load skill.");
      } finally {
        setLoading(false);
      }
    };

    loadSkill();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <div className="container page-content">
          <Loading message="Loading skill..." />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="container page-content">
          <ErrorState
            title="Unable to load skill"
            message={error}
            backTo="/skills"
            backText="Back to skills"
          />
        </div>
      </main>
    );
  }

  if (!skill) {
    return (
      <main className="page">
        <div className="container page-content">
          <ErrorState
            title="Skill not found"
            message="The skill you're looking for does not exist."
            backTo="/skills"
            backText="Back to skills"
          />
        </div>
      </main>
    );
  }

  const developers = Array.isArray(skill.developers) ? skill.developers : [];

  return (
    <main className="page">
      <div className="container page-content">
        <Link to="/skills" className="back-link">
          ← Back to skills
        </Link>

        <section className="card skill-detail-header">
          <div className="skill-detail-icon">
            {skill.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <div>
            <span className="section-label">Skill</span>

            <h1>{skill.name}</h1>

            <p>
              {developers.length}{" "}
              {developers.length === 1 ? "developer" : "developers"} with this
              skill
            </p>
          </div>
        </section>

        <section className="details-section">
          <div className="section-title">
            <div>
              <span className="section-label">People</span>

              <h2>Developers with this skill</h2>
            </div>

            <p>Developers connected to {skill.name}.</p>
          </div>

          {developers.length > 0 ? (
            <div className="grid grid-2">
              {developers.map((developer) => (
                <DeveloperCard key={developer.id} developer={developer} />
              ))}
            </div>
          ) : (
            <div className="card empty-state">
              <h2>No developers found</h2>

              <p>No developers are currently connected to this skill.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default SkillDetails;
