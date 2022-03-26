import "../App.css";

import AboutUs from "./aboutUs/AboutUs";
import ContactUs from "./contactUs/ContactUs";
import Home from "./home/Home";
import NavBar from "./navbar/NavBar";
import Weather from "./weather/Weather";
import Map from "./map/Map";
import SignUp from "./login/SignUp";
import { Route, Routes } from "react-router-dom";

function Landing() {
  return (
    <div className="App">
      <header>
        <NavBar userName={"username here"}></NavBar>
      </header>
      <div style={{ width: "100vw", height: "85vh" }}>
        <Routes>
          // <Route path="/Home" element={<Home />} />
          // <Route path="./Weather" element={<Weather />} />
          // <Route path="./Map" element={<Map />} />
          // <Route path="./Settings" element={<Map />} />
          // <Route path="./ContactUs" element={<ContactUs />} />
          // <Route path="./AboutUs" element={<AboutUs />} />
        </Routes>
      </div>
      <footer style={{ width: "100vw", height: "5vh" }}>
        Footer Content here
      </footer>
    </div>
  );
}

export default Landing;
