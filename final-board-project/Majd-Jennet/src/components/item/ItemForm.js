import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import { DatePicker, message, Button, Form, Input } from "antd";
import "antd/dist/antd.css";
import "moment/locale/zh-cn";
import moment from "moment";

const ItemForm = ({ boardsItems, boardsId }) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  const defaultDate = currentDate.toISOString().substr(0, 10);

  const [items, setItems] = useState(boardsItems);
  const [userInput, setUserInput] = useState({
    title: "",
    due: defaultDate,
    assigner: "",
    assignee: "",
    id: "",
    completed: false,
  });

  const itemId = db.firestore().collection("boards").doc().id;

  useEffect(() => {
    setItems(boardsItems);
  }, [boardsItems]);

  const addItem = async () => {
    await db
      .firestore()
      .collection("boards")
      .doc(boardsId)
      .update({
        items: [...items, userInput],
      });
    setItems([...items, userInput]);
  };

  const handleInputValue = (e) => {
    setUserInput({ ...userInput, title: e.target.value, id: itemId });
  };

  const handleDueChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );

    setUserInput({
      ...userInput,
      due: value === null ? value : value.format("YYYY-MM-DD"),
    });
  };

  const handleAssignerChange = (e) => {
    setUserInput({ ...userInput, assigner: e.target.value });
  };

  const handleAssigneeChange = (e) => {
    setUserInput({ ...userInput, assignee: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
    setUserInput({
      title: "",
      id: "",
      due: defaultDate,
      assignee: "",
      assigner: "",
      completed: false,
    });
  };

  const formStyle = {
    marginTop: "10px",
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          name="items"
          onChange={(e) => handleInputValue(e)}
          value={userInput.title}
          style={{ width: "85%", marginTop: "0.5rem" }}
          className="input-field item-input"
          placeholder="Task title"
        />
        <DatePicker
          style={formStyle}
          style={{ width: "85%", marginTop: "0.5rem" }}
          onChange={(e) => handleDueChange(e)}
          value={userInput.due === null ? "" : moment(userInput.due)}
          className="form-btn"
        />
        <Input
          name="assigner"
          style={{ width: "85%", marginTop: "0.5rem" }}
          onChange={(e) => handleAssignerChange(e)}
          value={userInput.assigner}
          className="input-field item-input"
          placeholder="Assigner"
        />
        <Input
          name="assignee"
          style={{ width: "85%", marginTop: "0.5rem" }}
          onChange={(e) => handleAssigneeChange(e)}
          value={userInput.assignee}
          className="input-field item-input"
          placeholder="Assignee"
        />
        <Button
          variant="outline-info"
          type="submit"
          size="sm"
          onClick={(e) => handleSubmit(e)}
          className="form-btn"
          style={formStyle}
        >
          Add item
        </Button>
      </Form>
    </div>
  );
};

export default ItemForm;
