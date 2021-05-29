import { useContext, useEffect } from "react";
import JobListApi from "../../apis/JobListApi";
import { JobListContext } from "../../context/JobListContext";

const Home = (props) => {
  const { jobList, setJobList } = useContext(JobListContext);

  useEffect(() => {
    const fetchJobList = async () => {
      try {
        const res = await JobListApi.get("/");
        // console.log(res);
        setJobList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobList();
  });

  return (
    <div>
      <h1>Volunteer Board</h1>
      <div>
        <a href="/jobs/new">Add Job</a>
      </div>
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
    </div>
  );
};

export default Home;
