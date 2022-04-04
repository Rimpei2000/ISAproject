import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Container, Offcanvas, Nav } from "react-bootstrap";

const NavBar = (props) => {
  const logout = () => {
    window.localStorage.setItem("login", false);
    window.localStorage.setItem("admin", false);
    window.location.href = "http://bhupeshduggal.com/comp4537/project/";
  };

  const deleteUser = async () => {
    const username = await window.localStorage.getItem("username");
    const path = "http://termproject.rshiratori.com/API/v1/" + username;
    Axios.delete(path, {
      username: { username },
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        console.log("deleted");
        window.localStorage.setItem("login", false);
        window.localStorage.setItem("admin", false);
        window.location.href = "http://bhupeshduggal.com/comp4537/project/";
      }
    });
  };

  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Navbar.Brand href="#">Outivity</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              {window.localStorage.getItem("username")}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/comp4537/project/">Home</Nav.Link>
              <Nav.Link href="/comp4537/project/weather">Weather</Nav.Link>
              <Nav.Link href="/comp4537/project/parks">Parks</Nav.Link>
              <Nav.Link href="/comp4537/project/buildings">
                Heritage Buildings
              </Nav.Link>
              <Nav.Link href="/comp4537/project/favourites">
                Favourites
              </Nav.Link>
              <Nav.Link href="/comp4537/project/food">Food</Nav.Link>
              <Nav.Link href="/comp4537/project/myinfo">My Info</Nav.Link>
              <Nav.Link href="/comp4537/project/contactus">Contact us</Nav.Link>
              <Nav.Link onClick={logout}>Log Out</Nav.Link>
              <Nav.Link onClick={deleteUser}>Delete Account</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
