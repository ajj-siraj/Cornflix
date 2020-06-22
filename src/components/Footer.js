import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import {SocialIcon} from 'react-social-icons';

const Footer = () => {
  return (
    <Container fluid className="footer" style={{zIndex: "1"}}>
      <Row className="p-5 justify-content-center">
        <Col className="text-center" lg={4}>
          <h4>Social networks</h4>
          <SocialIcon href="" className="social-icon" network="facebook" bgColor="#c5c5c5"/>
          <SocialIcon href="" className="social-icon" network="twitter" bgColor="#c5c5c5"/>
          <SocialIcon href="" className="social-icon" network="youtube" bgColor="#c5c5c5"/>
        </Col>
      </Row>
      <Row className="p-5 justify-content-center">
        <Col className="text-center" lg={8}>
          
          <Button as={"a"} className="m-2 footer-link">Terms and Conditions</Button>
          <Button as={"a"} className="m-2 footer-link">Privacy Policy</Button>
          <Button as={"a"} className="m-2 footer-link">Help</Button>
          <Button as={"a"} className="m-2 footer-link">Site Map</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
