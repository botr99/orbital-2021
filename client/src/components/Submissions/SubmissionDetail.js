import {
  Button,
  Chip,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  TextField,
} from "@material-ui/core";

import { Link, useHistory, useParams } from "react-router-dom";
import { approveJob, rejectJob, getJobDetail } from "../../apis/JobsApi";
import useStyles from "./styles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import LoadingContainer from "../LoadingContainer";
import Error from "../Error";
import OrganizerInfo from "../OrganizerInfo";
import JobIcons from "../JobIcons";
import ContactInfo from "../ContactInfo";

const SubmissionDetail = () => {
  const classes = useStyles();

  const { id } = useParams();
  const queryClient = useQueryClient();

  let history = useHistory();

  const {
    data: jobDetail,
    isLoading: loadingJobDetail,
    isError,
    error,
  } = useQuery(["jobs", id], () => getJobDetail(id));

  const { mutate: mutatePatch, isLoading: approveJobLoading } = useMutation(
    approveJob,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("unapprovedJobs");
        queryClient.invalidateQueries("jobs");
        history.push("/submissions");
      },
    }
  );

  const { mutate: mutateReject, isLoading: deleteJobLoading } = useMutation(
    rejectJob,
    {
      onSuccess: () => {
        queryClient.removeQueries(["jobs", id]);
        queryClient.invalidateQueries("unapprovedJobs");
        history.push("/submissions");
      },
    }
  );

  // For dialog form
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = () => {
    if (window.confirm("Approve this submission?")) {
      mutatePatch(id);
    }
  };

  const handleReject = (e) => {
    e.preventDefault();
    if (window.confirm("Reject this submission?")) {
      mutateReject({ jobId: id, reason });
      history.push("/");
    }
  };

  const [reason, setReason] = useState("");

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <Container maxWidth="lg">
      {loadingJobDetail && <LoadingContainer />}
      {jobDetail && (
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={
                  jobDetail.imageUrl ||
                  "https://res.cloudinary.com/volunteer-board/image/upload/v1627284343/NoImage_klvezh.jpg"
                }
                title="Job Image"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h4">
                  <b>{jobDetail.title}</b>
                </Typography>
                <Typography gutterBottom variant="h6" color="textSecondary">
                  by{" "}
                  <Link
                    className={classes.link}
                    to={`/organizers/${jobDetail.organizer}`}>
                    {jobDetail.organizer}
                  </Link>
                </Typography>
                <hr />

                <Typography variant="h5">
                  <b>About</b>
                </Typography>
                <Typography paragraph>{jobDetail.purpose}</Typography>
                <hr />

                <Typography variant="h5">
                  <b>Skills Required</b>
                </Typography>
                <Typography paragraph>{jobDetail.skills}</Typography>
                <hr />

                <Typography variant="h5">
                  <b>Supported Causes</b>
                </Typography>
                <Grid>
                  {jobDetail.categories &&
                    jobDetail.categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        clickable={true}
                        style={{ margin: 2 }}
                      />
                    ))}
                </Grid>
                {/* <hr />
                  <Typography variant="h5">
                    <b>Things to note</b>
                  </Typography>
                  <Typography paragraph>
                    Optional Information maybe not pertaining to job itself but
                    registration and others
                  </Typography> */}
              </CardContent>
              <CardActions>
                <Grid>
                  <Grid>
                    <Button
                      onClick={handleApprove}
                      color="primary"
                      className={classes.button}
                      variant="outlined">
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClickOpen}>
                      Reject
                    </Button>
                    <Dialog
                      style={{ textAlign: "center" }}
                      fullWidth
                      maxWidth="sm"
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">
                        Reject Submission
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Reason(s) for rejection of this job submission
                        </DialogContentText>
                        <form onSubmit={handleReject}>
                          <TextField
                            id="reason"
                            name="reason"
                            value={reason}
                            onChange={handleChange}
                            label="Reason"
                            rows="10"
                            multiline
                            fullWidth
                            required
                          />

                          <DialogActions>
                            <Button
                              type="button"
                              onClick={handleClose}
                              color="primary">
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              onClick={handleClose}
                              color="primary">
                              Submit
                            </Button>
                          </DialogActions>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </Grid>
                  <Button component={Link} to={`/submissions`} color="primary">
                    Return to Submissions
                  </Button>
                </Grid>
              </CardActions>
              <CardContent className={classes.cardContent}>
                <Typography color="textSecondary" variant="subtitle1">
                  Last updated: {new Date(jobDetail.updatedAt).toDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={4} xs={12}>
            <OrganizerInfo jobDetail={jobDetail} />
            <Card className="mb-2" variant="outlined">
              <CardContent>
                <Typography variant="h5">
                  <b>Dates and Duration</b>
                </Typography>
                <hr />
                <JobIcons
                  skills={jobDetail.skills}
                  hours={jobDetail.hours}
                  dates={jobDetail.dates}
                  location={jobDetail.location}
                  suitability={jobDetail.suitability}
                />
              </CardContent>
            </Card>
            <ContactInfo jobDetail={jobDetail} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default SubmissionDetail;
