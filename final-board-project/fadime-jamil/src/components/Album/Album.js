import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import AlbumSettingMenu from './components/AlbumSettingMenu'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#caf0ff'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: 'none',
    color: '#000',
  },
  settings: {
    marginLeft: 'auto',
  },
  header: {
    paddingBottom: '0'
  },
  content: {
    paddingTop: '0'
  },

});


export default function Album({ album }) {
  const classes = useStyles();
  //when we click the card we should go to the memories list 

  return (
    <Grid item xs={3}>
      <Card className={classes.root} >
        <CardActions disableSpacing className={classes.header}>
          <AlbumSettingMenu albumId={album.id} album={album} />
        </CardActions>
        <CardContent className={classes.content}>
          <Link to={'/albums/' + album.id} className={classes.link}>
            <Typography variant="h5" component="h2">
              {album.data.name}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
}