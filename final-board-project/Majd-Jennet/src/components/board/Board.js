import React, { useState} from "react";
import Items from "../../containers/items/Items";
import db from "../../firebaseConfig";
import { Card, Col, Row, Button, Typography, Input, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Board = ({ boardTitle, boardsItems, boardsId }) => {
  const [editing, setEditing] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { Title } = Typography;

  const handleClick = (e) => {
    e.preventDefault();
    db.firestore().collection("boards").doc(boardsId).delete();
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setEditing(false);
      editTitle();
      setUserInput("");
    } else if (e.key === "Escape") {
      setUserInput("");
      setEditing(false);
    }
  };

  const handleBlur = () => {
    setUserInput("");
    setEditing(false);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const editTitle = async () => {
    const newTitle = userInput;
    await db.firestore().collection("boards").doc(boardsId).update({
      title: newTitle,
    });
  };

  const theTitle = (
    <Title style={{ color: "white" }} level={2}>
      <Row>
        <Col span={10}>{boardTitle}</Col>
        <Col span={2} offset={10}>
          <Button className="form-btn" onClick={handleEdit}>
            <EditOutlined />
          </Button>
        </Col>
      </Row>
    </Title>
  );
  const editingTitle = (
    <Title style={{ color: "white" }} level={2}>
      <Input
        placeholder="Enter new title name (Esc to cancel)"
        className="input-field"
        onKeyDown={(e) => handleEnter(e)}
        onChange={(e) => handleChange(e)}
        onBlur={handleBlur}
      />
    </Title>
  );

  const cardTitle = editing ? editingTitle : theTitle;

  return (

    <Card
      title={cardTitle}
      bordered={false}
      style={{ borderRadius: "10px" }}
      className="card"
    >
      <Items
        boardTitle={boardTitle}
        boardsId={boardsId}
        boardsItems={boardsItems}
      />
      <Button
        variant="outline-info"
        style={{ marginTop: "10px" }}
        type="submit"
        size="sm"
        onClick={(e) => handleClick(e)}
        className="form-btn"
      >
        Delete Board
      </Button>
    </Card>
  );
};

export default Board;
