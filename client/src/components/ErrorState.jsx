import { Link } from "react-router-dom";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the requested data.",
  backTo = "/",
  backText = "Back to home",
}) => {
  return (
    <div className="card error-state">
      <div className="error-icon">!</div>

      <h2>{title}</h2>

      <p>{message}</p>

      <Link to={backTo} className="btn primary-button">
        {backText}
      </Link>
    </div>
  );
};

export default ErrorState;
