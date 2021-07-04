import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
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

const ContactInfo = ({ jobDetail }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">
          <b>Contact Information</b>
        </Typography>
        <hr />
        <Typography variant="h6">{jobDetail.contactName}</Typography>
        <Typography color="textSecondary">{jobDetail.organizer}</Typography>

        <Grid className={classes.iconText}>
          <PhoneIcon className={classes.icon} />
          <Typography
            className={classes.text}
            component="a"
            href={`tel: ${jobDetail.telephoneNum}`}>
            {jobDetail.telephoneNum}
          </Typography>
        </Grid>
        <Grid className={classes.iconText}>
          <PhoneAndroidIcon className={classes.icon} />
          <Typography
            className={classes.text}
            component="a"
            href={`tel: ${jobDetail.mobileNum}`}>
            {jobDetail.mobileNum}
          </Typography>
        </Grid>
        <Grid className={classes.iconText}>
          <MailOutlineIcon className={classes.icon} />
          <Typography
            className={classes.text}
            component="a"
            href={`mailto: ${jobDetail.email}`}>
            {jobDetail.email}
          </Typography>
        </Grid>
        <Grid className={classes.iconText}>
          <LanguageIcon className={classes.icon} />
          <Typography
            className={classes.text}
            component="a"
            href={`https://${jobDetail.website}`}>
            {jobDetail.website}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
  /*
  return (
    <div>
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
        <Typography display="inline" href={`https://${jobDetail.website}`}>
          &nbsp; {jobDetail.website}
        </Typography>
      </Grid>
    </div>
  ); */
};

export default ContactInfo;
