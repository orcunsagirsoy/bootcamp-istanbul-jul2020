import React from "react"
import AddForm from "../AddForm"
import { v4 as uuidv4 } from "uuid"
import {
  MDBBtn,
  MDBCardGroup,
  MDBCardBody,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBInput,
  MDBContainer,
  MDBRow,
  MDBIcon,
} from "mdbreact"
import HomePageHeader from "../HomePageHeader"

//REMAINDER:This index has;
//Homepage header
//Create Board Form Section(display)
//Board Items Section (display)

const Home = ({
  boards,
  boardName,
  setBoardName,
  boardAssignee,
  setBoardAssignee,
  itemName,
  setItemName,
  itemImage,
  setItemImage,
  itemDescription,
  setItemDescription,
  loading,
  AddBoards,
  EditBoard,
  DeleteBoard,
}) => {
  return (
    <MDBContainer>
      <br />
      <HomePageHeader />
      <br />
      {/* //Create Board Form Section(display) */}
      <MDBCard>
        <MDBCardBody>
          <MDBInput
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            label="New Travel Bucket"
          />
          <MDBInput
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            label="Your Travel Wish"
          />
          <MDBInput
            type="text"
            value={boardAssignee}
            onChange={(e) => setBoardAssignee(e.target.value)}
            label="Set Assignee"
          />
          <MDBInput
            type="text"
            value={itemImage}
            onChange={(e) => setItemImage(e.target.value)}
            label="Visualize your wish"
          />

          <MDBCardText
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            label="Describe your wish"
          />

          <MDBBtn
            onClick={() =>
              AddBoards({
                boardName: boardName,
                id: uuidv4(),
                itemName: itemName,
                itemDescription: itemDescription,
                boardAssignee: boardAssignee,
                itemImage: itemImage,
              })
            }>
            Add Your Travel Bucket
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <hr />
      {loading ? <h1>Loading...</h1> : null}

      {/* //Board Items Section including edit and delete buttons (display) */}
      <MDBCardGroup>
        {boards.map((board) => (
          <MDBCol size="4">
            <MDBCard>
              <MDBCardBody>
                <div className="board" key={board.id}>
                  <MDBCardTitle tag="h3">{board.boardName}</MDBCardTitle>
                  <MDBCardText tag="h5">{board.boardAssignee}</MDBCardText>
                  {board.items &&
                    board.items.map((item) => (
                      <MDBCardText className="text-center" key={item.name}>
                        <MDBRow className="mb-4">
                          <img src={item.image} className="img-fluid" alt="" />
                        </MDBRow>
                        <MDBCardText className="text-left">
                          Wish Name: {item.name}
                        </MDBCardText>
                        <MDBCardText className="text-left">
                          Description: {item.description}
                        </MDBCardText>
                      </MDBCardText>
                    ))}
                  <AddForm board={board} />
                  <div>
                    <MDBBtn
                      size="md"
                      onClick={() =>
                        EditBoard({
                          boardName,
                          itemDescription,
                          itemImage,
                          itemName,
                          id: board.id,
                        })
                      }>
                      Edit
                    </MDBBtn>
                    <MDBBtn size="md" onClick={() => DeleteBoard(board)}>
                      Delete Your Bucket
                    </MDBBtn>
                    <hr />
                    <br />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBCardGroup>
    </MDBContainer>
  )
}

export default Home
