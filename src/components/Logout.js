import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';


const Logout = (props) => {

  const handleLogout = () => {
    // console.log("PROPS in Logout: ", props);
    
    props.logoutUser({isLoggedIn: false});
    props.match.history.push('/');
  }

  const handleReturn = () => {
    // console.log("PROPS in Logout: ", props);
    props.match.history.push('/');
  }

  return (
    <Container>
      <Row className="justify-content-center align-self-center text-center">
        <Col lg="6">
          <p
            style={{
              marginTop: "40%",
              marginBottom: "40%",
              padding: "20px",
              borderRadius: "20px",
              backgroundColor: "#5a5a5a",
            }}
          >
            Are you sure you want to logout?
          </p>
          <Button block variant="success" onClick={handleLogout}>Yes</Button>
          <Button block variant="danger" onClick={handleReturn}>No, take me back</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Logout;