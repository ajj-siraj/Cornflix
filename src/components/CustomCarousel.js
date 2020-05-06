import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import jumboImg1 from "../assets/img/pulp-fiction-526d500988cb1.jpg";
import jumboImg2 from "../assets/img/the-godfather-5b246f3c573fa.jpg";
import jumboImg3 from "../assets/img/inception-4fdb7d19302dc.jpg";

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
    let carouselItems = jumboImgs.map((img, index) => {
      return (
        <Carousel.Item>
          <img className="d-block w-100" src={img} alt={`img-${index}`} />
          {/* <Carousel.Caption bsPrefix="mycustom-carousel-caption"> */}
          <h1 className="display-1 mycustom-carousel-title">{jumboTitles[index]}</h1>
          <p className="mycustom-carousel-caption">{jumboPlots[index]}</p>
          <Link to={`/movies/${jumboIDs[index]}`}>
            <div className="btn jumbo-button">
              Watch {jumboIDs[index]}
              <span className="fa fa-play-circle"></span>
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
