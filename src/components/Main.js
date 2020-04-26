import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import FeaturedMovies from "./FeaturedMovies";

const Main = () => {
  return (
    <Container fluid>
      <Row className="no-gutters justify-content-center align-content-center m-4">
        <FeaturedMovies />
      </Row>
    </Container>
  );
};

export default Main;
