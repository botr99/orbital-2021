import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

const formatDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.getDay()}/${start.getMonth()}/${start.getFullYear()} - ${end.getDay()}/${end.getMonth()}/${end.getFullYear()}`;
};

const useStyles = makeStyles({
  icons: {
    marginRight: 8,
  },
  iconText: {
    // to align icon with text
    direction: "row",
    alignItems: "center",
    item: true,
  },
});

const JobIcons = ({ skills, hours, startDate, endDate }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.iconText}>
        <DateRangeIcon className={classes.icons} />
        {formatDate(startDate, endDate)}
      </Grid>
      <Grid className={classes.iconText}>
        <SettingsIcon className={classes.icons} />
        {skills}
      </Grid>
      <Grid className={classes.iconText}>
        <QueryBuilderIcon className={classes.icons} />
        {hours} {"hours"}
      </Grid>
    </div>
  );
};

export default JobIcons;
