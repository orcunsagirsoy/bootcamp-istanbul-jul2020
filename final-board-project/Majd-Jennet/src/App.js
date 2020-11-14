import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import BoardsContainer from "./containers/boards/BoardsContainer";
import About from "./components/about/index";
import CompletedTasks from "./components/completed/index";
import Login from "./components/login/index";
import HeaderComponent from "./components/header/index";
import "antd/dist/antd.css";
import Sidebar from "./components/navbar/index";
import firebase from "./firebaseConfig";
import { Layout } from "antd";
import "./App.css";

const { Header, Sider, Content } = Layout;

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
    });
  }, []);

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider className="sider-element" collapsible>
          <Sidebar />
        </Sider>
        <Layout className="layout">
          <Header className="header">
            {currentUser && <HeaderComponent />}
          </Header>
          <Content className="content">
            {" "}
            <Route exact path="/login">
              {currentUser ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/">
              {!currentUser ? <Redirect to="/login" /> : <BoardsContainer />}
            </Route>
            <Route path="/about" component={About} />
            <Route path="/completed">
              {!currentUser ? <Redirect to="/login" /> : <CompletedTasks />}
            </Route>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
