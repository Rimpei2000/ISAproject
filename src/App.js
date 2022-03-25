import "./App.css";

import AboutUs from "./Components/aboutUs/AboutUs";
import ContactUs from "./Components/contactUs/ContactUs";
import Home from "./Components/home/Home";
import NavBar from "./Components/navbar/NavBar";
import Weather from "./Components/weather/Weather";
import Map from "./Components/map/Map";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar userName={"username here"}></NavBar>
      </header>
      <div style={{ width: "100vw", height: "85vh" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Weather" element={<Weather />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Settings" element={<Map />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </div>
      <footer style={{ width: "100vw", height: "5vh" }}>
        Footer Content here
      </footer>
    </div>
  );
}

export default App;

// Eventzilla API key
// bQgs7SBMSu6dPruGTVJcW9YtuE6iIsRn9Ki1kjOi

// react - router - dom
// mapbox - gl
// react-bootstrap/Navbar
