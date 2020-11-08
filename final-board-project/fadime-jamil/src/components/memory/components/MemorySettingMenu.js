import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import db, { storage } from "../../../firebaseConfig";
import EditModal from './EditModal';


const useStyles = makeStyles({
    settings: {
        marginLeft: 'auto',
    },

});


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function MemorySettingMenu({ memory, albumId }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteMemory = () => {
        db.collection("Albums").doc(albumId).collection("Memories").doc(memory.id).delete().then(function () {
            storage.ref(`images/${memory.data.imageName}`).delete().then(function () {
                console.log('image deleted successfully');
            }).catch(function (error) {
                console.log('Uh-oh, an error occurred while deleting the image', error);
            });
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        })

        handleClose()
    }

    const [openEditModal, setOpenEditModal] = React.useState(false);

    const handleEditMemory = () => {
        setOpenEditModal(true);
        handleClose()
    };

    return (
        <div className={classes.settings}>
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                aria-label="settings"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem className={classes.add} onClick={handleEditMemory}>
                    <ListItemIcon  >
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </StyledMenuItem>
                <StyledMenuItem onClick={handleDeleteMemory}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </StyledMenuItem>
            </StyledMenu>
            <EditModal
                memory={memory}
                albumId={albumId}
                openEdit={openEditModal}
                setOpenEditModal={setOpenEditModal}
            />
        </div>
    );
}
