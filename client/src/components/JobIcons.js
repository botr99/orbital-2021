import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

// const formatDate = (startDate, endDate) => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   return `${start.getDay()}/${start.getMonth()}/${start.getFullYear()} - ${end.getDay()}/${end.getMonth()}/${end.getFullYear()}`;
// };

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
});

const JobIcons = ({ skills, hours, dates, location, suitability }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.iconText}>
        <DateRangeIcon className={classes.icon} />
        {dates?.join(", ")}
      </Grid>
      <Grid className={classes.iconText}>
        <QueryBuilderIcon className={classes.icon} />
        {hours} {"hours/session"}
      </Grid>
      <Grid className={classes.iconText}>
        <LocationOnIcon className={classes.icon} />
        {location}
      </Grid>
      <Grid className={classes.iconText}>
        <SettingsIcon className={classes.icon} />
        {skills}
      </Grid>
      <Grid className={classes.iconText}>
        <EmojiPeopleIcon className={classes.icon} />
        {suitability?.join(", ")}
      </Grid>
    </div>
  );
};

export default JobIcons;
