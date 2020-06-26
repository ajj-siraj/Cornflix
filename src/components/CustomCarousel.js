import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import jumboImg1 from "../assets/img/dayofthedoctor1.jpg";
import jumboImg2 from "../assets/img/the-shawshank-redemption.jpg";
import jumboImg3 from "../assets/img/pride-and-prejudice.jpg";

class CustomCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: {
        isOpen: false,
      },
      movie: [],
    };
  }

  render() {
    let jumboImgs = [jumboImg1, jumboImg2, jumboImg3];
    let topThree = this.props.movies.slice(0, 3);

    let carouselItems = topThree.map((movie, index) => {
      return (
        <Carousel.Item key={`carousel-movie-${movie.imdbID}`}>
          <img className="d-block w-100" src={jumboImgs[index]} alt={`img-${index}`} />

          <h1 className="display-1 mycustom-carousel-title">{movie.Title}</h1>
          <p className="mycustom-carousel-caption">{movie.Plot}</p>
          <Link to={`/watch/${movie.imdbID}`}>
            <div className="btn jumbo-button">
              Watch Now <span className="fa fa-play-circle"></span>
            </div>
          </Link>
          {/* </Carousel.Caption> */}
        </Carousel.Item>
      );
    });

    return (
      <Carousel
        interval="2000"
        fade="true"
        controls={false}
        indicators={true}
        prevIcon={null}
        nextIcon={null}
      >
        {carouselItems}
      </Carousel>
    );
  }
}

export default CustomCarousel;
