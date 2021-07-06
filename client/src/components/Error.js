import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Error = ({ error }) => {
  let history = useHistory();

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
      <Button size="large" onClick={() => history.goBack()} color="primary">
        Return to previous page
      </Button>
    </div>
  );
};

export default Error;
