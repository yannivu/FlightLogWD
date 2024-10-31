import React, { useState } from "react";
import { loginUser } from "./AuthService";
import LoginForm from "./LoginForm";

const AuthLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(credentials).then((user) => {
      if (user) {
        alert(`Welcome back, ${user.get("firstName")}!`);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    });
  };

  return (
    <div>
      <LoginForm
        credentials={credentials}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthLogin;
