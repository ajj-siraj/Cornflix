import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "../css/FeaturedMovies.css";

class MovieModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
    };
  }

  render() {
    // console.log(this.props.poster);
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.isOpen}
        onHide={() => this.props.toggleMovieModal(this.props.movie)}
      >
        <Modal.Body className="bg-dark">
          <Container>
            <Row>
              <Col>
                <h4>{this.props.movie.Title}</h4>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <img
                  className="movie-modal-img"
                  src={this.props.movie.Poster}
                  alt={this.props.movie.Title}
                  style={{ width: "30vh" }}
                />
              </Col>
              <Col>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                  facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                  vestibulum at eros.
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button onClick={this.props.toggleMovieModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MovieModal;
