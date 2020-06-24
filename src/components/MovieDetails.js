import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";

import { apiServerBaseUrl } from "../config";

import Fade from "react-reveal/Fade";
import Tada from "react-reveal/Tada";
import Pulse from "react-reveal/Pulse";
import cogoToast from "cogo-toast";

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false,
    };

    this.addFavorite = this.addFavorite.bind(this);
    this.decideBtnTxt = this.decideBtnTxt.bind(this);
  }

  addFavorite() {
    if (!this.props.user.isLoggedIn) {
      cogoToast.error("You are not logged in!");
      this.props.match.history.push("/login");
      return;
    }
    axios
      .post(
        `${apiServerBaseUrl}/favorites`,
        { movieID: this.props.match.match.params.movieid },
        {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        }
      )
      .then((res) => {
        if (!res.data.success) {
          cogoToast.error(res.data.message);
          return;
        }
        cogoToast.success(res.data.message);
        this.props.validateUser();
      })
      .catch(() => cogoToast.error("An error occurred."));
  }

  decideBtnTxt() {
    let paramID = this.props.match.match.params.movieid;
    if (this.props.user.isLoggedIn) {
      if (this.props.user.favorites) {
        let favorites = this.props.user.favorites;

        if (favorites.find((movie) => movie.imdbID === paramID)) {
          return "Already in Favorites";
        }
        return "Add to Favorites";
      }
      return "Add to Favorites";
    }
    return "Please Login to Add Favorites";
  }

  componentDidMount() {
    const result = this.decideBtnTxt();

    this.setState((prevState) => ({
      ...prevState,
      btnText: result,
      btnDisabled: result === "Already in Favorites",
    }));
  }
  render() {
    let movie =
      this.props.topMovies.find(
        (movie) => movie.imdbID === this.props.match.match.params.movieid
      ) ||
      this.props.latestMovies.find(
        (movie) => movie.imdbID === this.props.match.match.params.movieid
      );

    let btnText = this.decideBtnTxt();
    if (btnText === "Already in Favorites.") {
      this.setState((prevState) => ({ ...prevState, btnDisabled: true }));
    }

    return (
      <Container>
        <Row className="no-gutters">
          <Col xs={2} className="p-0">
            {/* <Link to="/" className="p-0"> */}
            <Tada>
              <>
                <span
                  className="fa fa-arrow-left"
                  style={{ marginTop: "50px", fontSize: "1.5rem", cursor: "pointer" }}
                  onClick={this.props.match.history.goBack}
                ></span>
                <span
                  onClick={this.props.match.history.goBack}
                  style={{
                    marginTop: "50px",
                    fontSize: "1.5rem",
                    fontFamily: "Calibri",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Back
                </span>
              </>
            </Tada>
            {/* </Link> */}
          </Col>

          <Col>
            <Fade right>
              <h1 className="display-4 text-center m-4 heading">{movie.Title}</h1>
            </Fade>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Pulse>
              <img src={movie.PosterFeat} alt={movie.Title} className="img-fluid" />
            </Pulse>
          </Col>

          <Col lg="6">
            <Fade right cascade>
              <div>
                <h4 className="text-warning">Plot</h4>
                <p>{movie.Plot}</p>
                <h4 className="text-warning">Rated: </h4>
                <p>
                  {movie.Rated === "N/A" ? (
                    <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                  ) : (
                    movie.Rated
                  )}
                </p>
                <h4 className="text-warning">Writer(s): </h4>
                <p>
                  {movie.Writer === "N/A" ? (
                    <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                  ) : (
                    movie.Writer
                  )}
                </p>
                <h4 className="text-warning">Director: </h4>
                <p>
                  {movie.Director === "N/A" ? (
                    <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                  ) : (
                    movie.Director
                  )}
                </p>
                <h4 className="text-warning">Year: </h4>
                <p>
                  {movie.Year === "N/A" ? (
                    <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                  ) : (
                    movie.Year
                  )}
                </p>
                <h4 className="text-warning">Actors: </h4>
                <p>
                  {movie.Actors === "N/A" ? (
                    <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                  ) : (
                    movie.Actors
                  )}
                </p>
                <h4 className="text-warning">Runtime: </h4>
                <p>
                  {movie.Runtime === "N/A" ? (
                    <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                  ) : (
                    movie.Runtime
                  )}
                </p>
                <h4 className="text-warning">IMDB Rating: </h4>
                <p>
                  {movie.imdbRating === "N/A" ? (
                    <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                  ) : (
                    movie.imdbRating
                  )}
                </p>
                <h4 className="text-warning">IMDB Votes: </h4>
                <p>
                  {movie.imdbVotes === "N/A" ? (
                    <span style={{ color: "orange" }}>Data unavailable in the database.</span>
                  ) : (
                    movie.imdbVotes
                  )}
                </p>
                <div
                  className="btn btn-danger"
                  onClick={this.addFavorite}
                  disabled={this.state.btnDisabled}
                >
                  {btnText}
                </div>
              </div>
            </Fade>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MovieDetails;
