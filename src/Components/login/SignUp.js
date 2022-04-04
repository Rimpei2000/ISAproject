import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";

function SignUp() {
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState(false);
  const [signUp, setSignUp] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("login") === "true") {
      setHasAccount(true);
    }
  }, []);

  const handleLogin = async () => {
    console.log("login");
    let username = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let admin = false;
    if (username === "admin") {
      admin = true;
    }

    Axios.get("http://termproject.rshiratori.com/API/v1/LogIn", {
      params: {
        userName: username,
        userPassword: password,
      },
    }).then((res) => {
      let success = false;
      console.log(res);
      if (res.data.length == 1) {
        success = true;
        console.log(res.data[0]["user_type_id"]);
        if (admin) {
          window.localStorage.setItem("admin", true);
        } else {
          window.localStorage.setItem("admin", false);
        }
        window.localStorage.setItem("login", true);
        window.localStorage.setItem("username", username);
      }
      if (success) {
        console.log("login success");
        window.location.href = "http://bhupeshduggal.com/comp4537/project/";
      } else {
        window.alert("Login failed");
        console.log("Login failed");
      }
    });
  };

  const handleSignUp = async () => {
    console.log("signup");
    let username = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let location = document.getElementById("location-select").value;
    switch (location) {
      case "Vancouver":
        location = 1;
        break;

      case "Burnaby":
        location = 2;
        break;

      case "Richmond":
        location = 3;
        break;

      case "North Vancouver":
        location = 4;
        break;

      case "Abbotsford":
        location = 5;
        break;

      case "Coquitlam":
        location = 6;
        break;

      case "Kamloops":
        location = 7;
        break;

      case "Langley":
        location = 8;
        break;

      case "Maple Ridge":
        location = 9;
        break;

      case "New Westminster":
        location = 10;
        break;

      case "Surrey":
        location = 11;
        break;

      default:
        location = 12;
    }

    const values = {
      newUsername: username,
      newUserPassword: password,
      newUserLocation: location,
    };

    Axios.post("http://termproject.rshiratori.com/API/v1/SignUp", {
      newUserName: values.newUsername,
      newUserPassword: values.newUserPassword,
      newUserLocation: values.newUserLocation,
    }).then((res) => {
      if (res.status == 200) {
        console.log(res);
        console.log("signup success");
        window.localStorage.setItem("login", true);
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("location", location);
        window.location.href = "http://bhupeshduggal.com/comp4537/project/";
      }
    });
  };

  return (
    <SignUpStyled>
      <div id="nameContainer">
        <label for="name">UserName</label>
        <input type="text" id="name" />
      </div>

      <div id="passwordContainer">
        <label for="password">Password</label>
        <input type="password" id="password" />
      </div>

      <div className="btnContainer">
        {hasAccount ? (
          <>
            <button onClick={handleLogin}>Sign In</button>
            <p>
              Don't have an account?
              <span onClick={() => setHasAccount(!hasAccount)}>Sign Up!</span>
            </p>
          </>
        ) : (
          <>
            <label for="location-select">Location</label>
            <select id="location-select">
              <option>Vancouver</option>
              <option>Burnaby</option>
              <option>Richmond</option>
              <option>North Vancouver</option>
              <option>Abbotsford</option>
              <option>Coquitlam</option>
              <option>Kamloops</option>
              <option>Langley</option>
              <option>Maple Ridge</option>
              <option>New Westminster</option>
              <option>Surrey</option>
              <option>Other</option>
            </select>
            <br />
            <button onClick={handleSignUp}>Sign Up</button>
            <p>
              Already have an account?
              <span onClick={() => setHasAccount(!hasAccount)}>Sign In!</span>
            </p>
          </>
        )}
      </div>
    </SignUpStyled>
  );
}

const SignUpStyled = styled.div`
  border-radius: 20px;
  border: 2px solid gray;
  color: gray;
  width: 50%;
  margin: auto;
  margin-top: 3rem;

  #nameContainer {
    margin: 1rem;
  }

  #passwordContainer {
    margin: 1rem;
  }

  label {
    margin-right: 0.5rem;
  }

  button {
    border-radius: 20px;
    margin: 1rem;
    padding: 1rem;
  }
  span {
    color: red;
  }
`;

export default SignUp;
