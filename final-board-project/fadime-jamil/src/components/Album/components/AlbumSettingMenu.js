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
import db from "../../../firebaseConfig";
import EditModalAlbum from "./EditModalAlbum"

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
            vertical: 'bottom',
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

export default function AlbumSettingMenu({albumId, album}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteAlbum = () => {
        db.collection("Albums").doc(albumId).delete().then(function () {
          console.log("Album successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        })

        handleClose()
      }

      const [openEditModal, setOpenEditModal] = React.useState(false);

      const handleEditAlbum = () => {
          setOpenEditModal(true);
        
           
      };
     

    return (
        <div className={classes.settings}>
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                aria-label="settings"
                edge="end"
                size="small"
                onClick={handleClick}
            >
                <MoreVertIcon fontSize="small" />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleEditAlbum} >
                    <ListItemIcon  >
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </StyledMenuItem>
                <StyledMenuItem onClick={deleteAlbum}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </StyledMenuItem>
            </StyledMenu>
            <EditModalAlbum
                album={album}
                albumId={albumId}
                openEdit={openEditModal}
                setOpenEditModal={setOpenEditModal}
            />
        </div>
    );
}
