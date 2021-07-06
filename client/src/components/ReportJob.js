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
import { useForm, ValidationError } from "@formspree/react";

const ReportJob = ({ jobDetail }) => {
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  // For dialog form
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = () => {
  //   setOpen(false);
  // };

  // For formspree
  const [state, handleSubmit] = useForm("mnqlzynr");
  if (state.succeeded) {
    return <Typography>Thank you for your feedback!</Typography>;
  }

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
              value={jobDetail.organizer}
              id="organizer"
              name="organizer"
              hidden
            />
            <TextField value={jobDetail.title} id="title" name="title" hidden />
            <TextField
              value={user?.result?.email}
              autoFocus
              id="email"
              name="email"
              label="Your Email Address"
              type="email"
              fullWidth
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <TextField
              id="feedback"
              name="feedback"
              label="Your Feedback"
              rows="10"
              multiline
              fullWidth
              required
            />
            <ValidationError
              prefix="Feedback"
              field="feedback"
              errors={state.errors}
            />

            <DialogActions>
              <Button type="button" onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleClose}
                disabled={state.submitting}
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
