import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneIcon from "@material-ui/icons/Phone";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

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
  text: {
    textDecoration: "none",
    color: "inherit",
  },
});

const OrganizerInfo = ({ jobDetail }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          className={classes.text}
          component={Link}
          to={`/${jobDetail.organizer}`}
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
