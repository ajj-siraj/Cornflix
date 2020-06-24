import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Loading = (props) => {
  return (
    
      <Container fluid className="loading-overlay" style={{zIndex: '99999'}}>
        <Row className="justify-content-center align-items-center text-center">
          <Col xs={2}>
            <Spinner animation="grow" variant="success" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    
  );
};

export default Loading;
