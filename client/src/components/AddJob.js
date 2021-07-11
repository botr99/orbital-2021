import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getCategories, postJob } from "../apis/JobsApi";
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
  Grid,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import FileBase from "react-file-base64";
import axios from "axios";
import TnC from "./Auth/TnC";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingSpinner from "./LoadingSpinner";

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

// Cloudinary
const url = " https://api.cloudinary.com/v1_1/volunteer-board/image/upload"; // API Base URL
const preset = "x1nm4sms"; // Unsigned uploading preset

const AddJob = () => {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  // console.log(user);
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
    imageUrl: "",
    startDate: Date.now(),
    endDate: Date.now(),
    hours: "",
  };

  // const [startDate, setStartDate] = useState(Date.now());
  // const [endDate, setEndDate] = useState(Date.now());

  const [formData, setFormData] = useState(initialFormData);
  const [agree, setAgree] = useState(false);
  const handleCheck = () => setAgree(!agree);

  const { data: categories } = useQuery("categories", getCategories);
  const { mutate, isLoading: postJobLoading } = useMutation(postJob, {
    onSuccess: () => {
      queryClient.invalidateQueries("unapprovedJobs");
      history.push("/");
    },
  });

  let history = useHistory();

  const handleStartDateChange = (date) => {
    setFormData({
      ...formData,
      startDate: date,
      endDate: formData.endDate < date ? date : formData.endDate,
    });

    // setStartDate(date);
    // setEndDate(endDate < date ? date : endDate);
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: date,
      startDate: formData.startDate > date ? date : formData.startDate,
    });
    // setEndDate(date);
    // setStartDate(startDate > date ? date : startDate);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      // Image selected
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", preset);
      try {
        const res = await axios.post(url, imageData);
        const imageUrl = res.data.secure_url;
        // console.log(imageUrl);
        mutate({
          organizer: user?.result?.name,
          registerNum: user?.result?.registerNum,
          contactName: formData.contactName,
          telephoneNum: formData.telephoneNum,
          mobileNum: formData.telephoneNum,
          email: formData.email,
          website: formData.website,
          title: formData.title,
          purpose: formData.purpose,
          skills: formData.skills,
          categories: formData.categories,
          imageUrl,
          startDate: formData.startDate,
          endDate: formData.endDate,
          hours: formData.hours,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      // No image
      mutate({
        organizer: user?.result?.name,
        registerNum: user?.result?.registerNum,
        contactName: formData.contactName,
        telephoneNum: formData.telephoneNum,
        mobileNum: formData.telephoneNum,
        email: formData.email,
        website: formData.website,
        title: formData.title,
        purpose: formData.purpose,
        skills: formData.skills,
        categories: formData.categories,
        imageUrl: formData.imageUrl,
        startDate: formData.startDate,
        endDate: formData.endDate,
        hours: formData.hours,
      });
    }
  };

  const [image, setImage] = useState("");

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
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
                {categories?.map((category) => (
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
            <Grid container justify="space-between">
              <TextField
                variant="outlined"
                label="Telephone Number"
                name="telephoneNum"
                value={formData.telephoneNum}
                type="tel"
                onChange={handleChange}
                required
              />
              <TextField
                variant="outlined"
                label="Mobile Number"
                name="mobileNum"
                value={formData.mobileNum}
                type="tel"
                onChange={handleChange}
                required
              />
            </Grid>
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-between">
                <KeyboardDatePicker
                  minDate={Date.now()}
                  margin="normal"
                  id="start-date-picker"
                  label="Start Date"
                  format="MM/dd/yyyy"
                  value={formData.startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change start date",
                  }}
                />
                <KeyboardDatePicker
                  minDate={Date.now()}
                  margin="normal"
                  id="end-date-picker"
                  label="End Date"
                  format="MM/dd/yyyy"
                  value={formData.endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change end date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          <div className="mb-3">
            <TextField
              variant="outlined"
              label="Number of Hours Required"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </div>
          <div className="mb-3">
            <InputLabel id="image">Image</InputLabel>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={onImageChange}
            />
            {/* <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, selectedFile: base64 })
              }
            /> */}
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
              {postJobLoading ? <LoadingSpinner /> : "Add Job"}
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
