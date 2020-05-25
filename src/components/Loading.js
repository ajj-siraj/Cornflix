import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Fade from "react-reveal/Fade";

const Loading = (props) => {
  return (
    <Fade opposite>
      <Container fluid className="loading-overlay">
        <Row className="justify-content-center align-items-center text-center">
          <Col xs={2}>
            <Spinner animation="grow" variant="success" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    </Fade>
  );
};

export default Loading;
