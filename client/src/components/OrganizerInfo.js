import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  icon: {
    marginRight: 8,
  },
  iconText: {
    // to align icon with text
    direction: "row",
    alignItems: "center",
    item: true,
  },
  link: {
    textDecoration: "none",
    // color: "inherit",
    color: "#003062",
  },
});

const OrganizerInfo = ({ jobDetail }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          className={classes.link}
          component={Link}
          to={`/organizers/${jobDetail.organizer}`}
          variant="h5">
          <b>{jobDetail.organizer}</b>
        </Typography>
        <hr />
        <Typography color="textSecondary">
          Short description of organizer, taken from profile page of organizer
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrganizerInfo;
