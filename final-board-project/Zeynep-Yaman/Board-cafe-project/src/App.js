import React, { Component } from 'react';
import db from './firebaseConfg';
import ReviewForm from './Components/ReviewForm';
import CafeForm from './Components/CafeForm';
import About from './Components/About';
import CafeList from './Components/CafeList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'

 
class App extends Component {

  constructor () {
    super();
    this.forceAppUpdate = this.forceAppUpdate.bind(this)

    this.state= {
      cafes: [],
    }
  }
  
  componentDidMount () {
    db.collection("cafes").get().then((querySnapshot) => {
      const cafes = [];
      querySnapshot.forEach(doc => {
        const docId = doc.id;
        const cafeData = doc.data();
        cafes.push({
          id: docId,
          data: cafeData,
        })
      })
      this.setState(prevState => {
        return {
          ...prevState,
          cafes: cafes,
        }
      });
    })
  }


  forceAppUpdate() {
    this.forceUpdate()
  }

  render () {
    return (
      <Router>
        <Nav>
          <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link href="/add-cafe">Add Cafe</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link href="/add-review">Add Review</Nav.Link>
          </Nav.Item>
        </Nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/add-cafe">
            <CafeForm cafes={this.state.cafes} forceParentUpdate={this.forceAppUpdate} />
          </Route>
          <Route path="/add-review">
            <ReviewForm cafes={this.state.cafes} />
          </Route>
          <Route path="/">
            <CafeList cafes={this.state.cafes} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
