import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import FeaturedMovies from "./FeaturedMovies";
import News from "./News";
import MovieModal from "./MovieModal";
import LatestMovies from "./LatestMovies";

import jumboImg1 from "../assets/img/pulp-fiction-526d500988cb1.jpg";
import jumboImg2 from "../assets/img/the-godfather-5b246f3c573fa.jpg";
import jumboImg3 from "../assets/img/inception-4fdb7d19302dc.jpg";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: {
        isOpen: false,
      },
      movie: [],
    };

    this.toggleMovieModal = this.toggleMovieModal.bind(this);
  }

  toggleMovieModal(movie) {
    this.setState((prevState) => ({
      modal: { isOpen: !prevState.modal.isOpen },
      movie: movie,
    }));
  }

  render() {
    let jumboTitles = ["Pulp Fiction", "The Godfather", "Inception"];
    let jumboPlots = [
      "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two \
      hit men who are out to retrieve a suitcase stolen from their employer, mob boss \
      Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife \
      Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. \
      Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose \
      his fight. The lives of these seemingly unrelated people are woven together \
      comprising of a series of funny, bizarre and uncalled-for incidents.",
      "The Godfather 'Don' Vito Corleone is the head of the Corleone mafia family in \
      New York. He is at the event of his daughter's wedding. Michael, Vito's youngest \
      son and a decorated WW II Marine is also present at the wedding. Michael seems \
      to be uninterested in being a part of the family business. Vito is a powerful \
      man, and is kind to all those who give him respect but is ruthless against \
      those who do not. But when a powerful and treacherous rival wants to sell \
      drugs and needs the Don's influence for the same, Vito refuses to do it. \
      What follows is a clash between Vito's fading old values and the new ways \
      which may cause Michael to do the thing he was most reluctant in doing and \
      wage a mob war against all the other mafia families which could tear the \
      Corleone family apart.",
      "Dom Cobb is a skilled thief, the absolute best in the dangerous art of \
      extraction, stealing valuable secrets from deep within the subconscious \
      during the dream state, when the mind is at its most vulnerable. Cobb's \
      rare ability has made him a coveted player in this treacherous new world \
      of corporate espionage, but it has also made him an international fugitive \
      and cost him everything he has ever loved. Now Cobb is being offered a \
      chance at redemption. One last job could give him his life back but only \
      if he can accomplish the impossible, inception. Instead of the perfect \
      heist, Cobb and his team of specialists have to pull off the reverse: \
      their task is not to steal an idea, but to plant one. If they succeed, \
      it could be the perfect crime. But no amount of careful planning or \
      expertise can prepare the team for the dangerous enemy that seems to \
      predict their every move. An enemy that only Cobb could have seen coming.",
    ];
    let jumboIDs = ["tt0110912", "tt0071562", "tt1375666"];

    let jumboImgs = [jumboImg1, jumboImg2, jumboImg3];
    let jumboImgsRendered = jumboImgs.map((img, index) => {
      return (
        <div>
          <img
            key={`jumboimg-${index}`}
            src={img}
            alt={`img-${index}`}
            className="img-fluid"
            style={{ width: "100%", objectFit: "cover", pointerEvents: "none" }}
          />
          <h1 className="display-1 jumbo-title">{jumboTitles[index]}</h1>
          <p className="jumbo-plot">{jumboPlots[index]}</p>
          <Link to={`/movies/${jumboIDs[index]}`}>
            <div className="btn jumbo-button">
              Watch {jumboIDs[index]}<span className="fa fa-play-circle"></span>
            </div>
          </Link>
        </div>
      );
    });

    let settings = {
      dots: false,
      slidesToShow: 1,
      speed: 500,
      autoplay: true,
      arrows: false,
      swipe: false,
      pauseOnHover: false,
      fade: true,
      adaptiveHeight: true,
      useCSS: true,
    };

    return (
      <>
        <MovieModal
          isOpen={this.state.modal.isOpen}
          movie={this.state.movie}
          toggleMovieModal={this.toggleMovieModal}
        />
        <Container fluid>
          <Row>
            <Col className="m-0 p-0">
              <Slider {...settings}>{jumboImgsRendered}</Slider>
            </Col>
          </Row>
          <Row className="no-gutters justify-content-center align-content-center m-4">
            <FeaturedMovies movies={this.props.movies} toggleMovieModal={this.toggleMovieModal} />
          </Row>
          <Row>
            <Col lg={8}>
              <LatestMovies movies={this.props.movies} />
            </Col>
            <Col lg={4}>
              <News />
              <div>
                News data retrieved from <a href="https://newsapi.org/">NewsAPI.org</a>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Main;
