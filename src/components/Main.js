import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import FeaturedMovies from "./FeaturedMovies";
import News from "./News";

const Main = () => {
  return (
    <Container fluid>
      <Row className="no-gutters justify-content-center align-content-center m-4">
        <FeaturedMovies />
      </Row>
      <Row>
        <Col lg={6}>
          <News />
          <div>
            News data retrieved from <a href="https://newsapi.org/">NewsAPI.org</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
