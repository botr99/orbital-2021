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
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Register form is submitted");
  // };

  const handleDelete = async () => {
    try {
      await JobsApi.delete(`/${id}`);
      // redirect to home page
      history.push("/");
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

  return (
    <Container maxWidth="md">
      {jobDetail && (
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Job Image"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5">
              {jobDetail.title}
            </Typography>
            <Typography>Organized by: {jobDetail.organizer}</Typography>
            <Typography>{jobDetail.purpose}</Typography>
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
          </CardContent>
          <CardActions>
            <Grid>
              {user?.result?.name === jobDetail.organizer && (
                <Grid>
                  <Button
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
              )}
              <Button component={Link} to={`/`} color="primary">
                Return to Board
              </Button>
            </Grid>
          </CardActions>
        </Card>
      )}
    </Container>
  );

  //  To be abstracted to Register component
  // <div className="row" style={{ marginTop: "2em" }}>
  //   <div className="col-6 offset-3">
  //     <div className="card">
  //       <form className="mb-3" onSubmit={handleSubmit}>
  //         <div className="mb-3">
  //           <label className="form-label" htmlFor="name">
  //             Register
  //           </label>
  //           <input
  //             className="form-control"
  //             type="text"
  //             name="name"
  //             id="name"
  //             required
  //           />
  //         </div>
  //         <button className="btn btn-success">Submit</button>
  //       </form>
  //       <h5>Registered:</h5>
  //     </div>
  //   </div>
  // </div>
};

export default JobDetail;
