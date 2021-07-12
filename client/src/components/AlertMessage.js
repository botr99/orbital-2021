import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const AlertMessage = () => {
  const { message, severity } = useSelector((state) => state);

  return message ? <Alert severity={severity}>{message}</Alert> : null;
};

export default AlertMessage;
