import { Box, Button } from "@material-ui/core";
import { useMutation } from "react-query";
import { postJobRegistration } from "../../apis/JobsApi";
import LoadingSpinner from "../LoadingSpinner";

const RegisterButton = ({ jobId, isRegistered, setIsRegistered }) => {
  // const { error, isError, isLoading, isSuccess, mutate } =
  //   useMutation(postJobRegistration);

  const { isLoading, mutate } = useMutation(postJobRegistration, {
    onSuccess: () => {
      setIsRegistered(true);
    },
  });

  const handleRegister = () => {
    mutate(jobId);
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
