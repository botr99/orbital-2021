import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  /* styles for ./Job.js and ./JobDetail.js */
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16.9
  },
  cardContent: {
    flexGrow: 1,
  },
  /* styles for ./JobEdit.js */
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

export default useStyles;
