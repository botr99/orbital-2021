import { Box, Button } from "@material-ui/core";
import { useMutation } from "react-query";
import { postJobRegistration } from "../../apis/JobsApi";
import LoadingSpinner from "../LoadingSpinner";

const RegisterButton = ({ jobId, isRegistered, setIsRegistered }) => {
  // const { error, isError, isLoading, isSuccess, mutateAsync } =
  //   useMutation(postJobRegistration);

  const { isLoading, mutateAsync } = useMutation(postJobRegistration);

  const handleRegister = async () => {
    await mutateAsync(jobId);
    setIsRegistered(true);
    // try {
    //   // await JobsApi.post(`/${jobId}/registrations`);
    //   setIsRegistered(true);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <Box textAlign="center" margin={2}>
      <Button
        variant="contained"
        color="primary"
        disabled={isRegistered}
        onClick={handleRegister}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : isRegistered ? (
          "Registered"
        ) : (
          "Register"
        )}
      </Button>
    </Box>
  );
};

export default RegisterButton;
