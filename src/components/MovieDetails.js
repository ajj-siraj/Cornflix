import React from "react";
import { Container, Col, Row, Modal, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function MovieDetails(props) {
  // console.log("PROPS INSIDE MovieDetails: ", props);
  let movie = props.movies.find((movie) => movie.imdbID == props.match.match.params.movieid);
  console.log("Movie is: ", movie);
  return (
    <Container>
      <Row className="no-gutters">
        <Col xs={2} className="p-0">
          <Link to="/" className="p-0">
            <span
              className="fa fa-arrow-left"
              style={{ marginTop: "50px", fontSize: "1.5rem" }}
            ></span>
            <span style={{ marginTop: "50px", fontSize: "1.5rem", fontFamily: 'Calibri'}}>{" "}Go Back</span>
          </Link>
        </Col>
        <Col>
          <h1 className="display-4 text-center m-4 heading">{movie.Title}</h1>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
        </Col>
        <Col lg="6">
          <p>{movie.Plot}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetails;
