import { useContext, useEffect } from "react";
import JobsApi from "../../apis/JobsApi";
import { JobListContext } from "../../context/JobListContext";
import { Link } from "react-router-dom";

const JobList = (props) => {
  const { jobList, setJobList } = useContext(JobListContext);

  useEffect(() => {
    const fetchJobList = async () => {
      try {
        const res = await JobsApi.get("/");
        // console.log(res);
        setJobList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobList();
  }, []);

  return (
    <>
      <h1>Available Jobs</h1>
      <Link to="/jobs/new">
        <button type="button">Add Job</button>
      </Link>
      {jobList && // will only render the jobs if they exists
        jobList.map((job) => (
          <div className="card mb-3" key={job._id}>
            <div className="row">
              <div className="col md-4"></div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">
                    <small className="text-muted">{job.organizer}</small>
                  </p>
                  <p className="card-text">{job.purpose}</p>
                  <p className="card-text">
                    <small className="text-muted">{job.category}</small>
                  </p>
                  <a href={"/jobs/" + job._id} className="btn btn-primary">
                    View Job
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default JobList;
