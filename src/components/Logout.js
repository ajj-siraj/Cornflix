import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { apiServerBaseUrl } from "../config";
import axios from "axios";

import Bounce from "react-reveal/Bounce";
import Fade from "react-reveal/Fade";
import cogoToast from "cogo-toast";

const Logout = (props) => {
  const handleLogout = async () => {
    let res = await axios.get(`${apiServerBaseUrl}/users/logout`, { withCredentials: true });

    if (!res.data.success) {
      cogoToast.error("Something went wrong.");
      return;
    }
    cogoToast.success("You have been logged out successfully.");
    props.logoutUser();
    props.match.history.push("/");
    window.location.reload();
  };

  const handleReturn = () => {
    props.match.history.push("/");
  };

  return (
    <Container>
      <Row className="justify-content-center align-self-center text-center mb-5">
        <Col lg="6">
          <Bounce>
            <p
              style={{
                marginTop: "20%",
                marginBottom: "20%",
                padding: "20px",
                borderRadius: "20px",
                backgroundColor: "#5a5a5a",
              }}
            >
              Are you sure you want to logout?
            </p>
          </Bounce>
          <Fade left>
            <Button block variant="success" onClick={handleLogout}>
              Yes
            </Button>
          </Fade>
          <Fade right>
            <Button block variant="danger" onClick={handleReturn}>
              No, take me back
            </Button>
          </Fade>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
