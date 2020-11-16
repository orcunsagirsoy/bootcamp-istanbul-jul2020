import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import db from "../../firebaseConfig";
import Modal from "react-modal";
import { DatePicker, message } from "antd";
import { Space, Button, Form, Input } from "antd";
import "antd/dist/antd.css";
import "moment/locale/zh-cn";
import moment from "moment";

const EditForm = ({
  boardsItems,
  modalOpened,
  setModalOpened,
  task,
  boardsId,
}) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const defaultDate = currentDate.toISOString().substr(0, 10);

  const [userInput, setUserInput] = useState({
    title: task.title,
    due: task.due,
    assigner: task.assigner,
    assignee: task.assignee,
    id: task.id,
    completed: task.completed,
  });

  const editItem = async () => {
    const modifiedItems = boardsItems;
    const itemIndex = modifiedItems.findIndex((item) => item.id === task.id);
    modifiedItems[itemIndex] = userInput;

    await db.firestore().collection("boards").doc(boardsId).update({
      items: modifiedItems,
    });
  };

  useEffect(() => {
    setEditedTask(userInput);
  }, [userInput]);

  const handleInputValue = (e) => {
    setUserInput({ ...userInput, title: e.target.value, id: task.id });
  };

  const formStyle = {
    marginTop: "10px",
    marginLeft: "10px",
    marginRight: "10px",
  };

  const handleModal = () => {
    setModalOpened({
      modalOpen: modalOpened.modalOpen === true ? false : true,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editItem();
    setModalOpened({
      modalOpen: modalOpened.modalOpen === true ? false : true,
    });
  };

  const handleDueChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setUserInput({
      ...userInput,
      due: value.toDate().toISOString().substr(0, 10),
    });
  };

  const handleAssignerChange = (e) => {
    setUserInput({ ...userInput, assigner: e.target.value });
  };

  const handleAssigneeChange = (e) => {
    setUserInput({ ...userInput, assignee: e.target.value });
  };

  const [editedTask, setEditedTask] = useState(task);

  return (
    <Modal className="modal" isOpen={modalOpened.modalOpen}>
      <Space direction="vertical" align="center">
        <Form>
          <Input
            name="items"
            value={userInput.title}
            className="task-title input-field item-input"
            placeholder="Task title"
            onChange={(e) => handleInputValue(e)}
            style={formStyle}
            addonBefore="Title"
          />
          <DatePicker
            onChange={(e) => handleDueChange(e)}
            defaultValue={moment(defaultDate)}
            style={{ color: "white" }}
            className="form-btn item-input"
            style={formStyle}
            addonBefore="Due date"
          />
          <Input
            name="assigner"
            value={userInput.assigner}
            placeholder="Assigner"
            onChange={(e) => handleAssignerChange(e)}
            className="input-field item-input"
            style={formStyle}
            addonBefore="Assigner"
          />
          <Input
            name="assignee"
            value={userInput.assignee}
            placeholder="Assignee"
            onChange={(e) => handleAssigneeChange(e)}
            className="input-field item-input"
            style={formStyle}
            addonBefore="Assignee"
          />
          <Button
            variant="outline-info"
            type="submit"
            size="sm"
            onClick={(e) => handleEdit(e)}
            className="form-btn"
            style={formStyle}
          >
            Edit task
          </Button>
        </Form>
        <Button
          className="form-btn"
          onClick={(e) => handleModal(e)}
          style={formStyle}
        >
          Close form
        </Button>
      </Space>
    </Modal>
  );
};

export default EditForm;
