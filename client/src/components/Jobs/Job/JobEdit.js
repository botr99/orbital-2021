import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import JobsApi from "../../../apis/JobsApi";
import { JobsCategoryContext } from "../../../context/JobsCategoryContext";
import {
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
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

const initialFormData = {
  title: "",
  purpose: "",
  categories: [],
};

const JobEdit = () => {
  const { id } = useParams();
  const classes = useStyles();

  const [formData, setFormData] = useState(initialFormData);

  const [organizer, setOrganizer] = useState("");
  const categories = useContext(JobsCategoryContext); // the categories retrieved from the database
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  let history = useHistory();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await JobsApi.get(`/${id}`);

        // set title, purpose, categories to be the same
        // as that of the job retrieved.
        setOrganizer(res.data.organizer);

        setFormData({
          title: res.data.title,
          purpose: res.data.purpose,
          categories: res.data.categories,
        });
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
        title: formData.title,
        purpose: formData.purpose,
        categories: formData.categories,
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
      <Typography variant="h5" align="center" gutterBottom>
        Edit Job
      </Typography>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              multiline
              rows="10"
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-3">
            <FormControl required className={classes.formControl}>
              <InputLabel id="mutiple-categories-label">Categories</InputLabel>
              <Select
                labelId="mutiple-categories-label"
                multiple
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
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
          </div>
          <Button variant="contained" color="primary" type="submit">
            Update Job
          </Button>
        </form>
        <Link to={`/jobs/${id}`}>Back to Job</Link>
      </div>
    </div>
  );
};

export default JobEdit;
