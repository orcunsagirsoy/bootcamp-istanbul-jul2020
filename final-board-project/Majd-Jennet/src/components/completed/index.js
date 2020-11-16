import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import { Collapse, Card } from "antd";

const CompletedTasks = () => {
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const { Panel } = Collapse;
  const [modalOpened, setModalOpened] = useState({ modalOpen: false });

  const fetchCompletedTasks = async () => {
    const res = await db.firestore().collection("boards").get();
    const data = res.docs;
    for (let i = 0; i < data.length; i++) {
      setCompletedTaskList((prevState) => [
        ...prevState,
        { ...data[i].data(), id: data[i].id },
      ]);
    }
    return completedTaskList;
  };
  useEffect(() => {
    fetchCompletedTasks();
  }, []);


  const gridStyle = {
    width: "25%",
    textAlign: "center",
    margin: "10px",
  };

  return completedTaskList.map((item) => {
    return (
      <Collapse
        style={{ width: "100%" }}
        defaultActiveKey={["1"]}
        className="completed"
      >
        <Panel className="completed-panel" header={item.title} key={item.id}>
          {item.items
            .filter((el) => el.completed === true)
            .map((el) => {
              return (
                <Card.Grid
                  className="completed-card"
                  title={el.title}
                  style={gridStyle}
                >
                  <p>Title: {el.title}</p>
                  <p>Assigner: {el.assigner}</p>
                  <p>Assignee: {el.assignee}</p>
                  <p>Due date: {el.due}</p>
                </Card.Grid>
              );
            })}
        </Panel>
      </Collapse>
    );
  });
};

export default CompletedTasks;
