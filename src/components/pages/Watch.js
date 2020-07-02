import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import Rating from "react-rating";
import { apiServerBaseUrl } from "../../config";

import Fade from "react-reveal/Fade";
import Tada from "react-reveal/Tada";
import cogoToast from "cogo-toast";

const emptySymbols = [
  "fa fa-star-o fa-2x rating-low",
  "fa fa-star-o fa-2x rating-low",
  "fa fa-star-o fa-2x rating-low",
  "fa fa-star-o fa-2x rating-medium",
  "fa fa-star-o fa-2x rating-medium",
  "fa fa-star-o fa-2x rating-medium",
  "fa fa-star-o fa-2x rating-high",
  "fa fa-star-o fa-2x rating-high",
  "fa fa-star-o fa-2x rating-high",
  "fa fa-star-o fa-2x rating-high",
];

const fullSymbols = [
  "fa fa-star fa-2x rating-low",
  "fa fa-star fa-2x rating-low",
  "fa fa-star fa-2x rating-low",
  "fa fa-star fa-2x rating-medium",
  "fa fa-star fa-2x rating-medium",
  "fa fa-star fa-2x rating-medium",
  "fa fa-star fa-2x rating-high",
  "fa fa-star fa-2x rating-high",
  "fa fa-star fa-2x rating-high",
  "fa fa-star fa-2x rating-high",
];

class Watch extends React.Component {
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

  // componentDidMount() {
  //   const result = this.decideBtnTxt();

  //   this.setState((prevState) => ({
  //     ...prevState,
  //     btnText: result,
  //     btnDisabled: result === "Already in Favorites",
  //   }));
  // }
  render() {
    let movie =
      this.props.data.topMovies.find(
        (movie) => movie.imdbID === this.props.match.match.params.movieid
      ) ||
      this.props.data.latestMovies.find(
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
        <Row className="justify-content-center">
          <Col xs="12" className="align-items-center text-center">
            <div>
              <iframe
                
                src="https://www.youtube.com/embed/KAOdjqyG37A"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{width: "90%", height: "405px", maxWidth: "720px"}}
              ></iframe>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center text-center mt-5">
          <Col xs="12" className="text-center">
            <span>Your rating: </span>
            <Rating stop={10} emptySymbol={emptySymbols} fullSymbol={fullSymbols} />
          </Col>
          <Col xs="12" className="text-center">
            <Fade right cascade>
              <Button
                variant="danger"
                onClick={this.addFavorite}
                disabled={this.state.btnDisabled}
              >
                {btnText}
              </Button>
            </Fade>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Watch;
