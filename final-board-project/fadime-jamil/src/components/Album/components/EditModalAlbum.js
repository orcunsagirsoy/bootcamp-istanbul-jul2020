import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import db from "../../../firebaseConfig";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from "react-router-dom";
import AppContext from '../../../components/AppContext'
// album={album}
//                 albumId={albumId}
//                 openEdit={openEditModal}
//                 setOpenEditModal={setOpenEditModal}
export default function EditModalAlbum({albumId, openEdit, setOpenEditModal}) {
    const {user} = React.useContext(AppContext);

    console.log("user in edit modal Album",user);
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    const [userInput, setUserInput] = useState({
      name: user.name,
      userId: user.uid,
      creationDate: ""
    });
  
  
    const handleChange = (e) => {
      setUserInput({ ...userInput, name: e.target.value, creationDate: new Date() })
    }
    console.log("user input",userInput);
    const handleSubmit = (e) => {
      handleClose();
      editAlbum(e);
      setUserInput({
        name: "",
        userId: user.uid,
        creationDate: ""
      });
  
      setShouldRedirect(true);
    }
    const editAlbum = e => {
      e.preventDefault()
      db.collection('Albums').doc(albumId).update(userInput)
    }
 
   
    // const handleEditClickOpen = () => {
    //   setOpen(true);
    // };
  
    const handleClose = () => {
        setOpenEditModal(false);
    };
    console.log("is open", openEdit)
  
    return (
      <div>
        {/* <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleEditClickOpen}>
          <Badge badgeContent={0} color="secondary">
            <AddCircleIcon />
          </Badge>
        </IconButton> */}
        <Dialog open={openEdit} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit album</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a rename for your album here.
              </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Album name"
              type="text"
              fullWidth
              onChange={e => handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
              </Button>
            <Button onClick={e => handleSubmit(e)} color="primary">
              Edit
              </Button>
          </DialogActions>
        </Dialog>
        {shouldRedirect ? <Redirect to="/" /> : null}
      </div>
    )
  }
  
  