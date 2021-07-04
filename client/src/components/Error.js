import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Error = ({ error }) => {
  return (
    <div>
      {!error && (
        <>
          <h1>Page Not Found</h1>
        </>
      )}
      {error && (
        <>
          <h1>{error.name}</h1>
          <h2>{error.message}</h2>
        </>
      )}
      <br></br>
      <Button component={Link} to={`/`} color="primary">
        Return to Board
      </Button>
    </div>
  );
};

export default Error;
