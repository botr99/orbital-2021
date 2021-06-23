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
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import JobsApi from "../../apis/JobsApi";
import useStyles from "./styles";

const SubmissionDetail = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState([]);

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

  const handleApprove = async () => {
    try {
      await JobsApi.patch(`/${id}`, {
        ...jobDetail,
        isApproved: true,
      });
      history.push("/submissions");
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Register form is submitted");
  // };

  const handleDelete = async () => {
    try {
      await JobsApi.delete(`/${id}`);
      history.push("/submissions");
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
            image={
              jobDetail.selectedFile || "https://source.unsplash.com/random"
            }
            title="Job Image"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5">
              {jobDetail.title}
            </Typography>
            <Typography paragraph>{jobDetail.purpose}</Typography>
            <Typography>Skills required: {jobDetail.skills}</Typography>
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
            <Typography variant="h6" className={classes.header}>
              Organizer Information
            </Typography>
            <Typography>Name of Organizer: {jobDetail.organizer}</Typography>
            <Typography>
              UEN/Charity Registration Number/Society Registration Number:{" "}
              {jobDetail.regNum || "Not Applicable"}
            </Typography>

            <Typography variant="h6" className={classes.header}>
              Contact Information
            </Typography>
            <Typography>
              Name of Contact Person: {jobDetail.contactName}
            </Typography>
            <Typography>Telephone Number: {jobDetail.telephoneNum}</Typography>
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

export default SubmissionDetail;
