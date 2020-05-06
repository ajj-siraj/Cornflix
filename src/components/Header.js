import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button, Jumbotron } from "react-bootstrap";

import SearchBox from './SearchBox';

import logo from "../assets/img/logo.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSuggested: ["1", "2"],
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
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/movies">Movies</Link>
              </Nav.Link>
            </Nav>
            <Form inline style={{ width: "50%" }}>
              <SearchBox />
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Header;
