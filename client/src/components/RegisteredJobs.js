import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { getRegisteredJobs } from "../apis/AuthApi";
import { useQuery } from "react-query";
import Job from "./Jobs/Job/Job";
import LoadingContainer from "./LoadingContainer";

const RegisteredJobs = () => {
  const { id } = useParams();

  const {
    data: registeredJobs,
    error,
    isLoading,
    isError,
  } = useQuery(["registeredJobs", id], () => getRegisteredJobs(id));

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Registered Jobs
      </Typography>
      {isLoading && <LoadingContainer />}
      {isError && (
        <Typography variant="h5" align="center">
          Error: {error.message}
        </Typography>
      )}
      {registeredJobs &&
        (registeredJobs.length > 0 ? (
          <Grid container spacing={6}>
            {registeredJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </Grid>
        ) : (
          <Typography variant="h5" align="center">
            No registered jobs
          </Typography>
        ))}
    </>
  );
};

export default RegisteredJobs;
