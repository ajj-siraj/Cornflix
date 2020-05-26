import React from "react";
import { Container, Col, Row, Tabs, Tab, Alert, Form, Button, Nav } from "react-bootstrap";
import { defaultPics } from "../../data";
import { apiServerBaseUrl } from "../../config";
import axios from "axios";

import { Captcha } from "../Signup";
import { Form as FinalForm, Field } from "react-final-form";
import ReCAPTCHA from "react-google-recaptcha";
import * as config from "../../config";
import * as data from "../../data";

import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import Flash from "react-reveal/Flash";
import Slide from "react-reveal/Slide";
import Bounce from "react-reveal/Bounce";

// Tedious form data/code begins here:
//validators
const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

let countries = data.countryList;
let countriesList = countries.map((country, index) => {
  return (
    <option value={data.countryCodes[index]} key={`${country}-${index}`}>
      {country}
    </option>
  );
});

// Tedious form data/code ends here.
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

  handleAccountSubmit() {}

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
                activeKey={this.state.selectedKey}
                onSelect={(k) => this.setKey(k)}
              >
                <Tab eventKey="profile" title="Profile">
                  <Row className="justify-content-center mt-5 mb-5">
                    <Col xs="12" md="6">
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
                        <Alert variant="info" className="mt-4">
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
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="first">Tab 1</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={9}>
                        <Tab.Content>
                          <Tab.Pane eventKey="first">
                            <Fade>
                              <Container>
                                <Flash>
                                  <Alert variant="info">You can change your personal info here, except your username.</Alert>
                                </Flash>
                                <Row className=" mb-5 justify-content-left text-left">
                                  <Col
                                    lg="10"
                                    style={{
                                      padding: "5%",
                                    }}
                                  >
                                    <FinalForm
                                      onSubmit={this.handleAccountSubmit}
                                      validate={(values) => {
                                        const errors = {};
                                        return errors;
                                      }}
                                      render={({
                                        handleSubmit,
                                        form,
                                        submitting,
                                        pristine,
                                        values,
                                      }) => (
                                        <Form onSubmit={handleSubmit}>
                                          <Form.Row>
                                            <Col>
                                              <Field name="firstName" validate={required}>
                                                {({ input, meta }) => (
                                                  <Form.Group as={Row}>
                                                    <Form.Label column sm="3">
                                                      First Name
                                                    </Form.Label>
                                                    <Col sm="9">
                                                      <input
                                                        {...input}
                                                        type="text"
                                                        placeholder="First Name"
                                                        className="form-control"
                                                        value={input.value || this.props.user.firstname}
                                                      />
                                                      {meta.error && meta.touched && (
                                                        <Fade bottom>
                                                          <div className="form-validation-feedback validation-error">
                                                            {meta.error}
                                                          </div>
                                                        </Fade>
                                                      )}
                                                    </Col>
                                                  </Form.Group>
                                                )}
                                              </Field>
                                            </Col>
                                          </Form.Row>

                                          <Form.Row>
                                            <Col>
                                              <Field name="lastName" validate={required}>
                                                {({ input, meta }) => (
                                                  <Form.Group as={Row}>
                                                    <Form.Label column sm="3">Last Name</Form.Label>
                                                    <Col sm="9">
                                                      <input
                                                      {...input}
                                                      type="text"
                                                      placeholder="Last Name"
                                                      className="form-control"
                                                      value={input.value || this.props.user.lastname}
                                                    />
                                                    {/* I was here figuring out how to display registered user data on the form correctly */}
                                                    {meta.error && (
                                                      <Fade bottom>
                                                        <div className="form-validation-feedback validation-error">
                                                          {meta.error}
                                                        </div>
                                                      </Fade>
                                                    )}
                                                    </Col>
                                                    
                                                  </Form.Group>
                                                )}
                                              </Field>
                                            </Col>
                                          </Form.Row>

                                          <Form.Row>
                                            <Col>
                                              <Field name="userName">
                                                {({ input, meta }) => (
                                                  <Form.Group as={Row}>
                                                    <Form.Label column sm="3">Username</Form.Label>
                                                    <Col sm="9">
                                                    <input
                                                      {...input}
                                                      type="text"
                                                      placeholder="Username"
                                                      className="form-control"
                                                      value={this.props.user.username}
                                                      disabled
                                                    />
                                                    
                                                    </Col>
                                                  </Form.Group>
                                                )}
                                              </Field>
                                            </Col>
                                            
                                          </Form.Row>

                                          <Form.Row>
                                            <Col>
                                              <Field name="password-current" validate={required}>
                                                {({ input, meta }) => (
                                                  <Form.Group as={Row}>
                                                    <Form.Label column sm="3">Current Password</Form.Label>
                                                    <Col sm="9">
                                                    <input
                                                      {...input}
                                                      type="password"
                                                      placeholder="Type in your current password"
                                                      className="form-control"
                                                    />
                                                    {meta.error && meta.touched && (
                                                      <Fade bottom>
                                                        <div className="form-validation-feedback validation-error">
                                                          {meta.error}
                                                        </div>
                                                      </Fade>
                                                    )}
                                                    {!meta.error && meta.touched && (
                                                      <Fade bottom>
                                                        <div className="form-validation-feedback validation-ok">
                                                          {"Strong password"}
                                                        </div>
                                                      </Fade>
                                                    )}
                                                    </Col>
                                                  </Form.Group>
                                                )}
                                              </Field>
                                            </Col>
                                            </Form.Row>

                                          {/* New password change tbd on a separate tab */}
                                          <Form.Row>
                                            {/* <Col>
                                              <Field name="password-new" validate={required}>
                                                {({ input, meta }) => (
                                                  <Form.Group as={Row}>
                                                    <Form.Label column sm="3">Confirm Password</Form.Label>
                                                    <Col sm="9">
                                                    <input
                                                      {...input}
                                                      type="password"
                                                      placeholder="Enter your new password"
                                                      className="form-control"
                                                    />
                                                    {meta.error && meta.touched && (
                                                      <Fade bottom>
                                                        <div className="form-validation-feedback validation-error">
                                                          {meta.error}
                                                        </div>
                                                      </Fade>
                                                    )}
                                                    {!meta.error && meta.touched && (
                                                      <Fade bottom>
                                                        <div className="form-validation-feedback validation-ok">
                                                          {"Passwords match."}
                                                        </div>
                                                      </Fade>
                                                    )}
                                                    </Col>
                                                  </Form.Group>
                                                )}
                                              </Field>
                                            </Col> */}
                                          </Form.Row>


                                          <Form.Row>
                                            <Col>
                                              <Field
                                                name="recaptcha"
                                                component={Captcha}
                                                validate={required}
                                              />
                                            </Col>
                                          </Form.Row>

                                          <Form.Row>
                                            <Col>
                                              <Slide bottom>
                                                <Button block type="submit" disabled={submitting}>
                                                  Submit
                                                </Button>
                                              </Slide>
                                              
                                            </Col>
                                          </Form.Row>
                                          {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                                        </Form>
                                      )}
                                    />
                                  </Col>
                                </Row>
                              </Container>
                            </Fade>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">CONTENT2 </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
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

//i hate forms so much