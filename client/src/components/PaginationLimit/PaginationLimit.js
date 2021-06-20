import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const PaginationLimit = ({
  page,
  setPage,
  pageCount,
  limit,
  setLimit,
  itemName,
}) => {
  const classes = useStyles();

  // const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePageChange = (e, value) => {
    setPage(value);
    // scrollToTop();
  };

  const handleLimitChange = (e) => {
    setPage(1); // go back to the front page
    setLimit(e.target.value); // change the number of jobs per page
    // scrollToTop();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Pagination
          count={pageCount}
          page={page}
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
          onChange={handlePageChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>{itemName || "Items"} per Page</InputLabel>
          <Select
            labelId="limit-select-label"
            value={limit}
            onChange={handleLimitChange}
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={14}>14</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default PaginationLimit;
