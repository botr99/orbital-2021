import { Box } from "@material-ui/core";
import LoadingSpinner from "./LoadingSpinner";

const LoadingContainer = () => {
  return (
    <Box display="flex" justifyContent="center">
      <LoadingSpinner />
    </Box>
  );
};

export default LoadingContainer;
