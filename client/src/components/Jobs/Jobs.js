import { useContext, useEffect } from "react";
import JobsApi from "../../apis/JobsApi";
import { JobsContext } from "../../context/JobsContext";
import { Link } from "react-router-dom";
import Job from "./Job/Job";

const Jobs = () => {
  const { jobs, setJobs } = useContext(JobsContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await JobsApi.get("/");
        setJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <h1>Available Jobs</h1>
      <Link to="/jobs/new">
        <button type="button">Add Job</button>
      </Link>
      {jobs && // will only render the jobs if they exists
        jobs.map((job) => <Job key={job._id} job={job} />)}
    </>
  );
};

export default Jobs;
