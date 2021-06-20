import { Box, Button } from "@material-ui/core";
import JobsApi from "../../apis/JobsApi";

const RegisterButton = ({ jobId, isRegistered, setIsRegistered }) => {
  const handleRegister = async () => {
    try {
      await JobsApi.post(`/${jobId}/registrations`);
      setIsRegistered(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box textAlign="center" margin={2}>
      <Button
        variant="contained"
        color="primary"
        disabled={isRegistered}
        onClick={handleRegister}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterButton;
