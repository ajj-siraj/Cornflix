import React from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import { apiServerBaseUrl } from "../config";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let { value } = event.target;

    this.setState((prevState) => ({ ...prevState, searchTerm: value }));
  }

  componentDidMount() {
    this._isMounted = true;

    let query = this.props.match.match.params.query;

    fetch(`${apiServerBaseUrl}/search?q=${query}`)
      .then((res) => res.json())
      // .then((res) => alert(JSON.stringify(res)));

      .then(
        (res) =>
          this._isMounted &&
          res.status === 200 &&
          this.setState((prevState) => ({ ...prevState, searchResults: res.data }))
      )
      .catch((err) => console.error(err));
  }

  componentWillUnmount() {
    //fix memory leak warning
    this._isMounted = false;
  }

  render() {
    let movies = this.state.searchResults;

    let movieList = movies.map((movie, index) => {
      return (
        <tr key={`search-result-table-${movie.imdbID}`}>
          {/* <Link to={`/movies/${movie.imdbID}`}> */}
          <td>
            <img
              className="img-fluid"
              src={movie.PosterThumb}
              alt={movie.Title}
              style={{ maxHeight: "4rem" }}
            />
          </td>
          {/* </Link> */}
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
              <tbody>
                {movieList.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No Results.
                    </td>
                  </tr>
                ) : (
                  movieList
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchResults;
