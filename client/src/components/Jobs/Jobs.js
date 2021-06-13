import { useContext, useEffect, useState } from "react";
import JobsApi from "../../apis/JobsApi";
import { JobsContext } from "../../context/JobsContext";
import { Link } from "react-router-dom";
import Job from "./Job/Job";
import SearchBar from "../SearchBar";
import CategoryFilter from "../CategoryFilter";
import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Jobs = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const { jobs, setJobs } = useContext(JobsContext);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleLimitChange = (e) => {
    setPage(1); // go back to the front page
    setLimit(e.target.value); // change the number of jobs per page
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const categoriesString = filteredCategories.join(",");

        const res = await JobsApi.get(
          `/?page=${page}&limit=${limit}&search=${encodeURIComponent(
            searchTerm
          )}&categories=${encodeURIComponent(categoriesString)}`
        );
        setJobs(res.data.data);
        setPage(res.data.page);
        setPageCount(res.data.pageCount);
        setLimit(res.data.limit);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, [page, limit, searchTerm, filteredCategories]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Available Jobs</h1>
        {user && (
          <Link to="/jobs/new">
            <button className="btn btn-outline-primary" type="button">
              Add Job
            </button>
          </Link>
        )}
      </Box>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setPage={setPage}
      />
      <CategoryFilter
        filteredCategories={filteredCategories}
        setFilteredCategories={setFilteredCategories}
        setPage={setPage}
      />
      {/* DateFilter */}

      {jobs && (
        <Box>
          {jobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Pagination
              count={pageCount}
              page={page}
              variant="outlined"
              color="primary"
              showFirstButton
              showLastButton
              onChange={handlePageChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel>Jobs per Page</InputLabel>
              <Select
                labelId="limit-select-label"
                value={limit}
                onChange={handleLimitChange}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Jobs;
