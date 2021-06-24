import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { API as UserAPI } from "../apis/AuthApi";
import Job from "./Jobs/Job/Job";

const RegisteredJobs = () => {
  const { id } = useParams();
  const [registeredJobs, setRegisteredJobs] = useState([]);

  const fetchRegisteredJobs = async () => {
    try {
      const res = await UserAPI.get(`/${id}/registeredJobs`);
      setRegisteredJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => fetchRegisteredJobs(), []);

  return (
    <>
      <div>
        <Typography variant="h5">Registered Jobs</Typography>
      </div>
      {registeredJobs && (
        <Grid container spacing={6}>
          {registeredJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default RegisteredJobs;
