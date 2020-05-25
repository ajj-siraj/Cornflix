import React from "react";
import { Col, Row, Container, CardColumns, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slide from "react-reveal/Slide";

class ExploreMovies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let movieCards = this.props.movies.map((movie, index) => {
      return (
        <Card key={`explore-movie-${movie.imdbID}`} className="custom-card">
          <Link to={`/movies/${movie.imdbID}`}>
            <Card.Img variant="top" src={movie.Poster} className="img-fluid p-5" />
            <Card.Body>
              <Card.Title className="custom-card-item">{movie.Title}</Card.Title>
              <Card.Text
                className="custom-card-item"
                style={
                  movie.imdbRating >= 7
                    ? { backgroundColor: "#21bd21", width: "30%" }
                    : { backgroundColor: "#bd2121", width: "30%" }
                }
              >{`Rating: ${movie.imdbRating}`}</Card.Text>
              <Card.Text className="custom-card-item">{movie.Plot}</Card.Text>
            </Card.Body>
          </Link>
        </Card>
      );
    });

    return (
      <Container>
        <Row className="mt-5">
          
            <CardColumns><Slide bottom cascade><div>{movieCards}</div></Slide></CardColumns>
          
        </Row>
      </Container>
    );
  }
}

export default ExploreMovies;
