import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./Components/Home"
import NavbarPage from "./Components/NavbarPage"
import About from "./Components/About"
import Contact from "./Components/Contact"
import db from "./firebaseConfig"
import { MDBContainer } from "mdbreact"

function App() {
  const [boards, setBoards] = useState([])
  const [boardItem, setBoardItem] = useState([])
  const [boardName, setBoardName] = useState([])
  const [loading, setLoading] = useState(false)
  const [itemName, setItemName] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [itemImage, setItemImage] = useState("")
  const [boardAssignee, setBoardAssignee] = useState([])
  const boardRef = db.collection("boards")

  // GET BOARDS
  useEffect(() => {
    setLoading(true)
    boardRef.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          setBoards((boards) => [...boards, change.doc.data()])
        }
        if (change.type === "modified") {
          setBoards((boards) => {
            const changedBoardIndex = boards.findIndex(
              (board) => board.id === change.doc.id
            )
            const boardCopy = boards.slice()
            boardCopy[changedBoardIndex] = change.doc.data()
            return boardCopy
          })
        }
        if (change.type === "removed") {
          setBoards((boards) =>
            boards.filter((b) => b.id === change.doc.data().id)
          )
        }
      })
      setLoading(false)
    })
  }, [])

  // ADD BOARD
  function AddBoards(newBoard) {
    boardRef
      .doc(newBoard.id)
      .set({
        id: newBoard.id,
        boardName: newBoard.boardName,
        boardAssignee: newBoard.boardAssignee,
        items: [
          {
            name: newBoard.itemName,
            description: newBoard.itemDescription,
            image: newBoard.itemImage,
          },
        ],
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // DELETE BOARD
  function DeleteBoard(board) {
    boardRef
      .doc(board.id)
      .delete()
      .catch((err) => {
        console.error(err)
      })
  }

  // EDIT BOARD
  function EditBoard(updatedBoard) {
    setLoading()
    boardRef
      .doc(updatedBoard.id)
      .update(updatedBoard)
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <MDBContainer fluid>
      <Router>
        <Route path="/" component={NavbarPage} />
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              boards={boards}
              boardItem={boardItem}
              setBoardItem={setBoardItem}
              boardName={boardName}
              setBoardName={setBoardName}
              boardAssignee={boardAssignee}
              setBoardAssignee={setBoardAssignee}
              itemName={itemName}
              setItemName={setItemName}
              itemImage={itemImage}
              setItemImage={setItemImage}
              itemDescription={itemDescription}
              setItemDescription={setItemDescription}
              loading={loading}
              AddBoards={AddBoards}
              EditBoard={EditBoard}
              DeleteBoard={DeleteBoard}
            />
          )}
        />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Router>
    </MDBContainer>
  )
}

export default App
