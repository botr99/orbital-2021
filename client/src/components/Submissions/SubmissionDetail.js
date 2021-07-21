import {
  Button,
  Chip,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteJob, getJobDetail, updateJob } from "../../apis/JobsApi";
import useStyles from "./styles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingContainer from "../LoadingContainer";
import Error from "../Error";
import OrganizerInfo from "../OrganizerInfo";
import JobIcons from "../JobIcons";
import ContactInfo from "../ContactInfo";
import ReportJob from "../ReportJob";

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

  const { mutate: mutatePatch, isLoading: updateJobLoading } = useMutation(
    updateJob,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("unapprovedJobs");
        queryClient.invalidateQueries("jobs");
        history.push("/submissions");
      },
    }
  );

  const { mutate: mutateDelete, isLoading: deleteJobLoading } = useMutation(
    deleteJob,
    {
      onSuccess: () => {
        queryClient.removeQueries(["jobs", id]);
        queryClient.invalidateQueries("unapprovedJobs");
        history.push("/submissions");
      },
    }
  );

  const handleApprove = () => {
    if (window.confirm("Approve this submission?")) {
      mutatePatch({
        jobId: id,
        jobFields: {
          ...jobDetail,
          isApproved: true,
        },
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Reject this submission?")) {
      mutateDelete(id);
    }
  };

  // const formatDate = () => {
  //   const start = new Date(jobDetail.startDate);
  //   const end = new Date(jobDetail.endDate);
  //   return `${start.getDay()}/${start.getMonth()}/${start.getFullYear()} - ${end.getDay()}/${end.getMonth()}/${end.getFullYear()}`;
  // };

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
                  jobDetail.imageUrl || "https://source.unsplash.com/random"
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
                      variant="contained">
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}>
                      Reject
                    </Button>
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
            <ReportJob jobDetail={jobDetail} />
            {/* <Button component={Link} to={`/`}>
                Report
              </Button> */}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default SubmissionDetail;
