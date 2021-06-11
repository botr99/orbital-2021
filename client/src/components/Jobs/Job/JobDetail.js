import { Box, Chip } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import JobsApi from "../../../apis/JobsApi";

const JobDetail = () => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState([]);

  let history = useHistory();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const res = await JobsApi.get(`/${id}`);
        setJobDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobDetail();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register form is submitted");
  };

  const handleDelete = async () => {
    try {
      await JobsApi.delete(`/${id}`);
      // redirect to home page
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  // no such job (can be abstracted out to a 404 page)
  // if (jobDetail.length === 0) {
  //   return (
  //     <div>
  //       <h1>Job not found</h1>
  //       <div className="card-footer">
  //         <Link to="/">Return to Board</Link>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
              <h5 className="card-title">{jobDetail.title}</h5>
              <p className="card-text">{jobDetail.purpose}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-muted">
                <Box display="flex" flexWrap="wrap">
                  {jobDetail.categories &&
                    jobDetail.categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        clickable={true}
                        style={{ margin: 2 }}
                      />
                    ))}
                </Box>
              </li>
              <li className="list-group-item">
                Organized by: {jobDetail.organizer}
              </li>
            </ul>

            {/* Check if the current user is the one who created the job */}
            <div className="card-body">
              <Link to={`/jobs/${jobDetail._id}/edit`}>
                <button className="btn btn-info">Edit</button>
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete job
              </button>
            </div>

            <div className="card-footer">
              <Link to="/">Return to Board</Link>
            </div>
          </div>
        </div>
      </div>
      {/* To be abstracted to Register component */}
      <div className="row" style={{ marginTop: "2em" }}>
        <div className="col-6 offset-3">
          <div className="card">
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Register
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  required
                />
              </div>
              <button className="btn btn-success">Submit</button>
            </form>
            <h5>Registered:</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
