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
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import JobsApi from "../../../apis/JobsApi";
import useStyles from "./styles";
import Register from "../../Register/Register";
import ROLES from "../../../utils/roles";

const JobDetail = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  let history = useHistory();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const res = await JobsApi.get(`/${id}`);
        setJobDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (window.confirm("Delete this job?")) {
        // Confirmation message
        await JobsApi.delete(`/${id}`);
        // redirect to home page
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // no such job (can be abstracted out to a 404 page)
  // if (jobDetail.length === 0) {
  //   return (
  //     <div>
  //       <h1>Job not found</h1>
  //       <div className="card-footer">
  //         <Link to="/">Return to Board</Link>
  //       </div>
  //     </div>
  //   );
  // }

  const isCreator = () =>
    (user?.result?.name === jobDetail.organizer ||
      user.result.role === ROLES.Admin) && (
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

  return (
    <>
      <Container maxWidth="md">
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
              <Typography gutterBottom variant="h5">
                {jobDetail.title}
              </Typography>
              <Typography>Organized by: {jobDetail.organizer}</Typography>
              <Typography paragraph>{jobDetail.purpose}</Typography>
              <Typography>Skills required: {jobDetail.skills}</Typography>
              <Typography>
                Start Date: {new Date(jobDetail.startDate).toDateString()}
              </Typography>
              <Typography>
                End Date: {new Date(jobDetail.endDate).toDateString()}
              </Typography>
              <Typography>
                Number of Hours Required: {jobDetail.hours}
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
              <Typography variant="h6" className={classes.header}>
                Contact Information
              </Typography>
              <Typography>
                Name of Contact Person: {jobDetail.contactName}
              </Typography>
              <Typography>
                Telephone Number: {jobDetail.telephoneNum}
              </Typography>
              <Typography>Mobile Number: {jobDetail.mobileNum}</Typography>
              <Typography display="inline">Email Address: </Typography>
              <Typography
                display="inline"
                component="a"
                href={`mailto:${jobDetail.email}`}>
                {jobDetail.email}
              </Typography>
              <br />
              <Typography display="inline">Website: </Typography>
              <Typography
                display="inline"
                component="a"
                href={`https://${jobDetail.website}`}>
                {jobDetail.website}
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
              <Typography color="textSecondary" variant="subtitle2">
                Last updated: {new Date(jobDetail.updatedAt).toDateString()}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
      {user && (
        <Container maxWidth="md">
          <Register
            jobId={id}
            isOrganizerOrAdmin={
              user?.result?.name === jobDetail.organizer ||
              user?.result?.role === ROLES.Admin
            }
          />
        </Container>
      )}
    </>
  );
};

export default JobDetail;
