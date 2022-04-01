import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavBar = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.setItem("login", false);
    window.localStorage.setItem("admin", false);
    console.log("log out");
    window.location.href = "http://localhost:3000";
  };

  const deleteUser = async () => {
    console.log("Delete user");
    const username = await window.localStorage.getItem("username");
    const path = "http://localhost:3022/" + username;
    console.log(path);
    Axios.delete(path, {
      username: { username },
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        console.log("deleted");
        window.localStorage.setItem("login", false);
        window.localStorage.setItem("admin", false);
        window.location.href = "http://localhost:3000";
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Weather">Weather</Nav.Link>
              <Nav.Link href="/Map/*">Map</Nav.Link>
              <Nav.Link href="/AboutUs">About us</Nav.Link>
              <Nav.Link href="/MyInfo">My Info</Nav.Link>
              <Nav.Link href="/ContactUs">Contact us</Nav.Link>
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
