import React from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import "../css/FeaturedMovies.css";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";


const MovieCard = (props) => {
  //Was here last time, the plots array returns undefined when referenced by index
  // console.log("PLOT from INSIDE moviecard: ", props.plot);
  return (
    <>
      <img src={props.movie.image} alt={props.movie.title} />
      {/* <Row className="no-gutters">
        <h4 className="text-center p-4">{props.movie.title}</h4>
      </Row>
      <Row className="no-gutters">
        <Col lg={6} className="p-3">
          <img src={props.movie.image} alt={props.movie.title} />
        </Col>
        <Col lg={6} className="p-3">
          <p>{props.plot}</p>
        </Col>
      </Row> */}
    </>
  );
};

class FeaturedMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      plots: [],
    };
  }

  componentDidMount() {
    //Used imdb-api to retrieve top movies list, and omdbapi for the plots of each movie
    const imdbAPI = "https://imdb-api.com/en/API/Top250Movies/k_39DL92RX";
    const omdbAPI = `http://www.omdbapi.com/?apikey=c9b9da6f&plot=short`;
    let plots = [];

    fetch(imdbAPI)
      .then((response) => response.json())
      .then((response) => response.items.slice(0, 10))
      .then((res) => this.setState({ movies: res }))
      // .then(() => console.log(this.state))
      .then(() => {
        this.state.movies.forEach((movie) => {
          fetch(`${omdbAPI}&i=${movie.id}`)
            .then((res) => res.json())
            .then((res) => plots.push(res.Plot))
            .catch((err) => console.error(err));
        });
        // console.log("PLOTS: ", plots);
      })
      .catch((err) => console.error("FIRST fetch failed!"));
    this.setState((prevState) => ({ ...prevState, plots: plots }));
  }

  render() {
    let settings = {
      dots: true,
      slidesToShow: 5,
      draggable: true,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: true,
            slidesToShow: 3,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 576,
          settings: {
            dots: true,
            slidesToShow: 1,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
      ],
    };
    let topTen = this.state.movies.map((movie, index) => {
      return (
        <MovieCard key={movie.id} movie={movie} />
      );
    });

    return (
      <Col>
        <h1 className="display-4 text-center m-4">Top 10 of all time</h1>
        <Slider {...settings}>{topTen}</Slider>
      </Col>
    );
  }
}

export default FeaturedMovies;
