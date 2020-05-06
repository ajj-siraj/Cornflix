import React from "react";
import { Col, Row, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let movieList = this.props.movies.map((movie, index) => {
      return (
        
          <tr key={`movie-list-table-${movie.imdbID}`}>
            <Link to={`/movies/${movie.imdbID}`}>
            <td>
              <img className="img-fluid" src={movie.Poster} alt={movie.Title} style={{maxHeight: '4rem'}}/>
            </td>
            </Link>
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
          <div style={{marginTop: '20px', marginBottom: '20px'}}>
            <SearchBox />
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
              <tbody>{movieList}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Movies;
