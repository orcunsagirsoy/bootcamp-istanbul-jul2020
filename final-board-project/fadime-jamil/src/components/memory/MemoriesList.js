import React from "react";
import db, { storage } from "../../firebaseConfig";
import Memory from "./Memory";
import Subnav from "./Subnav";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const randomId = () => {
  return Math.floor(Math.random() * 1000000 + 1);
};

export default function MemoryList({
  memories,
  albumName,
  albumId,
  setMemories,
}) {
  const classes = useStyles();

  const submitData = (formData) => {
    uploadImage(formData);
  };
  const uploadImage = (formData) => {
    const image = formData.imageFile;
    const imageName = randomId() + "-" + image.name;
    const uploadTask = storage.ref(`images/${imageName}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("progress", progress);
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(imageName)
          .getDownloadURL()
          .then((url) => {
            db.collection("Albums")
              .doc(albumId)
              .collection("Memories")
              .add({ ...formData, imageFile: url, imageName: imageName });
            console.log("url", url);
          });
      }
    );
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.root}>
      <Subnav albumName={albumName} submitData={submitData} />

      {memories && memories.length > 0 ? (
        // <EditModal memory={memories} albumId={albumId} />
        <Grid container spacing={3}>
          {memories.map((memory) => (
            <Memory
              memory={memory}
              key={memory.id}
              albumId={albumId}
              setMemories={setMemories}
              handleClickOpen={handleClickOpen}
            />
          ))}
        </Grid>
      ) : null}
    </div>
  );
}
