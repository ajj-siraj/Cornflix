import React from "react";
import { Col} from "react-bootstrap";
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
        src={props.movie.PosterFeat}
        alt={props.movie.Title}
        style={{margin: 'auto'}}
      />
    </>
  );
};

class FeaturedMovies extends React.Component {

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
            slidesToShow: 6,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 1300,
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
          breakpoint: 1100,
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
          breakpoint: 890,
          settings: {
            dots: true,
            slidesToShow: 3.5,
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
            slidesToShow: 3,
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
            slidesToShow: 2.5,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 580,
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
          breakpoint: 480,
          settings: {
            dots: true,
            slidesToShow: 1.5,
            draggable: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
          },
        },
        {
          breakpoint: 385,
          settings: {
            dots: false,
            slidesToShow: 1,
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
        
          <MovieCard key={`featured-${movie.imdbID}`} movie={movie} toggleModal={this.props.toggleMovieModal} />
        
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
