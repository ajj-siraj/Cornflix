import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import FeaturedMovies from "./FeaturedMovies";
import News from "./News";
import MovieModal from "./MovieModal";
import LatestMovies from "./LatestMovies";
import CustomCarousel from "./CustomCarousel";

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
        <Container fluid className="mb-5">
          <Fade>
            <Row>
              <Col className="m-0 p-0">
                <CustomCarousel movies={this.props.topMovies} />
              </Col>
            </Row>
          </Fade>

          <Fade right cascade>
            <Row className="no-gutters justify-content-center align-content-center m-4">
              <FeaturedMovies
                movies={this.props.topMovies}
                toggleMovieModal={this.toggleMovieModal}
              />
            </Row>
          </Fade>

          <Row>
            <Col lg={8}>
              <LatestMovies movies={this.props.latestMovies} />
            </Col>
            <Col lg={4}>
              <Fade bottom cascade>
                <News news={this.props.news}/>
              </Fade>
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
