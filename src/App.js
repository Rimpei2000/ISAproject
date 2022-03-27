import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./Components/home/Home";
import SignUp from "./Components/login/SignUp";
import Landing from "./Components/Landing";
import AboutUs from "./Components/aboutUs/AboutUs";
import ContactUs from "./Components/contactUs/ContactUs";
import NavBar from "./Components/navbar/NavBar";
import Weather from "./Components/weather/Weather";
import Map from "./Components/map/Map";
import MyInfo from "./Components/MyInfo";

import { Route, Routes } from "react-router-dom";

function App() {

  const [login, setLogin] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem("login") === "true") {
      setLogin(true)
    }
    console.log("Login: ", login)
  }, [])


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
          <Route path="/Map" element={<Map />} />
          <Route path="/Settings" element={<Map />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/MyInfo" element={<MyInfo />} />
        </Routes>
      </div>
      </>
    ):(
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
