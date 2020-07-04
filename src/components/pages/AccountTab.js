import React from "react";
import {
  Container,
  Col,
  Row,
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

import Fade from "react-reveal/Fade";
import Flash from "react-reveal/Flash";
import Slide from "react-reveal/Slide";

//validators
const required = (value) => (value ? undefined : "Required");

export default class AccountTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: false,
    };
    
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  //submit request to update user data
  handleAccountSubmit(values) {
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
        cogoToast.error(err.toString());
      });
  }

  render() {
    return (
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
                          render={({ handleSubmit, form, submitting, pristine, values }) => (
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
                                          {meta.error && meta.touched && this.state.switch && (
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
                                          {meta.error && meta.touched && this.state.switch && (
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
                                          {meta.error && meta.touched && this.state.switch && (
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
                                          {meta.error && meta.touched && this.state.switch && (
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
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
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
    );
  }
}
