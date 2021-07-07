import { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProfileOptions from "./ProfileOptions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const options = [
    "Description",
    "Jobs Organized",
    "Registered Jobs",
    "Update Particulars",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <ProfileOptions
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography>Content goes here</Typography>
            <Typography>Display {selectedOption} component</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
