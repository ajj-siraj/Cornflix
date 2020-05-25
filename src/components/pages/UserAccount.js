import React from "react";
import { Container, Col, Row, Tabs, Tab, Button } from "react-bootstrap";

class UserAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.setKey = this.setKey.bind(this);
  }

  setKey(k) {
    this.setState({selectedKey: k})
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Tabs id="controlled-tab-example" activeKey={this.state.selectedKey} onSelect={(k) => this.setKey(k)}>
              <Tab eventKey="home" title="Home">
                CONTENT1
              </Tab>
              <Tab eventKey="profile" title="Profile">
                CONTENT2
              </Tab>
              <Tab eventKey="contact" title="Contact">
                CONTENT3
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserAccount;
