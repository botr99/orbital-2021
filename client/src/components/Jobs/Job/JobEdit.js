import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import JobsApi from "../../../apis/JobsApi";
import { JobsCategoryContext } from "../../../context/JobsCategoryContext";
import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const JobEdit = () => {
  const { id } = useParams();
  const classes = useStyles();

  const [organizer, setOrganizer] = useState("");
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const categories = useContext(JobsCategoryContext); // the categories retrieved from the database
  const [chosenCategories, setChosenCategories] = useState([]); // the categories the user selects
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  let history = useHistory();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await JobsApi.get(`/${id}`);

        // set title, purpose, categories to be the same
        // as that of the job retrieved.
        setOrganizer(res.data.organizer);
        setTitle(res.data.title);
        setPurpose(res.data.purpose);
        setChosenCategories(res.data.categories);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJob();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await JobsApi.patch(`/${id}`, {
        organizer: user?.result?.name,
        title,
        purpose,
        categories: chosenCategories,
      });
      // redirect to the job detail page
      history.push(`/jobs/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (user?.result?.name !== organizer) {
    return null;
  }

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

          <FormControl className={classes.formControl}>
            <InputLabel id="mutiple-categories-label">Categories</InputLabel>
            <Select
              labelId="mutiple-categories-label"
              multiple
              value={chosenCategories}
              onChange={(e) => setChosenCategories(e.target.value)}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {categories.length > 0 &&
                categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* <div className="mb-3">
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
          </div> */}
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
