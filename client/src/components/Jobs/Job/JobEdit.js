import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import JobsApi from "../../../apis/JobsApi";

const JobEdit = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [categories, setCategories] = useState([]); // the categories retrieved from the database
  const [category, setCategory] = useState(""); // the category that is currently being selected by the user

  let history = useHistory();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await JobsApi.get(`/${id}`);
        setTitle(res.data.title);
        setPurpose(res.data.purpose);
        setCategory(res.data.category);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCategories = async () => {
      try {
        const res = await JobsApi.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJob();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await JobsApi.patch(`/${id}`, {
        title,
        purpose,
        category,
      });
      // redirect to the job detail page
      history.push(`/jobs/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row">
      <h1 className="text-center">Edit Job</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              required
              className="form-control"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="purpose">
              Purpose
            </label>
            <textarea
              required
              className="form-control"
              name="purpose"
              id="purpose"
              cols="30"
              rows="5"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <button className="btn btn-info">Update Job</button>
          </div>
        </form>
        <Link to={`/jobs/${id}`}>Back to Job</Link>
      </div>
    </div>
  );
};

export default JobEdit;
