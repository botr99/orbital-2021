import { useState } from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  // handle input changes to form
  const [currSearchTerm, setCurrSearchTerm] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(currSearchTerm);
  };

  return (
    <div style={{ marginBottom: 5 }}>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search titles/organizers"
          aria-label="Search available jobs based on titles/organizers"
          value={currSearchTerm}
          onChange={(e) => setCurrSearchTerm(e.target.value)}
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
