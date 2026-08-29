import { useEffect, useState } from "react";

import { getSkills } from "../services/api";
import SkillCard from "../components/SkillCard";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSkills();

      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load skills:", err);

      setError(err.message || "Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  return (
    <main className="page">
      <div className="container page-content">
        <div className="page-header">
          <span className="section-label">Expertise</span>

          <h1>Skills</h1>

          <p>
            Explore technical skills and discover developers who have experience
            with them.
          </p>
        </div>

        {loading && <Loading message="Loading skills..." />}

        {!loading && error && (
          <ErrorState
            title="Unable to load skills"
            message={error}
            backTo="/"
            backText="Back to home"
          />
        )}

        {!loading && !error && skills.length === 0 && (
          <div className="card empty-state">
            <h2>No skills found</h2>

            <p>There are currently no skills available.</p>
          </div>
        )}

        {!loading && !error && skills.length > 0 && (
          <div className="grid grid-3">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Skills;
