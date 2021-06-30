import RegisterButton from "./RegisterButton";
import Registrations from "./Registrations";
import { useState } from "react";
import { getJobRegistrations } from "../../apis/JobsApi";
import ROLES from "../../utils/roles";
import { useQuery } from "react-query";
import LoadingContainer from "../LoadingContainer";

const Register = ({ jobId, isOrganizerOrAdmin }) => {
  const [isRegistered, setIsRegistered] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  const userId = user?.result?._id;
  const role = user?.result?.role;

  const {
    data: registrations,
    error,
    isLoading: registrationsLoading,
    isError,
  } = useQuery(["jobRegistrations", jobId], () => getJobRegistrations(jobId), {
    onSuccess: (regs) =>
      setIsRegistered(regs.some((reg) => reg._id === userId)),
  });

  if (isError) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      {registrationsLoading && <LoadingContainer />}
      {role &&
        registrations &&
        (role === ROLES.Student ? (
          <RegisterButton
            jobId={jobId}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
          />
        ) : (
          <Registrations
            registrations={registrations}
            isOrganizerOrAdmin={isOrganizerOrAdmin}
          />
        ))}
    </>
  );
};

export default Register;
