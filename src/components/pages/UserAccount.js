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
  Toast,
} from "react-bootstrap";
import { defaultPics } from "../../data";
import { apiServerBaseUrl } from "../../config";
import axios from "axios";
import cogoToast from "cogo-toast";

import { Form as FinalForm, Field } from "react-final-form";
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

//TODO: clean up this page and separate the components.
//This will be a headache to edit in the future.
//I'm getting nauseous just looking at it.

//TODO: set a default profile picture if user has not uploaded one.
//TODO: Lost password recovery process (add optional email to user profile)

//Favorites component. TODO: move it with its parent component when you re-organize.
const Favorites = (props) => {
  if (!props.favorites) {
    return <div className="list-container">
      <div className="list-item">Testin1</div>
      <div className="list-item">Testin2</div>
    </div>;
  }
  let favs = props.favorites.map((fav, idx) => {
    return (
      <div key={`fav-list-${idx}-${fav.imdbID}`} className="list-item">
        <img src={fav.PosterThumb} />
      </div>
    );
  });
  return <div className="list-container">{favs}</div>;
};
class UserAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switch: false,
      checkdisabled: false,
      show: false,
    };

    this.setKey = this.setKey.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);

    this.toggleToast = this.toggleToast.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
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
        cogoToast.error("Invalid file type. Please upload a PNG or JPEG image format.");
      } else if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg")
      ) {
        cogoToast.error("Invalid file type. Please upload a PNG or JPEG image format.");
      } else {
        console.log(file);
        this.setState((prevState) => ({ ...prevState, file: file }));
      }
    }
  }

  //upload file
  handleUpload() {
    if (!this.state.file) {
      cogoToast.error("No file was selected.");
      return;
    }
    const form = new FormData();
    form.append("image", this.state.file);

    axios
      .post(`${apiServerBaseUrl}/file/upload`, form, { withCredentials: true })
      .then((res) => {
        if (!res.data.success) cogoToast.error("Upload failed.");
        if (res.data.success) {
          this.props.trackTab("profile");
          this.props.validateUser();
        }
      })
      .catch((err) => console.error(err));
    this.setState((prevState) => ({ ...prevState, selectedKey: "profile" }));
  }

  //submit request to update user data
  handleAccountSubmit(values) {
    console.log(values);
    // this.setState((prevState) => ({ ...prevState, selectedKey: "account" }));
    axios
      .post(`${apiServerBaseUrl}/users/account/update`, values, {
        validateStatus: (status) => status < 500,
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.success) {
          cogoToast.error(res.data.message);
          return;
        }
        this.props.trackTab("account");
        cogoToast.success("Your info has been updated successfully.");
        this.props.validateUser();
      })
      .catch((err) => cogoToast.error(err.toString()));
  }

  //make user data private/public
  handleCheckBox(e) {
    const data = { public: !this.props.user.public };
    this.setState((prevState) => ({
      ...prevState,

      checkdisabled: true,
    }));

    axios
      .post(`${apiServerBaseUrl}/users/profile/update`, data, { withCredentials: true })
      .then((res) => {
        this.setState((prevState) => ({ ...prevState, checkdisabled: false }));
        if (res.data.success) {
          this.props.validateUser();
          cogoToast.success(
            `Updated! Your profile is now: ${res.data.data.public ? "public" : "private"}.`,
            { position: "top-center" }
          );
        }
      })
      .catch(() => {
        this.setState((prevState) => ({
          ...prevState,
          checkdisabled: false,
        }));
        cogoToast.error("There was an error. Please try again.");
      });
    console.log("The form: ", data);
  }

  toggleToast() {
    this.setState((prevState) => ({ ...prevState, show: !prevState.show }));
  }
  // enable/disable editing on switch toggle
  toggleEditing(e) {
    this.setState((prevState) => ({ ...prevState, switch: !prevState.switch }));
  }

  handlePasswordSubmit(values) {
    axios
      .post(`${apiServerBaseUrl}/users/account/update-password`, values, {
        validateStatus: (status) => status < 500,
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.success) {
          cogoToast.error(res.data.message.message);
          return;
        }
        cogoToast.success(res.data.message);
        this.props.trackTab("account");
        this.props.validateUser();
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error(err.toString());
      });
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
    console.log(this.state);
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
                  <Row className="justify-content-center mt-5 mb-5 text-center">
                    <Col xs="12" md="6">
                      <Flip bottom>
                        <div>
                          <div
                            className="rounded-circle user-profile-border "
                            style={{
                              backgroundImage: `url(${apiServerBaseUrl}/file/image/${this.props.user.profilePic})`,
                            }}
                          ></div>
                        </div>
                      </Flip>
                      <Slide left>
                        <Form className="mt-5">
                          <Form.File
                            style={{ width: "50%" }}
                            id="image"
                            label={
                              this.state.file === undefined
                                ? "Upload your avatar"
                                : this.state.file.name
                            }
                            custom
                            onChange={this.readFile}
                          />
                          <Button
                            className="btn-green"
                            style={{ marginLeft: "5px", marginBottom: "0" }}
                            onClick={this.handleUpload}
                          >
                            Upload
                          </Button>
                        </Form>
                      </Slide>
                    </Col>
                    <Col xs="6" md="4">
                      <Flash>
                        <Alert variant="info" className="mt-4">
                          Your publicly available info is on this tab. If you do not wish for your
                          info to be public please check the button below. (Username and profile
                          photo are always public)
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
                      <Form>
                        <Form.Check
                          inline
                          type="checkbox"
                          label="Make my data private"
                          checked={!this.props.user.public}
                          disabled={this.state.checkdisabled}
                          onChange={this.handleCheckBox}
                        />
                      </Form>
                    </Col>
                  </Row>
                </Tab>

                <Tab eventKey="account" title="Account">
                  <Tab.Container id="left-tabs-account" defaultActiveKey="first-account">
                    <Row>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column nav-tab-pill">
                          <Nav.Item>
                            <Nav.Link eventKey="first-account">My account</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second-account">Change password</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={9}>
                        <Tab.Content>
                          <Tab.Pane eventKey="first-account">
                            <Fade>
                              <Container fluid className="mt-5">
                                <Flash>
                                  <Alert variant="info">
                                    You can change your personal info here, except your username.
                                  </Alert>
                                </Flash>
                                <Row className=" mb-5 justify-content-left text-left">
                                  <Col
                                    lg="10"
                                    style={{
                                      padding: "5%",
                                    }}
                                  >
                                    <Form.Check
                                      className="mb-3"
                                      type="switch"
                                      id="custom-switch"
                                      label="Enable editing. (Your new data will only be submitted when you click the update button)"
                                      onChange={this.toggleEditing}
                                    />
                                    <FinalForm
                                      onSubmit={this.handleAccountSubmit}
                                      validate={(values) => {
                                        const errors = {};
                                        if (values.userName !== this.props.user.username) {
                                          errors.userName =
                                            "Please enter the same username you registered with.";
                                        }
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
                                                        disabled={!this.state.switch}
                                                        value={
                                                          this.state.switch
                                                            ? input.value
                                                            : this.props.user.firstname
                                                        }
                                                      />
                                                      {meta.error &&
                                                        meta.touched &&
                                                        this.state.switch && (
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
                                                    <Form.Label column sm="3">
                                                      Last Name
                                                    </Form.Label>
                                                    <Col sm="9">
                                                      <input
                                                        {...input}
                                                        type="text"
                                                        placeholder="Last Name"
                                                        className="form-control"
                                                        disabled={!this.state.switch}
                                                        value={
                                                          this.state.switch
                                                            ? input.value
                                                            : this.props.user.lastname
                                                        }
                                                      />
                                                      {/* I was here figuring out how to display registered user data on the form correctly */}
                                                      {meta.error &&
                                                        meta.touched &&
                                                        this.state.switch && (
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
                                                    <Form.Label column sm="3">
                                                      Username
                                                    </Form.Label>
                                                    <Col sm="9">
                                                      <OverlayTrigger
                                                        key="tooltip-username"
                                                        placement="left"
                                                        overlay={
                                                          <Tooltip id={`tooltip-username`}>
                                                            You cannot change your username.
                                                          </Tooltip>
                                                        }
                                                      >
                                                        <input
                                                          {...input}
                                                          type="text"
                                                          placeholder="Username"
                                                          className="form-control"
                                                          value={
                                                            this.state.switch
                                                              ? input.value
                                                              : this.props.user.username
                                                          }
                                                          disabled={!this.state.switch}
                                                        />
                                                      </OverlayTrigger>{" "}
                                                      {meta.error &&
                                                        meta.touched &&
                                                        this.state.switch && (
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
                                              <Field name="password" validate={required}>
                                                {({ input, meta }) => (
                                                  <Form.Group as={Row}>
                                                    <Form.Label column sm="3">
                                                      Current Password
                                                    </Form.Label>
                                                    <Col sm="9">
                                                      <input
                                                        {...input}
                                                        type="password"
                                                        placeholder="Type in your current password"
                                                        className="form-control"
                                                        disabled={!this.state.switch}
                                                        value={
                                                          this.state.switch
                                                            ? input.value
                                                            : "Don't worry this is not your real password."
                                                        }
                                                      />
                                                      {meta.error &&
                                                        meta.touched &&
                                                        this.state.switch && (
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
                                              <Slide bottom>
                                                <Button
                                                  variant="success"
                                                  block
                                                  type="submit"
                                                  disabled={submitting || !this.state.switch}
                                                >
                                                  Update My Information
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
                          <Tab.Pane eventKey="second-account">
                            {/* New password change tbd on a separate tab */}
                            <Container>
                              <Row className="mt-5 mb-5 text-left">
                                <Col md="8">
                                  <FinalForm
                                    onSubmit={this.handlePasswordSubmit}
                                    validate={(values) => {
                                      const errors = {};

                                      if (values.passwordNew !== values.passwordConfirm) {
                                        errors.passwordConfirm = "Must match";
                                      }
                                      if (values.passwordNew === values.passwordCurrent) {
                                        errors.passwordNew =
                                          "New password must not be the same as the current password.";
                                      }
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
                                            <Field name="passwordCurrent" validate={required}>
                                              {({ input, meta }) => (
                                                <Form.Group as={Row}>
                                                  <Form.Label column sm="3">
                                                    Current Password
                                                  </Form.Label>
                                                  <Col sm="9">
                                                    <input
                                                      {...input}
                                                      type="password"
                                                      placeholder="Enter your current password"
                                                      className="form-control"
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
                                            <Field name="passwordNew" validate={required}>
                                              {({ input, meta }) => (
                                                <Form.Group as={Row}>
                                                  <Form.Label column sm="3">
                                                    New Password
                                                  </Form.Label>
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
                                                          {"Valid password."}
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
                                            <Field name="passwordConfirm" validate={required}>
                                              {({ input, meta }) => (
                                                <Form.Group as={Row}>
                                                  <Form.Label column sm="3">
                                                    Confirm New Password
                                                  </Form.Label>
                                                  <Col sm="9">
                                                    <input
                                                      {...input}
                                                      type="password"
                                                      placeholder="Confirm your new password"
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
                                          </Col>
                                        </Form.Row>
                                        <Form.Row>
                                          <Col>
                                            <Slide right>
                                              <Button block type="submit" disabled={submitting}>
                                                Submit
                                              </Button>
                                            </Slide>
                                            <Slide left>
                                              <Button
                                                block
                                                type="button"
                                                onClick={form.reset}
                                                disabled={submitting || pristine}
                                              >
                                                Reset
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
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Tab>

                <Tab eventKey="my-lists" title="My Lists">
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
                            <Fade>
                              <Container fluid className="mt-5">
                                <Row className=" mb-5 justify-content-left text-left">
                                  <Col
                                    lg="10"
                                    style={{
                                      padding: "5%",
                                    }}
                                  >
                                    <Favorites favorites={this.props.favorites} />
                                  </Col>
                                </Row>
                              </Container>
                            </Fade>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second-list">
                            {/* New password change tbd on a separate tab */}
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
