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
          <header>
            <NavBar userName={"username here"}></NavBar>
          </header>

          <div style={{ width: "100vw", height: "85vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Weather" element={<Weather />} />
              <Route path="/Parks" element={<Parks />} />
              <Route path="/Buildings" element={<HeritageBuildings />} />
              <Route path="/Food" element={<StreetFoodLocations />} />
              <Route path="/Favourites" element={<Favourites />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/MyInfo" element={<MyInfo />} />
            </Routes>
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

// Eventzilla API key
// bQgs7SBMSu6dPruGTVJcW9YtuE6iIsRn9Ki1kjOi

// react - router - dom
// mapbox - gl
// react-bootstrap/Navbar
