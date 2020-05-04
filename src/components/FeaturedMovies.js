import React from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import Slider from "react-slick";
// import "../css/FeaturedMovies.css";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

const MovieCard = (props) => {
  return (
    <>
      <img
        onClick={() => props.toggleModal(props.movie)}
        className="slider-movie-img"
        src={props.movie.Poster}
        alt={props.movie.Title}
        
      />
    </>
  );
};

class FeaturedMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    //Used imdb-api to retrieve top movies list
    // const imdbAPI = "https://imdb-api.com/en/API/Top250Movies/k_39DL92RX";
    const apiServer = "http://localhost:4000/movies?_limit=10";

    fetch(apiServer)
      .then((response) => response.json())
      .then((res) => this.setState({ movies: res }))
      .then((res) => console.log(this.state.movies))
      .catch((err) => console.error("FIRST fetch failed!"));
  }

  render() {
    let settings = {
      dots: true,
      slidesToShow: 7,
      draggable: true,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 2000,

      responsive: [
        {
          breakpoint: 1600,
          settings: {
            dots: true,
            slidesToShow: 5,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            dots: true,
            slidesToShow: 4,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
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
          breakpoint: 797,
          settings: {
            dots: true,
            slidesToShow: 2.5,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 680,
          settings: {
            dots: true,
            slidesToShow: 2,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 576,
          settings: {
            dots: false,
            slidesToShow: 1.5,
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
        
          <MovieCard key={movie.id} movie={movie} toggleModal={this.props.toggleMovieModal} />
        
      );
    });
    // let topTen = <div></div>;

    return (
      <Col>
        <h1 className="display-4 text-center m-4 border">Top 10 of all time</h1>
        <Slider {...settings}>{topTen}</Slider>
      </Col>
    );
  }
}

export default FeaturedMovies;
