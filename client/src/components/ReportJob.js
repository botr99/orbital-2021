import { useState } from "react";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import OutlinedFlagRoundedIcon from "@material-ui/icons/OutlinedFlagRounded";
// import { useForm, ValidationError } from "@formspree/react";
import { unapproveJob } from "../apis/JobsApi";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

const ReportJob = ({ jobDetail }) => {
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  const queryClient = useQueryClient();
  let history = useHistory();

  const initialFormData = {
    email: user?.result.email, // email of complainant
    feedback: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const { mutate } = useMutation(unapproveJob, {
    onSuccess: () => {
      // queryClient.removeQueries(["jobs", jobDetail.id]);
      queryClient.invalidateQueries("unapprovedJobs");
      queryClient.invalidateQueries("jobs");
    },
  });

  // For dialog form
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Report this job?")) {
      mutate({ jobId: jobDetail._id, feedbackData: formData });
      history.push("/");
      // window.alert(JSON.stringify(formData));
    }
    // setOpen(false);
  };

  // // For formspree
  // const [state, handleSubmit] = useForm("mnqlzynr");
  // if (state.succeeded) {
  //   return <Typography>Thank you for your feedback!</Typography>;
  // }

  return (
    <div>
      <Button
        startIcon={<OutlinedFlagRoundedIcon />}
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}>
        Report
      </Button>
      <Dialog
        style={{ textAlign: "center" }}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide us with a short description of why you are reporting
            this event. <br />
            This event will be temporarily suspended while your report is being
            investigated.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              value={formData.email}
              onChange={handleChange}
              autoFocus
              id="email"
              name="email"
              label="Your Email Address"
              type="email"
              fullWidth
              required
            />
            {/* <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            /> */}
            <TextField
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              label="Your Feedback"
              rows="10"
              multiline
              fullWidth
              required
            />
            {/* <ValidationError
              prefix="Feedback"
              field="feedback"
              errors={state.errors}
            /> */}

            <DialogActions>
              <Button type="button" onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleClose}
                // disabled={state.submitting}
                color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportJob;
