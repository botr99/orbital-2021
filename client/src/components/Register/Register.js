import RegisterButton from "./RegisterButton";
import Registrations from "./Registrations";
import { useEffect, useState } from "react";
import JobsApi from "../../apis/JobsApi";
import ROLES from "../../utils/roles";

const Register = ({ jobId, isOrganizerOrAdmin }) => {
  const [registrations, setRegistrations] = useState([]);
  const [isRegistered, setIsRegistered] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  const userId = user?.result?._id;
  const role = user?.result?.role;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await JobsApi.get(`/${jobId}/registrations`);
        console.log(res);
        setRegistrations(res.data);
        if (role === ROLES.Student) {
          setIsRegistered(res.data.some((reg) => reg._id === userId));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRegistrations();
  }, []);

  return (
    <>
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
