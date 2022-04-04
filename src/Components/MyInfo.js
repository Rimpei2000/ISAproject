import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";

function MyInfo() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [changeLocation, setChangeLocation] = useState(false);

  useEffect(() => {
    setUsername(window.localStorage.getItem("username"));
    let location_id = window.localStorage.getItem("location");

    switch (location_id) {
      case "1":
        setLocation("Vancouver");
        break;

      case "2":
        setLocation("Burnaby");
        break;

      case "3":
        setLocation("Richmond");
        break;

      case "4":
        setLocation("North Vancouver");
        break;

      case "5":
        setLocation("Abbotsford");
        break;

      case "6":
        setLocation("Coquitlam");
        break;

      case "7":
        setLocation("Kamloops");
        break;

      case "8":
        setLocation("Langley");
        break;

      case "9":
        setLocation("Maple Ridge");
        break;

      case "10":
        setLocation("New Westminster");
        break;

      case "11":
        setLocation("Surrey");
        break;

      default:
        setLocation("Other");
    }
  }, []);

  const toggleList = () => {
    setChangeLocation(!changeLocation);
  };

  const PutNewLocation = async () => {
    console.log(document.getElementById("locations").value);
    let newLoc = document.getElementById("locations").value;
    switch (newLoc) {
      case "Vancouver":
        newLoc = 1;
        break;

      case "Burnaby":
        newLoc = 2;
        break;

      case "Richmond":
        newLoc = 3;
        break;

      case "North Vancouver":
        newLoc = 4;
        break;

      case "Abbotsford":
        newLoc = 5;
        break;

      case "Coquitlam":
        newLoc = 6;
        break;

      case "Kamloops":
        newLoc = 7;
        break;

      case "Langley":
        newLoc = 8;
        break;

      case "Maple Ridge":
        newLoc = 9;
        break;

      case "New Westminster":
        newLoc = 10;
        break;

      case "Surrey":
        newLoc = 11;
        break;

      default:
        newLoc = 12;
    }

    Axios.put("http://termproject.rshiratori.com/API/v1/MyInfo", {
      newLocation: newLoc,
      userName: username,
    }).then((res) => {
      if (res.status == "200") {
        window.localStorage.setItem("location", newLoc);
        window.location.href = "http://termproject.rshiratori.com:8000/";
      }
    });
  };

  return (
    <MyInfoStyled>
      My Info here!
      <div id="container">
        <p>UserName: {username}</p>
        <p>Location: {location}</p>
        <button onClick={toggleList}>Change Location</button>
        {changeLocation ? (
          <>
            <br />
            <select id="locations">
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
            <button onClick={PutNewLocation}>Set New Location</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </MyInfoStyled>
  );
}

const MyInfoStyled = styled.div`
  color: red;
`;
export default MyInfo;
