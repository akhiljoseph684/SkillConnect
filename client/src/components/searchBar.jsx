import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search developers, skills, or projects..."
          aria-label="Search developers, skills, or projects"
        />

        {query && (
          <button
            type="button"
            className="clear-search"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <button type="submit" className="btn search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
