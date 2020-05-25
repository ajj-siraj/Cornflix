import React from "react";
import { Container, Col, Row, Modal, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import Fade from "react-reveal/Fade";
import Tada from "react-reveal/Tada";
import Pulse from "react-reveal/Pulse";

function MovieDetails(props) {
  console.log("PROPS INSIDE MovieDetails: ", props);

  let movie =
    props.topMovies.find((movie) => movie.imdbID == props.match.match.params.movieid) ||
    props.latestMovies.find((movie) => movie.imdbID == props.match.match.params.movieid);
  console.log("Movie is: ", movie);
  return (
    <Container>
      <Row className="no-gutters">
        <Col xs={2} className="p-0">
          {/* <Link to="/" className="p-0"> */}
          <Tada>
            <>
              <span
                className="fa fa-arrow-left"
                style={{ marginTop: "50px", fontSize: "1.5rem", cursor: "pointer" }}
                onClick={props.match.history.goBack}
              ></span>
              <span
                onClick={props.match.history.goBack}
                style={{
                  marginTop: "50px",
                  fontSize: "1.5rem",
                  fontFamily: "Calibri",
                  cursor: "pointer",
                }}
              >
                {" "}
                Back
              </span>
            </>
          </Tada>
          {/* </Link> */}
        </Col>

        <Col>
          <Fade right>
            <h1 className="display-4 text-center m-4 heading">{movie.Title}</h1>
          </Fade>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <Pulse>
            <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
          </Pulse>
        </Col>

        <Col lg="6">
          <Fade right cascade>
            <div>
              <h4>Plot</h4>
              <p>{movie.Plot}</p>
              <h4>Rated: </h4>
              <p>
                {movie.Rated === "N/A" ? (
                  <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                ) : (
                  movie.Rated
                )}
              </p>
              <h4>Writer(s): </h4>
              <p>
                {movie.Writer === "N/A" ? (
                  <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                ) : (
                  movie.Writer
                )}
              </p>
              <h4>Director: </h4>
              <p>
                {movie.Director === "N/A" ? (
                  <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                ) : (
                  movie.Director
                )}
              </p>
              <h4>Year: </h4>
              <p>
                {movie.Year === "N/A" ? (
                  <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                ) : (
                  movie.Year
                )}
              </p>
              <h4>Actors: </h4>
              <p>
                {movie.Actors === "N/A" ? (
                  <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                ) : (
                  movie.Actors
                )}
              </p>
              <h4>Runtime: </h4>
              <p>
                {movie.Runtime === "N/A" ? (
                  <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                ) : (
                  movie.Runtime
                )}
              </p>
              <h4>IMDB Rating: </h4>
              <p>
                {movie.imdbRating === "N/A" ? (
                  <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                ) : (
                  movie.imdbRating
                )}
              </p>
              <h4>IMDB Votes: </h4>
              <p>
                {movie.imdbVotes === "N/A" ? (
                  <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                ) : (
                  movie.imdbVotes
                )}
              </p>
            </div>
          </Fade>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetails;
