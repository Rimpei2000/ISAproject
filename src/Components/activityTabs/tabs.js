import HeritageBuildings from "../activities/buildings";
import StreetFoodLocations from "../activities/food";
import Parks from "../activities/parks";
import { Routes, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function AllTabs() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/Parks">
      <Nav.Item>
        <Nav.Link href="/Map/Parks">Parks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Map/Buildings">Buildings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Map/Food">Food</Nav.Link>
      </Nav.Item>
      <Routes>
        <Route path="/Map/Parks" element={<Parks />} />
        <Route path="/Map/Buildings" element={<HeritageBuildings />} />
        <Route path="/Map/Food" element={<StreetFoodLocations />} />
      </Routes>
    </Nav>
  );
}
