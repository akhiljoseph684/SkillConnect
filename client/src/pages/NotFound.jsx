import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="page">
      <div className="container page-content">
        <div className="card not-found">
          <div className="not-found-code">404</div>

          <h1>Page not found</h1>

          <p>
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <Link to="/" className="btn primary-button">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
