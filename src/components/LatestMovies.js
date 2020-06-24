import React from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
const MovieListItem = (props) => {
  return (
    <>
      <Link to={`/movies/${props.movie.imdbID}`}>
        <ListGroup.Item className={`${props.color} mb-3`}>
          <Row>
            <Col xs={2}>
              <img src={props.movie.PosterThumb} alt={props.movie.Title} style={{ height: "5rem" }} />
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


  render() {
    let latest = this.props.movies.map((movie, index) => {
      return (
        <ListGroup key={`${movie.imdbID}-${index}`}>
          
            <MovieListItem movie={movie} color={index % 2 === 0 ? "dark-list" : "light-list"} />
          
        </ListGroup>
      );
    });

    return (
      <Col>
        <Fade bottom cascade>
          <div>
            <h1 className="display-4 text-center m-4 heading">Latest Movies</h1>

          {latest}
          </div>
          
        </Fade>
      </Col>
    );
  }
}

export default LatestMovies;
