import { Link } from "react-router-dom";

const Job = (props) => {
  const job = props.job;

  return (
    <div className="card mb-3">
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
            <Link to={`/jobs/${job._id}`}>
              <button type="button" className="btn btn-primary">
                View Job
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
