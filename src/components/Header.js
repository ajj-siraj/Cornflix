import React from "react";
import { Nav, Navbar, Form, FormControl, Button, Jumbotron } from "react-bootstrap";
import logo from "../assets/img/logo.png";
// import jumboImg1 from "../assets/img/pulp-fiction-55e9dda8ca793.jpg";
import jumboImg1 from "../assets/img/pulp-fiction-526d500988cb1.jpg";
import jumboImg2 from "../assets/img/the-godfather-5b246f3c573fa.jpg";
import jumboImg3 from "../assets/img/inception-4fdb7d19302dc.jpg";
import "../css/Header.css";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // clicked: true
    };
    // this.myRef = React.createRef();
  }

  // handleClick(node){
  //   node.current.click();
  //   console.log(node.current);
  //   console.log("click triggered");
  // }
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
    // jumboIDs.forEach((id) => {
    //   let mv = this.props.movies.find((movie) => movie.imdbID == id);
    //   jumboTitles.push(mv);
    //   console.log(mv);
    // });
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
            // onClick={() => this.handleClick(this.myRef)}
          />
          <h1 className="display-1 jumbo-title">{jumboTitles[index]}</h1>
          <p className="jumbo-plot">{jumboPlots[index]}</p>
          <div className="btn jumbo-button">
            Watch <span className="fa fa-play-circle"></span>
          </div>
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

    console.log("PROPS INSIDE Header: ", this.props);
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home" className="align-middle">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-middle"
              alt="logo"
            />{" "}
            CornFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#movies">Movies</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {/* <Jumbotron fluid style={{ padding: 0, height: "100vh" }}> */}
        <Slider {...settings}>{jumboImgsRendered}</Slider>
        {/* </Jumbotron> */}
        {/* <div ref={this.myRef}></div> */}
      </>
    );
  }
}

export default Header;
