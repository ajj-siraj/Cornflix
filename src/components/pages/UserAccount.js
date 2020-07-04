import React from "react";
import {
  Container,
  Col,
  Row,
  Tabs,
  Tab,
  Alert,
  Form,
  Button,
  Nav,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { apiServerBaseUrl } from "../../config";
import axios from "axios";
import cogoToast from "cogo-toast";

import { Form as FinalForm, Field } from "react-final-form";

import ProfileTab from "./ProfileTab";
import AccountTab from "./AccountTab";
import ListsTab from "./ListsTab";

import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import Flash from "react-reveal/Flash";
import Slide from "react-reveal/Slide";

class UserAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switch: false,
      checkdisabled: false,
    };

    this.setKey = this.setKey.bind(this);

  }

  setKey(k) {
    this.setState({ selectedKey: k });
  }

  render() {
    if (!this.props.user.isLoggedIn) {
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
                You are not logged in.
              </p>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Fade>
        <Container fluid>
          <Row className="justify-content-center text-center">
            <Col className="text-center">
              <Tabs
                fill
                className="text-center"
                activeKey={this.state.selectedKey || this.props.tab.tab}
                onSelect={(k) => this.setKey(k)}
              >
                <Tab eventKey="profile" title="Profile">
                  <ProfileTab {...this.props}/>
                </Tab>

                <Tab eventKey="account" title="Account">
                  <AccountTab {...this.props}/>
                </Tab>

                <Tab eventKey="my-lists" title="My Lists">
                  <ListsTab {...this.props}/>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Fade>
    );
  }
}

export default UserAccount;
