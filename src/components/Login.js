import React from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Form as FinalForm, Field } from "react-final-form";
import ReCAPTCHA from "react-google-recaptcha";
import { apiServerBaseUrl, recaptchaSiteKey } from "../config";
import { Redirect } from "react-router-dom";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const onSubmit = async (values) => {
//   fetch(apiServerBaseUrl + "/users/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(values),
//   })
//     .then((response) => response.json())
//     // .then((response) => alert(JSON.stringify(response)))
//     .then((response) => {
//       if (response.success) {
//         this.setState(prevState => ({...prevState, user: {isLoggedIn: true}}))
//       }
//     })
//     .catch((err) => alert(err));

//   // await sleep(300);
//   // window.alert(JSON.stringify(values, 0, 2));
// };

//validators
const required = (value) => (value ? undefined : "Required");
// const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
// const minValue = (min) => (value) =>
//   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
// const composeValidators = (...validators) => (value) =>
//   validators.reduce((error, validator) => error || validator(value), undefined);

const Captcha = (props) => {
  return (
    <Form.Group>
      <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={props.input.onChange} />
    </Form.Group>
  );
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { isLoggedIn: false },
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
          this.setState(prevState => ({...prevState, user: {isLoggedIn: true}}))
        }
      })
      .catch((err) => alert(err));
  
    // await sleep(300);
    // window.alert(JSON.stringify(values, 0, 2));
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
    
    if(this.state.user.isLoggedIn){
      return(
        <Redirect to={{pathname: '/', state: {user: {isLoggedIn: true}}}} />
      );
    }
    return (
      
      <Container>
        <Row className="mt-5 justify-content-center">
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

                  {/* <Form.Row>
                  <Col>
                    <Field name="recaptcha" component={Captcha} validate={required} />
                  </Col>
                </Form.Row> */}

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
