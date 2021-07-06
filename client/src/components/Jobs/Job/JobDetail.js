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
import EditIcon from "@material-ui/icons/Edit";

import { Link, useHistory, useParams } from "react-router-dom";
import { getJobDetail, deleteJob } from "../../../apis/JobsApi";
import useStyles from "./styles";
import Register from "../../Register/Register";
import ROLES from "../../../utils/roles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingContainer from "../../LoadingContainer";
import Error from "../../Error";
import ContactInfo from "../../ContactInfo";
import OrganizerInfo from "../../OrganizerInfo";
import JobIcons from "../../JobIcons";
import ReportJob from "../../ReportJob";

const JobDetail = () => {
  const classes = useStyles();

  const { id } = useParams();
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  let history = useHistory();

  const {
    data: jobDetail,
    isLoading: loadingJobDetail,
    isError,
    error,
  } = useQuery(["jobs", id], () => getJobDetail(id));

  const { mutate, isLoading: deleteJobLoading } = useMutation(deleteJob, {
    onSuccess: () => {
      queryClient.removeQueries(["jobs", id]);
      queryClient.invalidateQueries("jobs");
      history.push("/");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Delete this job?")) {
      mutate(id);
    }
  };

  const isCreator = () =>
    (user?.result?.name === jobDetail.organizer ||
      user?.result?.role === ROLES.Admin) && (
      <Grid>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          component={Link}
          to={`/jobs/${jobDetail._id}/edit`}>
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={handleDelete}>
          Delete
        </Button>
      </Grid>
    );

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <Container maxWidth="lg">
        {loadingJobDetail && <LoadingContainer />}
        {jobDetail && (
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={
                    jobDetail.selectedFile ||
                    "https://source.unsplash.com/random"
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
                      to={`/${jobDetail.organizer}`}>
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
                  <hr />
                  <Typography variant="h5">
                    <b>Things to note</b>
                  </Typography>
                  <Typography paragraph>
                    Optional Information maybe not pertaining to job itself but
                    registration and others
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid>
                    {isCreator()}
                    <Button component={Link} to={`/`} color="primary">
                      Return to Board
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
              <Typography variant="h5">
                <b>Dates and Duration</b>
              </Typography>
              <JobIcons
                skills={jobDetail.skills}
                hours={jobDetail.hours}
                startDate={jobDetail.startDate}
                endDate={jobDetail.endDate}
              />
              <ContactInfo jobDetail={jobDetail} />
              <ReportJob jobDetail={jobDetail} />
              {/* <Button component={Link} to={`/`}>
                Report
              </Button> */}
            </Grid>
          </Grid>
        )}
      </Container>
      {user && jobDetail && (
        <Container maxWidth="md">
          <Register
            jobId={id}
            isOrganizerOrAdmin={
              user?.result?.name === jobDetail?.organizer ||
              user?.result?.role === ROLES.Admin
            }
          />
        </Container>
      )}
    </>
  );
};

export default JobDetail;
