import React from "react";
import { Col, Row, Container, Form, Button} from "react-bootstrap";
import { Form as FinalForm, Field } from "react-final-form";
import ReCAPTCHA from "react-google-recaptcha";
import { apiServerBaseUrl, recaptchaSiteKey } from "../config";
import axios from "axios";
import * as data from "../data";
import cogoToast from "cogo-toast";

//React-reveal components
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//validators
const required = (value) => (value ? undefined : "Required");
const validateEmail = (value) => (data.emailRegex.test(value) ? undefined : "Invalid email.");
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const Captcha = (props) => {
  return (
    <Form.Group>
      <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={props.input.onChange} />
      {props.meta.error && props.meta.touched && (
        <Fade bottom collapse>
          <div className="form-validation-feedback validation-error">{props.meta.error}</div>
        </Fade>
      )}
    </Form.Group>
  );
};

class RecoverPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async (values) => {
    axios.post(`${apiServerBaseUrl}/users/account/reset-password`, values, {withCredentials: true})
      .then(result => {
        if(result.data.success){
          cogoToast.success("Recovery email has been sent. Please check your email.");
          this.props.match.history.push("/");
        }
      })
      .catch(err => console.error(err));
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
      <Bounce>
        <Container>
          <Row className="mt-5 mb-5 justify-content-center">
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
                        <Field name="email" validate={composeValidators(required, validateEmail)}>
                          {({ input, meta }) => (
                            <Form.Group>
                              <label>Email</label>
                              <input
                                {...input}
                                type="email"
                                placeholder="Enter your email"
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
                      <Field name="recaptcha" component={Captcha} validate={required} />
                    </Col>
                  </Form.Row>

                    <Form.Row>
                      <Col>
                        <Button block type="submit" disabled={submitting}>
                          Recover Password
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
      </Bounce>
    );
  }
}

export default RecoverPass;
