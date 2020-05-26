import React from "react";
import { Container, Col, Row, Tabs, Tab, Alert, Form, Button } from "react-bootstrap";
import { defaultPics } from "../../data";
import { apiServerBaseUrl } from "../../config";
import axios from "axios";

import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import Flash from "react-reveal/Flash";
import Slide from "react-reveal/Slide";

class UserAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.setKey = this.setKey.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  setKey(k) {
    this.setState({ selectedKey: k });
  }

  //read file data and add to state & display errors if invalid type.
  readFile(e) {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (!file.type.includes("image")) {
        alert("Invalid file type. Please upload a PNG or JPEG image format.");
      } else if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg")
      ) {
        alert("Invalid file type. Please upload a PNG or JPEG image format.");
      } else {
        console.log(file);
        this.setState((prevState) => ({ ...prevState, file: file }));
      }
    }
  }

  //upload file
  handleUpload() {
    const form = new FormData();
    form.append("image", this.state.file);

    axios
      .post(`${apiServerBaseUrl}/file/upload`, form, { withCredentials: true })
      .then((res) => {
        if (!res.data.success) {
          alert("Upload failed.");
        }
        this.props.validateUser();
      })
      .catch((err) => console.error(err));
  }

  render() {
    if(!this.props.user.isLoggedIn){
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
                id="controlled-tab-example"
                activeKey={this.state.selectedKey}
                onSelect={(k) => this.setKey(k)}
              >
                <Tab eventKey="profile" title="Profile">
                  <Row className="justify-content-center mt-5 mb-5">
                    <Col xs="6" md="4">
                      <Flip bottom>
                        <img
                          className="rounded-circle"
                          src={`${apiServerBaseUrl}/file/image/${
                            this.props.user.profilePic || "caaed6a8ba225476b2137d33d6bc53aa.png"
                          }`}
                          style={{ width: "250px", height: "250px", margin: "30px" }}
                        />
                      </Flip>
                      <Slide left>
                        <Form>
                          <Form.File
                            id="image"
                            label={
                              this.state.file === undefined
                                ? "Upload your avatar"
                                : this.state.file.name
                            }
                            custom
                            onChange={this.readFile}
                          />
                          <Button onClick={this.handleUpload}>Upload</Button>
                        </Form>
                      </Slide>
                    </Col>
                    <Col xs="6" md="4">
                      <Flash>
                        <Alert variant="info">
                          Your publicly available info is on this tab. If you do not wish your info
                          to be public please check the button below.
                        </Alert>
                      </Flash>
                      <Slide right>
                        <div className="user-info">
                          <div>
                            Username:{" "}
                            <span className="user-info-data">{this.props.user.username}</span>
                          </div>
                          <div>
                            First Name:{" "}
                            <span className="user-info-data">{this.props.user.firstname}</span>
                          </div>
                          <div>
                            Last Name:{" "}
                            <span className="user-info-data">{this.props.user.lastname}</span>
                          </div>
                        </div>
                      </Slide>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="account" title="Account">
                  CONTENT2
                </Tab>
                <Tab eventKey="my-lists" title="My Lists">
                  CONTENT3
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
