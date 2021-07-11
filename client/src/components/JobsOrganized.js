import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { getJobsOrganized } from "../apis/JobsApi";
import { useQuery } from "react-query";
import Job from "./Jobs/Job/Job";
import LoadingContainer from "./LoadingContainer";

const JobsOrganized = () => {
  const { name } = useParams();

  const {
    data: jobsOrganized,
    error,
    isLoading,
    isError,
  } = useQuery(["jobsOrganized", name], () => getJobsOrganized(name));

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Jobs Organized by {`"${name}"`}
      </Typography>
      {isLoading && <LoadingContainer />}
      {isError && (
        <Typography variant="h5" align="center">
          Error: {error.message}
        </Typography>
      )}
      {jobsOrganized &&
        (jobsOrganized.length > 0 ? (
          <Grid container spacing={6}>
            {jobsOrganized.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </Grid>
        ) : (
          <Typography variant="h5" align="center">
            There are no jobs organized by {`"${name}"`}
          </Typography>
        ))}
    </>
  );
};

export default JobsOrganized;
