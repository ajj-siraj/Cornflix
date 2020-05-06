import React from "react";
import { Col, Row, Modal, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieListItem = (props) => {
  return (
    <>
      <Link to={`/movies/${props.movie.imdbID}`}>
        <ListGroup.Item className={props.color}>
          <Row>
            <Col xs={2}>
              <img src={props.movie.Poster} alt={props.movie.Title} style={{ height: "5rem" }} />
            </Col>
            <Col xs={10}>
              <h4 className="latest-movie-title">{props.movie.Title}</h4>
              <div>Rating: {props.movie.imdbRating}</div>
            </Col>
          </Row>
        </ListGroup.Item>
      </Link>
    </>
  );
};

class LatestMovies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let latest = this.props.movies.map((movie, index) => {
      return (
        <ListGroup key={`${movie.id}-${index}`}>
          <MovieListItem movie={movie} color={index % 2 == 0 ? "dark-list" : "light-list"} />
        </ListGroup>
      );
    });

    return (
      <Col>
        <h1 className="display-4 text-center m-4 heading">Latest Movies</h1>
        <div>{latest}</div>
      </Col>
    );
  }
}

export default LatestMovies;
