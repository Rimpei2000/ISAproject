import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()

  const logout = () => {
    window.localStorage.setItem("login", false);
    console.log("log out")
    window.location.href = "http://localhost:3001"
  }

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
              {props.userName}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Weather">Weather</Nav.Link>
              <Nav.Link href="/Events">Events</Nav.Link>
              <Nav.Link href="/Settings">Settings</Nav.Link>
              <Nav.Link href="/AboutUs">About us</Nav.Link>
              <Nav.Link href="/ContactUs">Contact us</Nav.Link>
              <Nav.Link onClick={logout}>Log Out</Nav.Link>
              <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
