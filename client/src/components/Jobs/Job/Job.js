import { Link } from "react-router-dom";

const Job = (props) => {
  const { title, organizer, purpose, category, _id } = props.job;

  return (
    <div className="card mb-3">
      <div className="row">
        <div className="col md-4"></div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <small className="text-muted">{organizer}</small>
            </p>
            <p className="card-text">{purpose}</p>
            <p className="card-text">
              <small className="text-muted">{category}</small>
            </p>
            <Link to={`/jobs/${_id}`}>
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
