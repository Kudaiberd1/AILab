import { useContext, useEffect } from "react";
import Form from "../../api/Form";
import { useNavigate } from "react-router-dom";
import { Authorized } from "../../App";

const Login = () => {
  const { authorized } = useContext(Authorized);
  const navigate = useNavigate();
  useEffect(() => {
    if (authorized) navigate("/");
  }, [authorized]);
  return (
    <>
      <Form route="/api/login/" method="login" />
    </>
  );
};

export default Login;
