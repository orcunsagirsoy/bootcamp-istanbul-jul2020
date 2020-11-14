import React, { useState } from "react";
import "antd/dist/antd.css";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  CheckOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

const Sider = () => {
  const [theme, setTheme] = useState({
    theme: "dark",
    current: "1",
  });

  const handleClick = (e) => {
    setTheme({ ...theme, current: e.key });
  };

  const buttonBackground = {
    backgroundColor: "#36096d",
    backgroundImmage: "linear-gradient(315deg, #36096d 0%, #37d5d6 74%)",
  };

  return (
    <>
      <br />
      <br />

      <Menu
        theme={theme.theme}
        style={{ width: "100%", backgroundColor: "rgb(41, 44, 56)" }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[theme.current]}
        mode="inline"
        className="sider-element"
      >
        <Menu.Item
          className="navbarItem1"
          key="1"
          icon={<HomeOutlined />}
          onClick={(e) => handleClick(e)}
        >
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item
          className="navbarItem1"
          key="2"
          icon={<QuestionCircleOutlined />}
          onClick={(e) => handleClick(e)}
        >
          <NavLink to="/about">About</NavLink>
        </Menu.Item>
        <Menu.Item
          className="navbarItem1"
          key="3"
          icon={<CheckOutlined />}
          onClick={(e) => handleClick(e)}
        >
          <NavLink to="/completed">Completed</NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Sider;
