import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobsApi from "../../../apis/JobsApi";

// TODO:
// conditionally render the job detail page
// 1. view mode
// 2. edit mode (for organizations only)

const JobDetail = () => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState([]);

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

  // to add rendering for jobs that are not found
  // as well

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <div className="card">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{jobDetail.title}</h5>
            <p className="card-text">{jobDetail.purpose}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-muted">{jobDetail.category}</li>
            <li className="list-group-item">
              Organized by: {jobDetail.organizer}
            </li>
          </ul>
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
          <div className="card-footer">
            <a href="/jobs">Return to Board</a>
          </div>
          <h5>Registered:</h5>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
