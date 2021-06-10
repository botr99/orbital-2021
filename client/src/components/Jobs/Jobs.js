import { useContext, useEffect, useState } from "react";
import JobsApi from "../../apis/JobsApi";
import { JobsContext } from "../../context/JobsContext";
import { Link } from "react-router-dom";
import Job from "./Job/Job";
import SearchBar from "../SearchBar";
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
  const classes = useStyles();
  const { jobs, setJobs } = useContext(JobsContext);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

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
        const res = await JobsApi.get(
          `/?page=${page}&limit=${limit}&search=${searchTerm}`
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
  }, [page, limit, searchTerm]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Available Jobs</h1>
        <Link to="/jobs/new">
          <button type="button">Add Job</button>
        </Link>
      </Box>
      {/* <SearchBar />
      Category/Date filters */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setPage={setPage}
      />

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
