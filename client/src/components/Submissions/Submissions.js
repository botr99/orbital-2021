import { useState } from "react";
import { getUnapprovedJobs } from "../../apis/JobsApi";

import { Link } from "react-router-dom";
import Submission from "./Submission";
import SearchBar from "../SearchBar";
import CategoryFilter from "../CategoryFilter";
import PaginationLimit from "../PaginationLimit/PaginationLimit";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useQuery } from "react-query";
import LoadingContainer from "../LoadingContainer";

const Submissions = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [submissions, setSubmissions] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    categoriesString: "",
  });

  const { error, isLoading, isError } = useQuery(
    ["unapprovedJobs", { page, limit, searchData }],
    getUnapprovedJobs,
    {
      onSuccess: (res) => {
        setSubmissions(res.data);
        setPageCount(res.pageCount);
      },
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchData({
      searchTerm: searchInput,
      categoriesString: selectedCategories.join(","),
    });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Typography variant="h4">Submissions</Typography>
        {user && (
          <Link to="/jobs/new">
            <Button variant="contained" color="primary">
              Add Job
            </Button>
          </Link>
        )}
      </Box>

      <form onSubmit={handleSearch}>
        <Box display="flex" marginBottom={1}>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </Box>
        <CategoryFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        {/* DateFilter */}
      </form>

      {isLoading && <LoadingContainer />}
      {isError && (
        <Typography variant="h5" align="center">
          Error: {error.message}
        </Typography>
      )}
      {submissions &&
        (submissions.length > 0 ? (
          <>
            <Box marginTop={3}>
              <Grid container spacing={6}>
                {submissions.map((job) => (
                  <Submission key={job._id} job={job} />
                ))}
              </Grid>
            </Box>
            <PaginationLimit
              page={page}
              setPage={setPage}
              pageCount={pageCount}
              limit={limit}
              setLimit={setLimit}
              itemName="Submissions"
            />
          </>
        ) : (
          <Box marginTop={3}>
            <Typography variant="h5" align="center">
              No submissions can be found
            </Typography>
          </Box>
        ))}
    </>
  );
};

export default Submissions;
