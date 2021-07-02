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
import PersonIcon from "@material-ui/icons/Person";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LanguageIcon from "@material-ui/icons/Language";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PhoneIcon from "@material-ui/icons/Phone";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteJob, getJobDetail, updateJob } from "../../apis/JobsApi";
import useStyles from "./styles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingContainer from "../LoadingContainer";
import NotFound from "../NotFound";

const SubmissionDetail = () => {
  const classes = useStyles();

  const { id } = useParams();
  const queryClient = useQueryClient();

  let history = useHistory();

  const {
    data: jobDetail,
    isLoading: loadingJobDetail,
    isError,
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

  const formatDate = () => {
    const start = new Date(jobDetail.startDate);
    const end = new Date(jobDetail.endDate);
    return `${start.getDay()}/${start.getMonth()}/${start.getFullYear()} - ${end.getDay()}/${end.getMonth()}/${end.getFullYear()}`;
  };

  if (isError) {
    return <NotFound />;
  }

  return (
    <Container maxWidth="md">
      {loadingJobDetail && <LoadingContainer />}
      {jobDetail && (
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={
              jobDetail.selectedFile || "https://source.unsplash.com/random"
            }
            title="Job Image"
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h4">
              <b>{jobDetail.title}</b>
            </Typography>
            <Typography gutterBottom variant="h6" color="textSecondary">
              By {jobDetail.organizer}
            </Typography>
            <hr />

            <Typography variant="h5">
              <b>About</b>
            </Typography>
            <Typography paragraph>{jobDetail.purpose}</Typography>

            <Typography variant="h5">
              <b>Skills Required</b>
            </Typography>
            <Typography paragraph>{jobDetail.skills}</Typography>

            <Typography variant="h5">
              <b>Dates and Duration</b>
            </Typography>
            <Grid container direction="row" alignItems="center">
              <DateRangeIcon />
              <Typography>&nbsp; {formatDate()}</Typography>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <QueryBuilderIcon />
              <Typography>&nbsp; {jobDetail.hours} hours</Typography>
            </Grid>
            <br></br>
            <Typography variant="h5">
              <b>Causes</b>
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

            <Typography gutterBottom variant="h5">
              <b>Contact Information</b>
            </Typography>
            <Grid container direction="row" alignItems="center">
              <PersonIcon />
              <Typography>&nbsp; {jobDetail.contactName}</Typography>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <PhoneIcon />
              <Typography>&nbsp; {jobDetail.telephoneNum}</Typography>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <PhoneAndroidIcon />
              <Typography>&nbsp; {jobDetail.mobileNum}</Typography>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <MailOutlineIcon />
              <Typography display="inline" href={`mailto:${jobDetail.email}`}>
                &nbsp; {jobDetail.email}
              </Typography>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <LanguageIcon />
              <Typography
                display="inline"
                href={`https://${jobDetail.website}`}
              >
                &nbsp; {jobDetail.website}
              </Typography>
            </Grid>

            <hr />
          </CardContent>
          <CardActions>
            <Grid>
              <Grid>
                <Button
                  onClick={handleApprove}
                  color="primary"
                  className={classes.button}
                  variant="contained"
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Reject
                </Button>
              </Grid>
              <Button component={Link} to={`/submissions`} color="primary">
                Return to Submissions
              </Button>
            </Grid>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default SubmissionDetail;
