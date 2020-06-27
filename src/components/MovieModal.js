import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom';

// import css from "../css/FeaturedMovies.css";

class MovieModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
    };
  }

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.isOpen}
        onHide={() => this.props.toggleMovieModal(this.props.movie)}
        dialogClassName="modal-90w"
      >
        <Modal.Body className="bg-dark">
          <Container>
            <Row className="justify-content-center text-center">
              <Col>
                <h4 style={{ padding: "1%", border: "solid 1px" }}>{this.props.movie.Title}</h4>
              </Col>
            </Row>
            <Row className="justify-content-center text-center">
              <Col lg={6}>
                <img
                  className="movie-modal-img img-fluid"
                  src={this.props.movie.PosterFeat}
                  alt={this.props.movie.Title}
                  style={{ margin: "auto" }}
                />
              </Col>
              <Col lg={6}>
                <p className="mt-4">{this.props.movie.Plot}</p>
              </Col>
            </Row>
            
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Link className="btn btn-warning" to={`/movies/${this.props.movie.imdbID}`}>See more</Link>
          <Button className="btn-success" onClick={this.props.toggleMovieModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MovieModal;
