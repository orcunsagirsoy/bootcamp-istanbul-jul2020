import React from "react";
import { Menu, Dropdown,  Row, Col } from 'antd';
import sortImg from '../sortBy/sort.svg'

export default function SortItemsBy({sortItems}) {
    
    const handleClick = (e) => {
        sortItems(e.key)
    }
  
const dropdownSort = () => {
    return (
        <Menu onClick={e => handleClick(e)}>
          <Menu.Item key="1" value='date'>Due</Menu.Item>
          <Menu.Item key="2" value="title">Title</Menu.Item>
          <Menu.Item key="3" value="dDate">Due (descending)</Menu.Item>
          <Menu.Item key="4" value="dTitle">Title (descending)</Menu.Item>
        </Menu>
    )


}

const styleSortImg = {
    width: '25px',
    color: 'white'
}

    return (
        <>
        <Row>
            <Col>
                <p>Sort</p>
            </Col>
            <Col>
            <Dropdown overlay={dropdownSort}>
    <img src={sortImg} style={styleSortImg} onClick={e => e.preventDefault()}>
      
    </img>
  </Dropdown>

            </Col>
        </Row>
        </>
    )
}