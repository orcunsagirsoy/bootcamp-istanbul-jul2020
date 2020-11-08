import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import keepMemoriesImage from '../images/keep-memories.png'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 'calc(100vh - 64px)',
        paddingLeft: '60px',
        marginTop: '15%'
    },
    mainImage: {
        height: 'calc(100vh - 64px)',
        backgroundImage: `url(${keepMemoriesImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
    },
    text: {
        margin: '20px 0'
    }
}));

export default function CenteredGrid() {
    const classes = useStyles();

    let history = useHistory();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item className={classes.paper} xs={6}>
                    <Typography variant="h2" component="h2">
                        Keep your Memories
                    </Typography>
                    <Typography variant="body1" component="h2" className={classes.text}>
                        Save your memories in a safe place and share them with others.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => history.push('/login')}>
                        Start for Free
                    </Button>
                </Grid>
                <Grid item className={classes.mainImage} xs={6}>
                </Grid>
            </Grid>
        </div>
    );
}
