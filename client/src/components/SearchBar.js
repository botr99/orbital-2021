import { useState } from "react";

const SearchBar = ({ searchTerm, setSearchTerm, setPage }) => {
  const [currSearchInput, setCurrSearchInput] = useState(searchTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(currSearchInput);
    setPage(1);
  };

  return (
    <div style={{ marginBottom: 5 }}>
      <form className="d-flex" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search titles/organizers"
          aria-label="Search available jobs based on titles/organizers"
          value={currSearchInput}
          onChange={(e) => setCurrSearchInput(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
