import React from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import Slider from "react-slick";
import "../css/FeaturedMovies.css";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

const MovieCard = (props) => {
  return (
    <>
      <img
        onClick={() => props.toggleModal(props.movie, props.poster)}
        className="slider-movie-img"
        src={props.movie.image}
        alt={props.movie.title}
        style={{ height: 200 }}
      />
    </>
  );
};

class FeaturedMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviePosters: [],
    };
  }

  componentDidMount() {
    //Used imdb-api to retrieve top movies list
    const imdbAPI = "https://imdb-api.com/en/API/Top250Movies/k_39DL92RX";

    fetch(imdbAPI)
      .then((response) => response.json())
      .then((response) => response.items.slice(0, 10))
      .then((res) => this.setState({ movies: res }))
      .then(() => {
        //fetch new poster data
        //I was here last time trying to fetch the right posters for the modal

        this.state.movies.map((movie) => {
          let imdbAPI_Poster = `https://imdb-api.com/en/API/Posters/k_39DL92RX/${movie.id}`;
          fetch(imdbAPI_Poster)
            .then((res) => res.json())
            .then((res) => res.posters.find((poster) => poster.language === "en"))
            .then( res => console.log("THIS IS RES: ", res.id))
            .then((res) =>
              this.setState((prevState) => {
                let moviePosters = prevState.moviePosters;
                console.log("LAST movieposters: ", moviePosters)
                // console.log("WTF ", res.id)
                if(moviePosters == undefined || moviePosters[moviePosters.length-1].id !== res.id) {
                  moviePosters.push(res);
                }
                
                return { ...prevState, moviePosters: moviePosters };
              })
            )
            .then((res) => console.log(this.state))
            .catch((err) => console.error(err));
        });
      })
      // .then(() => console.log(this.state))
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
        <>
          <MovieCard key={movie.id} movie={movie} toggleModal={this.props.toggleMovieModal} 
          poster={this.state.moviePosters.find(poster => poster.id == movie.id)}/>
        </>
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
