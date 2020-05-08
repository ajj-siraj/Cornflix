import React from "react";
import { Col, Row, Container, Form, Button} from "react-bootstrap";

import { Form as FinalForm, Field } from "react-final-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

//validators
const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

let countries = ["Sudan", "USA", "UK", "Egypt"];
let countriesList = countries.map((country, index) => {
  return <option value={country} key={`${country}-${index}`}>{country}</option>;
});

const Login = () => (
  <Container>
    <Row className="mt-5 justify-content-center">
      <Col lg="6" style={{ backgroundColor: "#5a5a5a", borderRadius: "20px", padding: "5%" }}>
        <FinalForm
          onSubmit={onSubmit}
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
                          <div className="form-validation-feedback validation-error">
                            {meta.error}
                          </div>
                        )}
                        {!meta.error && meta.touched && (
                          <div className="form-validation-feedback validation-ok">
                            {"Everything good!"}
                          </div>
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
                          <div className="form-validation-feedback validation-error">
                            {meta.error}
                          </div>
                        )}
                        {!meta.error && meta.touched && (
                          <div className="form-validation-feedback validation-ok">
                            {"Everything good!"}
                          </div>
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
                          <div className="form-validation-feedback validation-error">
                            {meta.error}
                          </div>
                        )}
                        {!meta.error && meta.touched && (
                          <div className="form-validation-feedback validation-ok">
                            {"Everything good!"}
                          </div>
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
                        <input {...input} type="text" placeholder="Age" className="form-control" />
                        {meta.error && meta.touched && (
                          <div className="form-validation-feedback validation-error">
                            {meta.error}
                          </div>
                        )}
                        {!meta.error && meta.touched && (
                          <div className="form-validation-feedback validation-ok">
                            {"Everything good!"}
                          </div>
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
                          <div className="form-validation-feedback validation-error">
                            {props.meta.error}
                          </div>
                        )}
                        {!props.meta.error && props.meta.touched && (
                          <div className="form-validation-feedback validation-ok">
                            {"Everything good!"}
                          </div>
                        )}
                      </Form.Group>
                    )}
                  </Field>
                </Col>
              </Form.Row>
              
              <Form.Row>
                <Col>
                  <Field name="terms" validate={required} type="checkbox">
                    {({input, meta}) => (
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
                  <Button block type="submit" disabled={submitting}>
                    Submit
                  </Button>
                  <Button
                    block
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
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

export default Login;
