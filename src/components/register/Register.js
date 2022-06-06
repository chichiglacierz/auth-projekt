import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stil/form.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [username, Setusername] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  const handleUsernameInput = (e) => {
    Setusername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    Setpassword(e.target.value);
  };
  const handleEmailInput = (e) => {
    Setemail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username: username, email: email, password: password };

    axios
      .post("/signup", newUser)
      .then((response) => {
        if (response.status === 201) {
          navigate("/verify", { link: response.data.emailVerfication });
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };
  const logInLink = () => {
    navigate("/login");
  };
  return (
    <div id="reg">
      <div className="formPage">
        <h1> Please register an account </h1>

        <form id="userForm" onSubmit={handleSubmit}>
          <input
            label="Username:"
            name="username"
            type="text"
            onChange={handleUsernameInput}
            placeholder="Username"
          />
          <input
            label="Email:"
            name="email"
            type="email"
            onChange={handleEmailInput}
            placeholder="Email"
          />
          <input
            label="Password:"
            name="password"
            type="password"
            onChange={handlePasswordInput}
            placeholder="Password"
          />
          <div>
            <button id="skickaKnapp" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div></div>
        <button onClick={logInLink}>already a member? log in here</button>
      </div>
    </div>
  );
}

export default Register;
