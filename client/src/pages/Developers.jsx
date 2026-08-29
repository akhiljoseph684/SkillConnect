import { useEffect, useState } from "react";

import { getDevelopers } from "../services/api";
import DeveloperCard from "../components/DeveloperCard";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDevelopers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDevelopers();

      setDevelopers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load developers:", err);

      setError(err.message || "Failed to load developers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevelopers();
  }, []);

  return (
    <main className="page">
      <div className="container page-content">
        <div className="page-header">
          <span className="section-label">People</span>

          <h1>Developers</h1>

          <p>
            Explore developers, their skills, projects, and professional
            connections.
          </p>
        </div>

        {loading && <Loading message="Loading developers..." />}

        {!loading && error && (
          <ErrorState
            title="Unable to load developers"
            message={error}
            backTo="/"
            backText="Back to home"
          />
        )}

        {!loading && !error && developers.length === 0 && (
          <div className="card empty-state">
            <h2>No developers found</h2>

            <p>There are currently no developers available.</p>
          </div>
        )}

        {!loading && !error && developers.length > 0 && (
          <div className="grid grid-2">
            {developers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Developers;
