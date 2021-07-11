import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getCategories, getJobDetail, updateJob } from "../../../apis/JobsApi";
import FileBase from "react-file-base64";
import axios from "axios";
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
  Grid,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import useStyles from "./styles";

import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingSpinner from "../../LoadingSpinner";
import LoadingContainer from "../../LoadingContainer";
import Error from "../../Error";

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

// Cloudinary
const url = " https://api.cloudinary.com/v1_1/volunteer-board/image/upload"; // API Base URL
const preset = "x1nm4sms"; // Unsigned uploading preset

const JobEdit = () => {
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  const queryClient = useQueryClient();
  const initialFormData = {
    contactName: "",
    telephoneNum: "",
    mobileNum: "",
    email: "",
    website: "",
    title: "",
    purpose: "",
    skills: "",
    categories: [],
    imageUrl: "",
    startDate: "",
    endDate: "",
    hours: "",
  };

  const { id } = useParams();
  const classes = useStyles();

  const [formData, setFormData] = useState(initialFormData);

  const handleStartDateChange = (date) => {
    setFormData({
      ...formData,
      startDate: date,
      endDate: date > formData.endDate ? date : formData.endDate,
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: date,
      startDate: formData.startDate > date ? date : formData.startDate,
    });
  };

  const [organizer, setOrganizer] = useState("");

  let history = useHistory();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { data: categories } = useQuery("categories", getCategories);
  const {
    isLoading: loadingJobDetail,
    isError,
    error,
  } = useQuery(["jobs", id], () => getJobDetail(id), {
    onSuccess: (job) => {
      setOrganizer(job.organizer);
      // console.log(job);
      setFormData(job);
      //setFormData({ ...job, startDate: "2021-06-15" });
    },
  });

  const { mutate, isLoading: updateJobLoading } = useMutation(updateJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs", id]);
      history.push(`/jobs/${id}`);
    },
  });

  const [image, setImage] = useState("");

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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
        mutate({
          jobId: id,
          jobFields: { ...formData, imageUrl },
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      // No image
      mutate({
        jobId: id,
        jobFields: formData,
      });
    }
  };

  // if (user?.result?.name !== organizer) {
  //   return null;
  // }

  if (loadingJobDetail) {
    return <LoadingContainer />;
  }

  if (isError) {
    return <Error error={error} />;
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
          <Button variant="contained" color="primary" type="submit">
            {updateJobLoading ? <LoadingSpinner /> : "Update Job"}
          </Button>
        </form>
        <Button component={Link} to={`/jobs/${id}`} color="primary">
          Back to Job
        </Button>
      </div>
    </div>
  );
};

export default JobEdit;
