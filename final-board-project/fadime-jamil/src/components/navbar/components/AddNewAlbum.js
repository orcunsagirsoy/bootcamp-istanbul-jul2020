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

//create a new collection in the database
export default function AddNewAlbum() {
  const {user} = React.useContext(AppContext);

  console.log(user);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [userInput, setUserInput] = useState({
    name: "",
    userId: user.uid,
    creationDate: ""
  });


  const handleChange = (e) => {
    setUserInput({ ...userInput, name: e.target.value, creationDate: new Date() })
  }

  const handleSubmit = (e) => {
    handleClose();
    addAlbum(e);
    setUserInput({
      name: "",
      userId: user.uid,
      creationDate: ""
    });

    setShouldRedirect(true);
  }
  const addAlbum = e => {
    e.preventDefault()
    db.collection('Albums').add(userInput)
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClickOpen}>
        <Badge badgeContent={0} color="secondary">
          <AddCircleIcon />
        </Badge>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new album</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new collection of memories, please enter a name for your album here.
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
            Add
            </Button>
        </DialogActions>
      </Dialog>
      {shouldRedirect ? <Redirect to="/" /> : null}
    </div>
  )
}


