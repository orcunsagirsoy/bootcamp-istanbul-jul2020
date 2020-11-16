import React, { Component } from "react";
import SingleCafe from "./SingleCafe";
import Dropdown from 'react-bootstrap/Dropdown'

export default class CafeList extends Component {
  constructor(props) {
    super(props);
    this.sortCafes = this.sortCafes.bind(this)
    this.state= {cafes:[]}
  }
  componentWillReceiveProps(props) {
    this.setState({
      cafes: props.cafes
    })
  }
  sortCafes(eventKey, event) {
    let sortedCafes = this.state.cafes.sort(function(a, b) {
      if (eventKey == "asc") {
        if (a.data.name < b.data.name) {
          return -1
        } else {
          return 1
        }
      } else {
        if (a.data.name > b.data.name) {
          return -1
        } else {
          return 1
        }
      }
    })
    debugger
    this.setState({
      cafes: sortedCafes
    })
    // event.target.value
  }
  render() {
    let cafeElements = [];
    this.state.cafes.forEach((cafe) => {
      return cafeElements.push(<SingleCafe key={cafe.id} cafeData={cafe} />);
    });
    return <div>
      <Dropdown onSelect={this.sortCafes}> 
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort by title
        </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="asc">from A-Z</Dropdown.Item>
            <Dropdown.Item eventKey="desc">from Z-A</Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
      {cafeElements}
    </div>;
  }
}
