import React from "react";
import { Col, Row, Container, Table, Button } from "react-bootstrap";
import { apiServerBaseUrl } from "../config";
import Fade from "react-reveal/Fade";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      allMovies: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    if (this.state.allMovies.length === 0) {
      this.setState((prevState) => ({ ...prevState, allMovies: this.props.topMovies }));
    }
  }

  handleChange(event) {
    let { value } = event.target;
    this.setState((prevState) => ({ ...prevState, searchTerm: value }));
  }

  loadMore() {
    let page = this.state.allMovies.length / 15;
    fetch(`${apiServerBaseUrl}/movies/top?p=${page}`)
      .then((res) => res.json())
      .then((res) =>
        this.setState((prevState) => ({
          ...prevState,
          allMovies: [...prevState.allMovies, ...res],
        }))
      )
      .catch((err) => console.error(err));
  }

  render() {
    let movies = this.state.allMovies;
    let searchTerm = this.state.searchTerm.trim().toLowerCase();
    if (searchTerm.length > 0) {
      movies = movies.filter((movie) => movie.Title.toLowerCase().match(searchTerm));
    }

    let movieList = movies.map((movie, index) => {
      return (
        <tr key={`movie-list-table-${movie.imdbID}`}>
          <td>
            <img
              className="img-fluid"
              src={movie.PosterThumb}
              alt={movie.Title}
              style={{ maxHeight: "4rem" }}
            />
          </td>

          <td>{movie.Year}</td>
          <td>{movie.Title}</td>
          <td>{movie.imdbRating}</td>
          <td>{movie.imdbVotes}</td>
          <td>{movie.Country}</td>
          <td>{movie.Genre}</td>
          <td>{movie.Runtime}</td>
          <td>{movie.Rated}</td>
        </tr>
      );
    });
    return (
      <Container>
        <Row>
          <Col>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <div className="search-container">
                <input
                  className="search__input"
                  type="text"
                  placeholder="Filter"
                  onChange={(value) => this.handleChange(value)}
                  value={this.state.searchTerm}
                />
                <a className="btn fa fa-search search-button">{" "}</a>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered variant="light">
              <thead>
                <tr>
                  <th>Poster</th>
                  <th>Year</th>
                  <th>Movie Title</th>
                  <th>Rating</th>
                  <th>Votes</th>
                  <th>Country</th>
                  <th>Genre</th>
                  <th>Runtime</th>
                  <th>Rated</th>
                </tr>
              </thead>
              <Fade bottom big cascade>
                <tbody>{movieList}</tbody>
              </Fade>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button block rounded variant="success" onClick={this.loadMore}>
              Load more
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Movies;
