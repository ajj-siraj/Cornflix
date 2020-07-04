import React from "react";
import {
  Col,
  Row,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import { apiServerBaseUrl } from "../../config";
import axios from "axios";
import cogoToast from "cogo-toast";

import Flip from "react-reveal/Flip";
import Flash from "react-reveal/Flash";
import Slide from "react-reveal/Slide";

export default class ProfileTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkdisabled: false,
    };
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.readFile = this.readFile.bind(this);
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
        if (!res.data.success) {
          cogoToast.error("Upload failed.");
          return;
        }
        if (res.data.success) {
          this.props.trackTab("profile");
          this.props.validateUser();
        }
      })
      .catch((err) => console.error(err));
    this.setState((prevState) => ({ ...prevState, selectedKey: "profile" }));
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
  }

  render() {
    return (
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
                label={this.state.file === undefined ? "Upload your avatar" : this.state.file.name}
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
        <Col xs="12" md="6">
          <Flash>
            <Alert variant="info" className="mt-4">
              Your publicly available info is on this tab. If you do not wish for your info to be
              public please check the button below. (Username and profile photo are always public)
            </Alert>
          </Flash>
          <Slide right>
            <div className="user-info">
              <div>
                Username: <span className="user-info-data">{this.props.user.username}</span>
              </div>
              <div>
                First Name: <span className="user-info-data">{this.props.user.firstname}</span>
              </div>
              <div>
                Last Name: <span className="user-info-data">{this.props.user.lastname}</span>
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
    );
  }
}
