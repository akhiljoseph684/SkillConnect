import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="logo">
          Skill<span>Connect</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/developers"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Developers
          </NavLink>

          <NavLink
            to="/skills"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Skills
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Projects
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
