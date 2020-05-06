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
  constructor(props) {
    super(props);
  }

  render() {
    let settings = {
      dots: true,
      slidesToShow: 7,
      draggable: true,
      centerMode: true,
      centerPadding: '0px',
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
    let topTen = this.props.movies.map((movie, index) => {
      return (
        
          <MovieCard key={movie.id} movie={movie} toggleModal={this.props.toggleMovieModal} />
        
      );
    });
    // let topTen = <div></div>;

    return (
      <Col>
        <h1 className="display-4 text-center m-4 heading">Top Rated</h1>
        <Slider {...settings}>{topTen}</Slider>
      </Col>
    );
  }
}

export default FeaturedMovies;
