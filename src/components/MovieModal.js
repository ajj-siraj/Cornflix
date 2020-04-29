import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "../css/FeaturedMovies.css";

class MovieModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      moviePoster: []
    };
  }


  render() {
    console.log(this.props.poster);
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
                <h4>{this.props.movie.title}</h4>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <img
                  className="movie-modal-img"
                  src={this.props.poster}
                  alt={this.props.movie.title}
                  style={{height: '70vh'}}
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
