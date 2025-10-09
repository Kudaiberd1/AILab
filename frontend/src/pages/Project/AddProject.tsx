import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";

const AddProject = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <>
      <div>
        {!user.is_staff && <Navigate to="/" />}
        Add Projects
      </div>
    </>
  );
};

export default AddProject;
