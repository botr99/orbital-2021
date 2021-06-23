import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import JobsApi from "../../apis/JobsApi";

const Submission = ({ job, handleApprove }) => {
  const classes = useStyles();

  const { organizer, title, purpose, categories, _id, selectedFile } = job;

  // add a "..." if title or purpose is too long to be shown entirely
  // on the card
  const truncatedTitle =
    title.length > 40 ? title.substring(0, 40) + "..." : title;
  const truncatedPurpose =
    purpose.length > 150 ? purpose.substring(0, 150) + "..." : purpose;

  const handleClick = async () => {
    try {
      await JobsApi.patch(`/${_id}`, {
        ...job,
        isApproved: true,
      });
      handleApprove(); // Refetch submissions
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid item xs={12} sm={6}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={selectedFile || "https://source.unsplash.com/random"}
          title="Job Image"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {truncatedTitle}
          </Typography>
          <Typography>{organizer}</Typography>
          <Grid>
            <Typography>{truncatedPurpose}</Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid>
            <Grid>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  clickable={true}
                  style={{ margin: 2 }}
                />
              ))}
            </Grid>
            <Button component={Link} to={`/submissions/${_id}`} color="primary">
              View Submission
            </Button>
            <Button onClick={handleClick} color="primary">
              Approve
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Submission;
