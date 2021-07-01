import { useState } from "react";
import { getApprovedJobs } from "../../apis/JobsApi";
import { Link } from "react-router-dom";
import Job from "./Job/Job";
import SearchBar from "../SearchBar";
import CategoryFilter from "../CategoryFilter";
import PaginationLimit from "../PaginationLimit/PaginationLimit";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import ROLES from "../../utils/roles";
import { useQuery } from "react-query";
import LoadingContainer from "../LoadingContainer";

const Jobs = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [jobs, setJobs] = useState(null);

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
    ["jobs", { page, limit, searchData }],
    getApprovedJobs,
    {
      onSuccess: (res) => {
        setJobs(res.data);
        setPageCount(res.pageCount);
      },
    }
  );

  const allowedToAddJob = () => {
    const userRole = user?.result?.role;
    return user && userRole && userRole !== ROLES.Student;
  };

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
        <Typography variant="h4">Available Jobs</Typography>
        {allowedToAddJob() && (
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
      {jobs &&
        (jobs.length > 0 ? (
          <>
            <Box marginTop={3}>
              <Grid container spacing={6}>
                {jobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </Grid>
            </Box>
            <PaginationLimit
              page={page}
              setPage={setPage}
              pageCount={pageCount}
              limit={limit}
              setLimit={setLimit}
              itemName="Jobs"
            />
          </>
        ) : (
          <Box marginTop={3}>
            <Typography variant="h5" align="center">
              No jobs can be found
            </Typography>
          </Box>
        ))}
    </>
  );
};

export default Jobs;
