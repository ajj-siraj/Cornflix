import React from "react";
import { Nav, Navbar, Form, FormControl, Button, Jumbotron } from "react-bootstrap";
import logo from '../assets/img/logo.png';
import jumboImg from '../assets/img/guitar-background-jumbotron-4.jpg';
import "../css/Header.css";
import Slider from 'react-slick';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

const Header = () => {
  let settings = {
    dots: false,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    arrows: false,
    swipe: false,
    pauseOnHover: false,
    fade: true
  };

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
      />{' '}CornFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#movies">Movies</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <Jumbotron fluid style={{padding:0}}>
      <Slider {...settings}>
        {/* I was here. Add something eye-catching in the jumbotron instead of this image */}
        <img src={jumboImg}></img>
        <img src={jumboImg}></img>
        <img src={jumboImg}></img>
      </Slider>
    </Jumbotron>
    </>
    
  );
};

export default Header;
