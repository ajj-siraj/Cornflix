import React from "react";
import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import { Form as FinalForm, Field } from "react-final-form";
import ReCAPTCHA from "react-google-recaptcha";
import { apiServerBaseUrl, recaptchaSiteKey } from "../config";

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//validators
const required = (value) => (value ? undefined : "Required");

const Captcha = (props) => {
  return (
    <Form.Group>
      <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={props.input.onChange} />
      {props.meta.error && props.meta.touched && (
        <div className="form-validation-feedback validation-error">{props.meta.error}</div>
      )}
    </Form.Group>
  );
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { isLoggedIn: false },
      loginFailed: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async (values) => {
    fetch(apiServerBaseUrl + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      // .then((response) => alert(JSON.stringify(response)))
      .then((response) => {
        if (response.success) {
          this.props.loginUser({ isLoggedIn: true });
        } else {
          this.setState((prevState) => ({ ...prevState, loginFailed: true }));
        }
      })
      .catch((err) => alert(err));
  };

  render() {
    if (this.props.user.isLoggedIn) {
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
                You are already logged in.
              </p>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col xs="12" className="text-center">
            {this.state.loginFailed ? (
              <Alert variant="danger">Incorrect credentials, please try again!</Alert>
            ) : null}
          </Col>
          <Col lg="6" style={{ backgroundColor: "#5a5a5a", borderRadius: "20px", padding: "5%" }}>
            <FinalForm
              onSubmit={this.onSubmit}
              validate={(values) => {
                const errors = {};
                return errors;
              }}
              render={({ handleSubmit, form, submitting, pristine, values }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col>
                      <Field name="userName" validate={required}>
                        {({ input, meta }) => (
                          <Form.Group>
                            <label>Username</label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Username"
                              className="form-control"
                            />
                            {meta.error && meta.touched && (
                              <div className="form-validation-feedback validation-error">
                                {meta.error}
                              </div>
                            )}
                          </Form.Group>
                        )}
                      </Field>
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col>
                      <Field name="password" validate={required}>
                        {({ input, meta }) => (
                          <Form.Group>
                            <label>Password</label>
                            <input
                              {...input}
                              type="password"
                              placeholder="Password"
                              className="form-control"
                            />
                            {meta.error && meta.touched && (
                              <div className="form-validation-feedback validation-error">
                                {meta.error}
                              </div>
                            )}
                          </Form.Group>
                        )}
                      </Field>
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col>
                      <Field name="recaptcha" component={Captcha} validate={required} />
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col>
                      <Button block type="submit" disabled={submitting}>
                        Login
                      </Button>
                    </Col>
                  </Form.Row>
                  {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                </Form>
              )}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
