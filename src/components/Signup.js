import React from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Form as FinalForm, Field } from "react-final-form";
import ReCAPTCHA from "react-google-recaptcha";
import * as config from "../config";
import * as data from "../data";
import axios from 'axios';

import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import Slide from "react-reveal/Slide";

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const Captcha = (props) => {
  return (
    <Form.Group>
      <ReCAPTCHA sitekey={config.recaptchaSiteKey} onChange={props.input.onChange} />
      {props.meta.error && props.meta.touched && (
        <Fade bottom>
          <div className="form-validation-feedback validation-error">{props.meta.error}</div>
        </Fade>
      )}
    </Form.Group>
  );
};

const Signup = (props) => {
  const onSubmit = async (values) => {
    axios.post(`${config.apiServerBaseUrl}/users/signup`, values, {
      withCredentials: true,
    }).then(res => {
      if(res.data.success){
        props.loginUser(res.data.data.user);
      props.match.history.push("/");
      }
    })
  };

  if (props.user.isLoggedIn) {
    return (
      <Bounce>
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
      </Bounce>
    );
  }

  return (
    <Bounce>
      <Container>
        <Row className="mt-5 mb-5 justify-content-center">
          <Col lg="6" style={{ backgroundColor: "#5a5a5a", borderRadius: "20px", padding: "5%" }}>
            <FinalForm
              onSubmit={onSubmit}
              validate={(values) => {
                const errors = {};

                if (values.passwordAgain !== values.password) {
                  errors.passwordAgain = "Must match";
                }
                return errors;
              }}
              render={({ handleSubmit, form, submitting, pristine, values }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col>
                      <Field name="firstName" validate={required}>
                        {({ input, meta }) => (
                          <Form.Group>
                            <label>First Name</label>
                            <input
                              {...input}
                              type="text"
                              placeholder="First Name"
                              className="form-control"
                            />
                            {meta.error && meta.touched && (
                              <Fade bottom>
                                <div className="form-validation-feedback validation-error">
                                  {meta.error}
                                </div>
                              </Fade>
                            )}
                          </Form.Group>
                        )}
                      </Field>
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col>
                      <Field name="lastName" validate={required}>
                        {({ input, meta }) => (
                          <Form.Group>
                            <label>Last Name</label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Last Name"
                              className="form-control"
                            />
                            {meta.error && meta.touched && (
                              <Fade bottom>
                                <div className="form-validation-feedback validation-error">
                                  {meta.error}
                                </div>
                              </Fade>
                            )}
                          </Form.Group>
                        )}
                      </Field>
                    </Col>
                  </Form.Row>

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
                              <Fade bottom>
                                <div className="form-validation-feedback validation-error">
                                  {meta.error}
                                </div>
                              </Fade>
                            )}
                            {!meta.error && meta.touched && (
                              <Fade bottom>
                                <div className="form-validation-feedback validation-ok">
                                  {"Username valid."}
                                </div>
                              </Fade>
                            )}
                          </Form.Group>
                        )}
                      </Field>
                    </Col>
                    <Col>
                      <Field
                        name="age"
                        validate={composeValidators(required, mustBeNumber, minValue(18))}
                      >
                        {({ input, meta }) => (
                          <Form.Group>
                            <label>Age</label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Age"
                              className="form-control"
                            />
                            {meta.error && meta.touched && (
                              <Fade bottom>
                                <div className="form-validation-feedback validation-error">
                                  {meta.error}
                                </div>
                              </Fade>
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
                          </Form.Group>
                        )}
                      </Field>
                    </Col>
                    <Col>
                      <Field name="passwordAgain" validate={required}>
                        {({ input, meta }) => (
                          <Form.Group>
                            <label>Confirm Password</label>
                            <input
                              {...input}
                              type="password"
                              placeholder="Confirm your password"
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
                          </Form.Group>
                        )}
                      </Field>
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col>
                      <Field name="country" validate={required}>
                        {(props) => (
                          <Form.Group>
                            <label htmlFor="country">Country</label>
                            <select className="form-control" {...props.input}>
                              <option defaultValue disabled value="">
                                Select a country
                              </option>
                              {countriesList || (
                                <option value="" disabled>
                                  Fetching countries...
                                </option>
                              )}
                            </select>
                            {props.meta.error && props.meta.touched && (
                              <Fade bottom>
                                <div className="form-validation-feedback validation-error">
                                  {props.meta.error}
                                </div>
                              </Fade>
                            )}
                          </Form.Group>
                        )}
                      </Field>
                    </Col>
                  </Form.Row>

                  <Form.Row>
                    <Col>
                      <Field name="terms" validate={required} type="checkbox">
                        {({ input, meta }) => (
                          <Form.Group>
                            <Form.Check
                              onChange={input.onChange}
                              custom={true}
                              type="checkbox"
                              label="I agree to the terms and conditions."
                              id="terms"
                              name="terms"
                              value={input.value}
                            />
                            {meta.error && meta.touched && (
                              <Fade bottom>
                                <div className="form-validation-feedback validation-error">
                                  {meta.error}
                                </div>
                              </Fade>
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
    </Bounce>
  );
};

export default Signup;
