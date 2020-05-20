import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import {apiServerBaseUrl} from '../config';
import axios from 'axios';

const Logout = (props) => {

  const handleLogout = async () => {
    // console.log("PROPS in Logout: ", props);
    
    let res = await axios.get(`${apiServerBaseUrl}/users/logout`);
    let data = JSON.stringify(res);
    alert(data);
    props.logoutUser({isLoggedIn: false});
    props.match.history.push('/');
  }

  const handleReturn = () => {
    // console.log("PROPS in Logout: ", props);
    props.match.history.push('/');
  }

  return (
    <Container>
      <Row className="justify-content-center align-self-center text-center mb-5">
        <Col lg="6">
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
          <Button block variant="success" onClick={handleLogout}>Yes</Button>
          <Button block variant="danger" onClick={handleReturn}>No, take me back</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Logout;