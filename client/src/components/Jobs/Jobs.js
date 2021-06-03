import { useContext, useEffect, useState } from "react";
import JobsApi from "../../apis/JobsApi";
import { JobsContext } from "../../context/JobsContext";
import { Link } from "react-router-dom";
import Job from "./Job/Job";
import Pagination from "../Pagination";

const Jobs = () => {
  const { jobs, setJobs } = useContext(JobsContext);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await JobsApi.get(`/?page=${page}`);
        setJobs(res.data.data);
        setPage(res.data.page);
        setPageCount(res.data.pageCount);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, [page]);

  return (
    <>
      <h1>Available Jobs</h1>
      <Link to="/jobs/new">
        <button type="button">Add Job</button>
      </Link>
      {/* {jobs && // will only render the jobs if they exists
      {<Pagination page={page} pageCount={pageCount} changePage={setPage} />
      jobs.map((job) => (
        <Job key={job._id} job={job} />
      ))
      <Pagination page={page} pageCount={pageCount} changePage={setPage} />} */}

      {jobs && (
        <div>
          <Pagination page={page} pageCount={pageCount} changePage={setPage} />
          {jobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
          <Pagination page={page} pageCount={pageCount} changePage={setPage} />
        </div>
      )}
    </>
  );
};

export default Jobs;
