import React from "react";
import { Container, Col, Row, Tab, Button, Nav } from "react-bootstrap";
import { apiServerBaseUrl } from "../../config";
import axios from "axios";
import cogoToast from "cogo-toast";

//favorites component
const Favorites = (props) => {
  const removeFav = (id) => {
    const form = { imdbID: id };

    axios
      .delete(`${apiServerBaseUrl}/favorites`, { withCredentials: true, data: form })
      .then((res) => {
        if (!res.data.success) {
          cogoToast.error("Something went wrong.");
          return;
        }
        if (res.data.success) {
          cogoToast.success("Removed successfully.");
          props.trackTab("my-lists");
          props.validateUser();
        }
      })
      .catch(() => cogoToast.error("Something went wrong."));
  };

  if (!props.favorites || props.favorites.length === 0) {
    return (
      <div className="list-container">
        <div className="list-item">Your list is empty.</div>
      </div>
    );
  }
  let favs = props.favorites.map((fav, idx) => {
    return (
      <Row key={`fav-list-${idx}-${fav.imdbID}`} className="list-item">
        <Col md={3}>
          <img src={fav.PosterThumb} alt={fav.Title} />
        </Col>
        <Col>
          <div>{fav.Title}</div>
          <div>Rating: {fav.imdbRating}</div>
        </Col>
        <Col md={2}>
          <Button block variant="danger" onClick={() => removeFav(fav.imdbID)}>
            X
          </Button>
        </Col>
      </Row>
    );
  });
  return <div className="list-container">{favs}</div>;
};

//Lists tab
const ListsTab = (props) => {
  return (
    <Tab.Container id="left-tabs-lists" defaultActiveKey="first-list">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column nav-tab-pill">
            <Nav.Item>
              <Nav.Link eventKey="first-list">My Favorites</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second-list">History</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first-list">
              <Container fluid className="mt-2">
                <Row className=" mb-5 justify-content-left text-left">
                  <Col
                    lg="10"
                    style={{
                      padding: "5%",
                    }}
                  >
                    <Favorites
                      favorites={props.user.favorites}
                      trackTab={props.trackTab}
                      validateUser={props.validateUser}
                    />
                  </Col>
                </Row>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="second-list">
              {/* History tbd at a later time */}
              <Container>
                <Row className="mt-5 mb-5 text-left">
                  <Col md="8"></Col>
                </Row>
              </Container>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ListsTab;
