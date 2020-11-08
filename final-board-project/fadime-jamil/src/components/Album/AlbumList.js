import React from 'react';

import Album from "./Album";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//display albums imported from database



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '20px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
export default function AlbumList({albums}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {albums? (
            <Grid container spacing={3}>
                {albums.map(album => <Album album={album} key={album.id}/>)}
            </Grid>
            ) : null}
        </div>
        
    )
}

