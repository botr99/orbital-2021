const Pagination = ({ page, pageCount, changePage }) => {
  return (
    <div className="btn-group" role="group" aria-label="Navigation buttons">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => changePage(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => changePage(page + 1)}
        disabled={page >= pageCount}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
