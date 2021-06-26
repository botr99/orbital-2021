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
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const Submission = ({ job, handleApprove }) => {
  const classes = useStyles();

  const {
    title,
    organizer,
    purpose,
    categories,
    _id,
    selectedFile,
    startDate,
    endDate,
    skills,
    hours,
  } = job;

  // add a "..." if title or purpose is too long to be shown entirely
  // on the card
  const truncatedTitle =
    title.length > 40 ? title.substring(0, 40) + "..." : title;
  const truncatedPurpose =
    purpose.length > 150 ? purpose.substring(0, 150) + "..." : purpose;

  const formatDate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.getDay()}/${start.getMonth()}/${start.getFullYear()} - ${end.getDay()}/${end.getMonth()}/${end.getFullYear()}`;
  };

  const handleClick = async () => {
    try {
      if (window.confirm("Approve this submission?")) {
        await JobsApi.patch(`/${_id}`, {
          ...job,
          isApproved: true,
        });
        handleApprove(); // Refetch submissions
      }
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
          <Typography variant="h5">{truncatedTitle}</Typography>
          <Typography gutterBottom variant="subtitle1" color="textSecondary">
            {organizer}
          </Typography>
          <Grid>
            <Typography variant="body1">{truncatedPurpose}</Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid>
            <Grid container direction="row" alignItems="center">
              <DateRangeIcon />
              &nbsp; {formatDate()}
            </Grid>
            <Grid container direction="row" alignItems="center">
              <SettingsIcon />
              &nbsp; {skills}
            </Grid>
            <Grid container direction="row" alignItems="center">
              <QueryBuilderIcon />
              &nbsp; {hours} {"hours"}
            </Grid>

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
