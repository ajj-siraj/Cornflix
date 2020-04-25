import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FeaturedMovies = () => {
  //I was here last time, no movies database to use so I used OMDB api, to be implemented next time
  // let movies =
  return (
    <>
      <Col>
        This is Main
      </Col>
    </>
  );
};

const Main = () => {
  return (
    <Container fluid>
      <Row>
        <FeaturedMovies />
      </Row>
    </Container>
  );
};

export default Main;
