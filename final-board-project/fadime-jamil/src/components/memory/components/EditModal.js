import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DropzoneArea } from 'material-ui-dropzone';
import db, { storage } from "../../../firebaseConfig"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'stretch',
        height: '2rem',
        display: 'flex',
        fontSize: '1.2rem',
        justifyContent: 'space-between',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    add: {
        alignContent: 'center',
        cursor: 'pointer'
    },

}));




export default function EditModal({ memory, albumId, openEdit, setOpenEditModal }) {
    const classes = useStyles();
    const prevImageName = memory.data.imageName;

    const [formData, setFormData] = React.useState(memory.data)

    const handleChange = e => {
        const key = e.target.id;
        const value = e.target.value

        setFormData(formData => ({
            ...formData,
            [key]: value
        }));
    }

    const randomId = () => {
        return Math.floor(Math.random() * 1000000 + 1)
    }

    const handleClose = () => {
        setOpenEditModal(false);
    };

    const updateMemory = () => {
        if (formData.imageFile === undefined) {
            db.collection("Albums").doc(albumId).collection("Memories").doc(memory.id).update({
                date: formData.date,
                location: formData.location,
                words: formData.words
            })
        } else if (formData.imageFile) {
            updateMemoryData(formData)
        }
    }

    const updateMemoryData = (formData) => {
        const image = formData.imageFile;
        const imageName = randomId() + '-' + image.name;
        const uploadTask = storage.ref(`images/${imageName}`).put(image);

        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log("progress", progress);
                
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                deleteImage(prevImageName);

                storage.ref('images').child(imageName).getDownloadURL()
                    .then(url => {
                        db.collection("Albums").doc(albumId).collection("Memories").doc(memory.id).update({
                            date: formData.date,
                            location: formData.location,
                            words: formData.words,
                            imageFile: url,
                            imageName: imageName
                        })
                    })
            });
    }

    const deleteImage = (imageName) => {
        storage.ref(`images/${imageName}`).delete().then(function () {
            console.log('image ' + imageName + ' deleted successfully');
        }).catch(function (error) {
            console.log('Uh-oh, an error occurred while deleting the image', error);
        });
    }

    const handleClick = () => {
        //when we click edit we send the updated data to server

        updateMemory()

        setOpenEditModal(false);
    }

    return (
        <div className={classes.root}>
            <Dialog open={openEdit} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Memory</DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        autoFocus
                        fullWidth
                        id="words"
                        name="words"
                        label="Some Words"
                        type="text"
                        value={formData.words}
                        onChange={handleChange} />
                    <TextField
                        label="Location"
                        id="location"
                        name="location"
                        defaultValue=""
                        className={classes.textField}
                        helperText="The place of this memory"
                        margin="dense"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    <TextField
                        label=" "
                        type="date"
                        id="date"
                        name="date"
                        defaultValue=""
                        className={classes.textField}
                        helperText="The date of this memory"
                        margin="dense"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        filesLimit={1}
                        value={formData.imageFile}
                        onChange={(files) => setFormData(formData => ({ ...formData, imageFile: files[0] }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                </Button>
                    <Button onClick={handleClick} color="primary">
                        Edit
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}