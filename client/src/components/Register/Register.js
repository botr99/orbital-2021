import RegisterButton from "./RegisterButton";
import Registrations from "./Registrations";
import { useEffect, useState } from "react";
import JobsApi from "../../apis/JobsApi";

const Register = ({ jobId, isOrganizer }) => {
  const [registrations, setRegistrations] = useState([]);
  const [isRegistered, setIsRegistered] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  const userId = user?.result?._id;
  const role = user?.result?.role;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await JobsApi.get(`/${jobId}/registrations`);
        setRegistrations(res.data);
        if (role === "Student") {
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
        (role === "Student" ? (
          <RegisterButton
            jobId={jobId}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
          />
        ) : (
          <Registrations
            registrations={registrations}
            isOrganizer={isOrganizer}
          />
        ))}
    </>
  );
};

export default Register;
