import { useParams } from "react-router-dom";
// import Description from "./Description";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  const isUserProfile = user?.result?._id === id; // check if profile belongs to user

  return (
    <>
      {/* <Description isUserProfile={isUserProfile} /> */}
      {isUserProfile && <UpdatePassword />}
    </>
  );
};

export default Profile;
