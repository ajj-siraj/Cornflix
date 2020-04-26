import React from "react";
import { Col, Row } from "react-bootstrap";
import "../css/FeaturedMovies.css";

const MovieCard = (props) => {
  //Was here last time, the plots array returns undefined when referenced by index
  console.log("PLOT from INSIDE moviecard: ", props.plot);
  return (
    <>
      <Row className="no-gutters">
        <h4 className="text-center p-4">{props.movie.title}</h4>
      </Row>
      <Row className="no-gutters">
        <Col lg={6} className="p-3">
          <img src={props.movie.image} alt={props.movie.title} />
        </Col>
        <Col lg={6} className="p-3">
          <p>{props.plot}</p>
        </Col>
      </Row>
    </>
  );
};

class FeaturedMovies extends React.Component {
  //I was here last time, no movies database to use so I used OMDB api, to be implemented next time
  constructor() {
    super();
    this.state = {
      movies: [],
      plots: []
    };
  }

  componentDidMount() {
    //Used imdb-api to retrieve top movies list, and omdbapi for the plots of each movie
    let plots = []
    fetch("https://imdb-api.com/en/API/Top250Movies/k_39DL92RX")
      .then((response) => response.json())
      .then((response) => response.items.slice(0, 10))
      .then((res) => this.setState({ movies: res }))
      .then(() => console.log(this.state))
      .then(() => {
        this.state.movies.forEach((movie) => {
          fetch(`http://www.omdbapi.com/?apikey=c9b9da6f&i=${movie.id}&plot=short`)
          .then(res => res.json())
          .then(res => plots.push(res.Plot))
          .catch(err => console.error(err))
        });
        console.log("PLOTS: ", plots);
      })
      .catch((err) => console.error("FIRST fetch failed!"));
      this.setState(prevState => ({...prevState, plots: plots}));
  }

  render() {
    let topTen = this.state.movies.map((movie, index) => {
      return (
        <Col lg={4} key={movie.id} className="movie-card">
          <MovieCard movie={movie} plot={this.state.plots.index}/>
          {/* {console.log("INDEX IS: ", index)} */}
        </Col>
      );
    });
    return <>{topTen}</>;
  }
}

export default FeaturedMovies;
