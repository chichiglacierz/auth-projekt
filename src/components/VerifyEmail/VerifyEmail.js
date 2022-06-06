import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail(props) {
  const navigate = useNavigate();

  const verifyEmail = () => {
    axios
      .get(props.location.state.link)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>
        Please use the verifyction link to verify your account before loggin
      </h1>
      <div>
        <h3 className="verify-email-link">
          <button className="verify-email-btn" onClick={verifyEmail}>
            Click here to verify account
          </button>
        </h3>
      </div>
    </div>
  );
}
