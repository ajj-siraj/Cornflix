import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import FeaturedMovies from "./FeaturedMovies";
import News from "./News";
import MovieModal from "./MovieModal";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: {
        isOpen: false,
      },
      movie: [],
      
    };

    this.toggleMovieModal = this.toggleMovieModal.bind(this);
  }

  toggleMovieModal(movie) {
    this.setState((prevState) => ({
      modal: { isOpen: !prevState.modal.isOpen },
      movie: movie,
    }));
   
  }

  
  render() {
    return (
      <>
        <MovieModal
          isOpen={this.state.modal.isOpen}
          movie={this.state.movie}
          toggleMovieModal={this.toggleMovieModal}
        />
        <Container fluid>
          <Row className="no-gutters justify-content-center align-content-center m-4">
            <FeaturedMovies toggleMovieModal={this.toggleMovieModal} />
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
      </>
    );
  }
}

export default Main;
