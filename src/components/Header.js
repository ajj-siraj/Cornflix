import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button, Jumbotron } from "react-bootstrap";

import SearchBox from "./SearchBox";

import logo from "../assets/img/logo.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let query = this.state.query.length === 0 ? " " : this.state.query;
    this.props.history.history.push(`/search/${query}`);
  }

  handleChange(event) {
    // console.log("HANDLE CHANGE: ", event.target.value);
    this.setState({ query: event.target.value });
  }

  componentDidMount() {
    if (!this.props.user.firstname) {
      this.props.validateUser();
    }
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

            {/* Navlinks for large screens */}
            <Nav className="ml-auto w-50">
              <div className="search-container">
                <Form
                  inline
                  className="d-none d-lg-inline"
                  style={{ width: "50%" }}
                  onSubmit={this.handleSubmit}
                >
                  <input
                    className="search__input"
                    type="text"
                    placeholder="Search"
                    value={this.state.query}
                    onChange={this.handleChange}
                  />
                  <Button className="fa fa-search search-button" type="submit"></Button>
                </Form>
              </div>

              {!this.props.user.isLoggedIn ? null : (
                <Link
                  to={`/account/${this.props.user.username}`}
                  className="d-none d-lg-inline nav-link"
                  role="button"
                >
                  Welcome, {this.props.user.firstname}
                </Link>
              )}

              {!this.props.user.isLoggedIn ? (
                <Link to="/login" className="d-none d-lg-inline nav-link" role="button">
                  Login
                </Link>
              ) : (
                <Link to="/logout" className="d-none d-lg-inline nav-link" role="button">
                  Logout
                </Link>
              )}
              {!this.props.user.isLoggedIn ? (
                <Link to="/signup" className="d-none d-lg-inline nav-link" role="button">
                  Signup
                </Link>
              ) : null}
            </Nav>

            {/* Collapsed Navlinks for smaller screens */}
            <Nav className="mr-auto">
              {!this.props.user.isLoggedIn ? (
                <Link to="/login" className="d-block d-lg-none nav-link" role="button">
                  Login
                </Link>
              ) : (
                <Link to="/logout" className="d-block d-lg-none nav-link" role="button">
                  Logout
                </Link>
              )}
              {!this.props.user.isLoggedIn ? (
                <Link to="/signup" className="d-block d-lg-none nav-link" role="button">
                  Signup
                </Link>
              ) : null}

              {!this.props.user.isLoggedIn ? null : (
                <Link
                  to={`/account/${this.props.user.username}`}
                  className="d-block d-lg-none nav-link"
                  role="button"
                >
                  Welcome, {this.props.user.firstname}
                </Link>
              )}
              <div className="d-block d-lg-none search-container">
                <Form inline style={{ width: "100%" }} onSubmit={this.handleSubmit}>
                  <input
                    className="search__input"
                    type="text"
                    placeholder="Search"
                    value={this.state.query}
                    onChange={this.handleChange}
                  />
                  <Button className="fa fa-search search-button" type="submit"></Button>
                </Form>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Header;
