import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Copyright } from './App';
import Popup from './popup';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateRaffle() {
    const classes = useStyles();
    const [formValues, setValues] = React.useState({})
    const [popup, setPopup] = React.useState({
        deadline: 900,
        erg: 23480000000,
        address: "8UApt8czfFVuTgQmMwtsRBZ4nfWquNiSwCWUjMg"
    })
    const [feedback, setFeedback] = React.useState(false);
    const [errorSnakbar, setErrorSnakbar] = React.useState(false);
    const [serviceShare, setServiceShare] = React.useState(10);
    
    /* Get service share (Z) from back-end */
    /*
    React.useEffect(() => {
        axios.get(`https://back-endAddress/share/z`)
        .then(res => {
        const response = res.data;
        setServiceShare(response.z)
        })
    }, []);
    */
    
    const handleChange = (e) => {
        let value = e.target.value
        if (e.target.name == "Deadline" || e.target.name == "MinDonation")
        {
            value = Number(value)
        }
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: value
        }))
    }
    
    const handlePopup = (e) => {
        let value = e.target.value
        if (e.target.name == "Deadline" || e.target.name == "MinDonation")
        {
            value = Number(value)
        }
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: value
        }))
    }
    
    const handleCreate = (e) => {
        e.preventDefault()
        axios.post(`https://back-endAddress/create`, formValues)
        .then(res => {
            const response = res.data;
            setPopup(response)
            setFeedback(true);
        })
        .catch(res => {
            setErrorSnakbar(true);
        })
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFeedback(false);
    };
    
    const handleError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnakbar(false);
    };

  return (
    <React.Fragment>
    <AppBar position="relative">
    <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
        X/Y RAFFLE
        </Typography>
    </Toolbar>
    </AppBar>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Raffle
        </Typography>
        <form className={classes.form} onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={formValues.name}
                autoComplete="name"
                name="Name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange = {handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="desc"
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="charityAddr"
                label="Charity Address"
                name="charityAddr"
                autoComplete="chr_addr"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="deadline"
                label="Deadline"
                name="deadline"
                autoComplete="dline"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="minDonation"
                label="MinDonation"
                id="minDonation"
                autoComplete="mind"
              />
            </Grid>
            <Grid item xs={12}>
                <Typography color="primary">
                Shares
                </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="charityShare"
                label="Charity (X)"
                name="charityShare"
                autoComplete="cshare"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="winnerShare"
                label="Winner (Y)"
                id="winnerShare"
                autoComplete="wshare"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                name="serviceShare"
                label="Service (Z)"
                id="serviceShare"
                autoComplete="sshare"
                disabled
                value={serviceShare}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
          <Popup
            deadline={popup.deadline}
            erg={popup.erg}
            address={popup.address}
            open={feedback} 
            onClose={handleClose}
          />
          <Snackbar open={errorSnakbar} autoHideDuration={6000} onClose={handleError}>
            <Alert onClose={handleError} severity="error">
            There was a problem connecting to the server!
            </Alert>
          </Snackbar>
          <Link to="/">
            <Button fullWidth>
                Back
            </Button>
          </Link>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </React.Fragment>
  );
}
