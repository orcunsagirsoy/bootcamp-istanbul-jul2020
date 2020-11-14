import React from "react";
import {
  Menu,
  Dropdown,
  Row,
  Col,
} from "antd";
import sortImg from "./sort.svg";

export default function SortBy({ sortBoards }) {

  const handleClick = (e) => {
    sortBoards(e.key);
  };

  const dropdownSort = () => {
    return (
      <Menu onClick={(e) => handleClick(e)}>
        <Menu.Item key="1" value="date">
          Date
        </Menu.Item>
        <Menu.Item key="2" value="title">
          Title
        </Menu.Item>
        <Menu.Item key="3" value="dDate">
          Date (descending)
        </Menu.Item>
        <Menu.Item key="4" value="dTitle">
          Title (descending)
        </Menu.Item>
      </Menu>
    );
  };

  const styleSortImg = {
    width: "25px",
    color: "white",
  };

  return (
    <>
      <Row>
        <Col>
          <p>Sort</p>
        </Col>
        <Col>
          <Dropdown overlay={dropdownSort}>
            <img
              src={sortImg}
              style={styleSortImg}
              onClick={(e) => e.preventDefault()}
            ></img>
          </Dropdown>
        </Col>
      </Row>
    </>
  );
}
