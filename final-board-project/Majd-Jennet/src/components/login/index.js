import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row } from "antd";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import firebase from "../../firebaseConfig";
require("firebase/auth");

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const history = useHistory();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        setTimeout(() => {
          history.push("/");
        }, 1500);

        alert("You are in!");
      })
      .catch(function (error) {
        switch (error) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setError(error.message);
            break;
          case "auth/weak-password":
            setError(error.message);
            break;
          default:
            setError(error.message);
        }
      });
  };

  const handleSignUp = () => {
    setEmail("")
    setPassword("")
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(alert("Thanks for registering!"))
      .catch(function (error) {
        switch (error) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setError(error.message);
            break;
          case "auth/weak-password":
            setError(error.message);
            break;
          default:
            setError("Error");
            setError("Error");
        }
      });
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10rem",
      }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Input
          label="Email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => handleEmail(e)}
          style={{ width: "70%", margin: "0.5rem" }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        ></Input>
        <Input
          label="Password"
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => handlePassword(e)}
          style={{ width: "70%", margin: "0.5rem" }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        ></Input>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Form.Item {...tailLayout}>
            <Button
              className="login-button"
              htmlType="submit"
              style={{ marginRight: "2rem", marginLeft: "0.5rem" }}
              onClick={(e) => handleSignIn(e)}
            >
              Sign In
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              className="login-button"
              htmlType="submit"
              onClick={(e) => handleSignUp(e)}
            >
              Sign Up
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Login;
