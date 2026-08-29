import { Link } from "react-router-dom";
import SearchBar from "../components/searchBar";

const Home = () => {
  return (
    <main className="page">
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-badge">Graph-powered developer explorer</span>

          <h1>
            Discover developers,
            <br />
            skills & projects.
          </h1>

          <p>
            Explore connections between people, skills, projects, and
            technologies in one place.
          </p>

          <SearchBar />

          <div className="hero-actions">
            <Link to="/developers" className="btn primary-button">
              Explore Developers
            </Link>

            <Link to="/projects" className="btn secondary-button">
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">Explore</span>
              <h2>Discover the network</h2>
            </div>

            <p>
              Find people and projects through their relationships and shared
              skills.
            </p>
          </div>

          <div className="grid grid-3">
            <Link to="/developers" className="card home-feature-card">
              <div className="feature-number">01</div>
              <h3>Developers</h3>
              <p>
                Browse developers and discover their skills, projects, and
                professional connections.
              </p>
              <span>View developers →</span>
            </Link>

            <Link to="/skills" className="card home-feature-card">
              <div className="feature-number">02</div>
              <h3>Skills</h3>
              <p>
                Explore technical skills and find developers who have experience
                with them.
              </p>
              <span>Explore skills →</span>
            </Link>

            <Link to="/projects" className="card home-feature-card">
              <div className="feature-number">03</div>
              <h3>Projects</h3>
              <p>
                Explore projects, the developers behind them, and the
                technologies they use.
              </p>
              <span>View projects →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="connection-section">
        <div className="container">
          <div className="connection-card">
            <div>
              <span className="section-label">Why SkillConnect?</span>

              <h2>
                Explore relationships,
                <br />
                not just records.
              </h2>

              <p>
                SkillConnect uses a graph model to connect developers, skills,
                projects, and technologies. This makes it easier to discover
                meaningful connections across multiple levels.
              </p>
            </div>

            <div className="connection-flow">
              <div className="flow-node">Developer</div>
              <div className="flow-line">→</div>
              <div className="flow-node">Project</div>
              <div className="flow-line">→</div>
              <div className="flow-node">Technology</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
