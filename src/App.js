import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./Components/home/Home";
import SignUp from "./Components/login/SignUp";
import ContactUs from "./Components/contactUs/ContactUs";
import NavBar from "./Components/navbar/NavBar";
import Weather from "./Components/weather/Weather";
import MyInfo from "./Components/MyInfo";

import { Route, Routes } from "react-router-dom";
import Parks from "./Components/activities/parks";
import HeritageBuildings from "./Components/activities/buildings";
import StreetFoodLocations from "./Components/activities/food";
import Favourites from "./Components/favourites/favourites";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("login") === "true") {
      setLogin(true);
    }
    console.log("Login: ", login);
  }, []);

  return (
    <div className="App">
      {login ? (
        <>
          <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <header>
              <NavBar userName={"username here"}></NavBar>
            </header>

            <div>
              <Routes>
                <Route path="/comp4537/project/" element={<Home />} />
                <Route path="/comp4537/project/weather" element={<Weather />} />
                <Route path="/comp4537/project/parks" element={<Parks />} />
                <Route
                  path="/comp4537/project/buildings"
                  element={<HeritageBuildings />}
                />
                <Route
                  path="/comp4537/project/food"
                  element={<StreetFoodLocations />}
                />
                <Route
                  path="/comp4537/project/favourites"
                  element={<Favourites />}
                />
                <Route
                  path="/comp4537/project/contactus"
                  element={<ContactUs />}
                />
                <Route path="/comp4537/project/myinfo" element={<MyInfo />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <>
          <SignUp />
        </>
      )}
    </div>
  );
}

export default App;
