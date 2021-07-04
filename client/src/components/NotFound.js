import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>Page not found</h1>
      <Button component={Link} to={`/`} color="primary">
        Return to Board
      </Button>
    </>
  );
};

export default NotFound;
