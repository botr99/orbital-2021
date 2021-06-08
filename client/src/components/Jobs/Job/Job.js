import { Box, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";

const Job = ({ job }) => {
  const { title, organizer, purpose, categories, _id } = job;

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
              <Box display="flex" flexWrap="wrap">
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    clickable="true"
                    style={{ margin: 2 }}
                  />
                ))}
              </Box>
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
