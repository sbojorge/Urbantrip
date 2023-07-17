import React, { useState } from "react";

import styles from "../../styles/SignUpInForm.module.css";
import btnstyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import iconstyles from "../../styles/NavBar.module.css";

import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Alert,
  Image,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="dark" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="dark" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="dark" key={idx}>
                {message}
              </Alert>
            ))}

            <div className={styles.iconbutton}>
              <span>
                <Image
                  className={iconstyles.NavIcon}
                  src={
                    "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578784/sign-up.256x243_wumyuq.webp"
                  }
                />
              </span>
              <Button type="submit" className={btnstyles.button}>
                Sign Up
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="dark" key={idx}>
                  {message}
                </Alert>
              ))}
            </div>
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account?
            <span>
              <Image
                className={iconstyles.NavIcon}
                src={
                  "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689578784/sign-in.232x256_zkzbs5.webp"
                }
              />
              <Button className={btnstyles.button}>Sign in</Button>
            </span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1689582340/image-from-rawpixel-id-3283639-j_gepxnt.webp"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
