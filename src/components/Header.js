import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button, Jumbotron } from "react-bootstrap";

import SearchBox from "./SearchBox";

import logo from "../assets/img/logo.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSuggested: ["Searching..."],
    };
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  fetchSearch(value) {
    this.setState({ searchSuggested: ["option1", "option2"] });
  }
  render() {
    // console.log("PROPS INSIDE Header: ", this.props);
    return (
      <>
        <Navbar variant="dark" expand="lg" className="navbar-custom">
          <Link to="/">
            <Navbar.Brand className="align-middle ml-5">
              <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-middle"
                alt="logo"
              />{" "}
              CornFlix
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link" role="button">
                Home
              </Link>

              <Link to="/movies" className="nav-link" role="button">
                Catalog
              </Link>

              <Link to="/explore" className="nav-link" role="button">
                Explore
              </Link>
            </Nav>

            <Nav className="ml-auto w-50">
              <Form inline className="d-none d-lg-inline" style={{ width: "50%" }}>
                <SearchBox />
              </Form>

              <Link to="/login" className="d-none d-lg-inline nav-link" role="button">
                Login
              </Link>
            </Nav>
            <Nav className="mr-auto">
              <Link to="/login" className="d-block d-lg-none nav-link" role="button">
                Login
              </Link>

              <Form inline className="d-block d-lg-none" style={{ width: "100%" }}>
                <SearchBox />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Header;
