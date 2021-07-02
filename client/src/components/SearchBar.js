const SearchBar = ({ searchInput, setSearchInput }) => {
  return (
    <>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search titles/organizers"
        aria-label="Search available jobs based on titles/organizers"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
