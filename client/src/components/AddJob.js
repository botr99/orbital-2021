import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import JobsApi from "../apis/JobsApi";
import { JobsCategoryContext } from "../context/JobsCategoryContext";
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

/* styles */
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));
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
/* end styles */

const initialFormData = {
  title: "",
  purpose: "",
  categories: [],
};

const AddJob = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState(initialFormData);
  const categories = useContext(JobsCategoryContext); // the categories retrieved from the database
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  let history = useHistory();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await JobsApi.post("/", {
        title: formData.title,
        organizer: user?.result?.name,
        purpose: formData.purpose,
        categories: formData.categories,
      });
      // redirect to the job detail page
      history.push(`/jobs/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row">
      <Typography variant="h5" align="center" gutterBottom>
        Add Job
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
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mb-3">
            <Button variant="contained" color="primary" type="submit">
              Add Job
            </Button>
          </div>
        </form>
        <Link to="/">Return to Board</Link>
      </div>
    </div>
  );
};

export default AddJob;
