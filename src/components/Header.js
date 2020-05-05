import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button, Jumbotron } from "react-bootstrap";
import logo from "../assets/img/logo.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("PROPS INSIDE Header: ", this.props);
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home" className="align-middle">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-middle"
              alt="logo"
            />{" "}
            CornFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/movies">Movies</Link>
              </Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Header;
