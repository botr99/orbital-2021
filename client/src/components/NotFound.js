import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Typography>Page not found</Typography>
      <Button component={Link} to={`/`} color="primary">
        Return to Board
      </Button>
    </>
  );
};

export default NotFound;
