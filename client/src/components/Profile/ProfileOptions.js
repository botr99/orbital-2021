import { useState } from "react";
import {
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ProfileOptions = ({ options, selectedOption, setSelectedOption }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:768px)");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
    setSelectedOption(options[index]);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setSelectedIndex(options.indexOf(e.target.value));
  };

  return (
    <>
      {matches ? (
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <List aria-label="profile options">
              {options.map((option, index) => (
                <ListItem
                  key={option}
                  button
                  selected={index === selectedIndex}
                  onClick={(event) => handleListItemClick(event, index)}>
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      ) : (
        <Grid container justify="center">
          <FormControl className={classes.formControl}>
            <Select value={selectedOption} onChange={handleSelectChange}>
              {options.map((option, index) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </>
  );
};

export default ProfileOptions;
