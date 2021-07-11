import { Box, Button } from "@material-ui/core";
import { useMutation } from "react-query";
import { postJobRegistration, deleteJobRegistration } from "../../apis/JobsApi";
import LoadingSpinner from "../LoadingSpinner";

const RegisterButton = ({ jobId, isRegistered, setIsRegistered }) => {
  // const { error, isError, isLoading, isSuccess, mutate } =
  //   useMutation(postJobRegistration);

  const { isLoading: registerLoading, mutate: mutateRegister } = useMutation(
    postJobRegistration,
    {
      onSuccess: () => {
        setIsRegistered(true);
      },
    }
  );

  const { isLoading: unregisterLoading, mutate: mutateUnregister } =
    useMutation(deleteJobRegistration, {
      onSuccess: () => {
        setIsRegistered(false);
      },
    });

  const handleRegister = () => {
    isRegistered ? mutateUnregister(jobId) : mutateRegister(jobId);
  };

  return (
    <Box textAlign="center" margin={2}>
      <Button variant="contained" color="primary" onClick={handleRegister}>
        {registerLoading || unregisterLoading ? (
          <LoadingSpinner />
        ) : isRegistered ? (
          "Unregister"
        ) : (
          "Register"
        )}
      </Button>
    </Box>
  );
};

export default RegisterButton;
