import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import FeaturedMovies from "./FeaturedMovies";

const Main = () => {
  return (
    <Container fluid>
      <Row className="no-gutters">
        <FeaturedMovies />
      </Row>
    </Container>
  );
};

export default Main;
