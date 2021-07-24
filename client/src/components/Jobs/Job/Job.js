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
import JobIcons from "../../JobIcons";

const Job = ({ job }) => {
  const classes = useStyles();

  const {
    title,
    organizer,
    purpose,
    categories,
    _id,
    imageUrl,
    dates,
    skills,
    hours,
    location,
    suitability,
  } = job;

  // add a "..." if title or purpose is too long to be shown entirely
  // on the card
  const truncatedTitle =
    title.length > 40 ? title.substring(0, 40) + "..." : title;
  const truncatedPurpose =
    purpose.length > 150 ? purpose.substring(0, 150) + "..." : purpose;

  return (
    <Grid item xs={12} sm={6}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={imageUrl || "https://source.unsplash.com/random"}
          title="Job Image"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5">{truncatedTitle}</Typography>
          <Typography gutterBottom variant="subtitle1" color="textSecondary">
            by {organizer}
          </Typography>
          <Grid>
            <Typography variant="body1">{truncatedPurpose}</Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid>
            <JobIcons
              skills={skills}
              hours={hours}
              dates={dates}
              location={location}
              suitability={suitability}
            />
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
            <Button component={Link} to={`/jobs/${_id}`} color="primary">
              View Job
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Job;
