import { useContext, useState, useEffect } from "react";
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
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import TnC from "./Auth/TnC";

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

const AddJob = () => {
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  console.log(user);
  // console.log(user?.result?.name);
  const initialFormData = {
    contactName: "",
    telephoneNum: user?.result?.contactNum,
    mobileNum: user?.result?.contactNum,
    email: user?.result?.email,
    website: user?.result?.website,
    title: "",
    purpose: "",
    skills: "",
    categories: [],
    selectedFile: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [agree, setAgree] = useState(false);
  const handleCheck = () => setAgree(!agree);
  const categories = useContext(JobsCategoryContext); // the categories retrieved from the database

  let history = useHistory();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await JobsApi.post("/", {
        organizer: user?.result?.name,
        registerNum: user?.result?.registerNum,
        contactName: formData.contactName,
        telephoneNum: formData.telephoneNum,
        mobileNum: formData.telephoneNum,
        email: formData.email,
        website: user?.result?.website,
        title: formData.title,
        purpose: formData.purpose,
        skills: formData.skills,
        categories: formData.categories,
        selectedFile: formData.selectedFile,
      });
      // redirect to home page
      history.push("/");
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
                MenuProps={MenuProps}>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Name of Contact Person"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Telephone Number"
              name="telephoneNum"
              value={formData.telephoneNum}
              type="tel"
              onChange={handleChange}
              half
              required
            />
            <TextField
              variant="outlined"
              label="Mobile Number"
              name="mobileNum"
              value={formData.mobileNum}
              type="tel"
              onChange={handleChange}
              half
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              value={formData.email}
              type="email"
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Skills Required"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div className="mb-3">
            <p>Image:</p>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, selectedFile: base64 })
              }
            />
          </div>
          <div className="mb-3">
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={agree}
                    onChange={handleCheck}
                    name="TnC"
                  />
                }
                label="I agree to the"
              />
              <TnC setAgree={setAgree} />
            </>
          </div>
          <div className="mb-3">
            <Button
              disabled={!agree}
              variant="contained"
              color="primary"
              type="submit">
              Add Job
            </Button>
          </div>
        </form>
        <Button component={Link} to={`/`} color="primary">
          Return to Board
        </Button>
      </div>
    </div>
  );
};

export default AddJob;
