import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PopupCreate from '../components/popupCreate';
import Header from '../components/header';
import Footer from '../components/footer';
import { baseUrl } from '../config/server';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(8),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
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
  main: {
      minHeight: "calc(100vh - 148px)"
  },
  container: {
      paddingTop: theme.spacing(8)
  },
}));

export default function CreateRaffle() {
    const classes = useStyles();
    const [formValues, setValues] = React.useState({})
    const [popup, setPopup] = React.useState({})
    const [feedback, setFeedback] = React.useState(false);
    const [errorSnakbar, setErrorSnakbar] = React.useState(false);
    const [serviceShare, setServiceShare] = React.useState(-1);
    
    /* Get service share (Z) from back-end */
    React.useEffect(() => {
        axios.get(`${baseUrl}raffle_share`)
        .then(res => {
            const response = res.data;
            setServiceShare(response.z)
        })
        .catch(res => {
            setServiceShare(-1)
            setErrorSnakbar(true);
        })
    }, []);
    
    const handleChange_num = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: Number(e.target.value)
        }))
    }
    
    const handleChange_str = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    
    /* Request to create raffle */
    const handleCreate = (e) => {
        e.preventDefault()
        axios.post(`${baseUrl}raffle/add`, formValues)
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
      <Header 
        buttonLink="/"
        buttonText="Home"
      />
    <main className={classes.main}>
    <Container component="main" maxWidth="sm" className={classes.container}>
      <CssBaseline />
        <Card>
            <CardContent>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" color="primary">
          Create Raffle
        </Typography>
        <form className={classes.form} onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={formValues.name}
                autoComplete="name"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange = {handleChange_str}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                name="description"
                multiline
                onChange = {handleChange_str}
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
                onChange = {handleChange_str}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="deadlineHeight"
                label="Deadline"
                name="deadlineHeight"
                type="number"
                onChange = {handleChange_num}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="minToRaise"
                label="Minimum Donation"
                id="minToRaise"
                type="number"
                onChange = {handleChange_num}
              />
            </Grid>
            <Grid item xs={12}>
                <Typography color="primary">
                Shares (Percent)
                </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="charityPercent"
                label="Charity"
                name="charityPercent"
                type="number"
                onChange = {handleChange_num}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="winnerPercent"
                label="Winner"
                name="winnerPercent"
                type="number"
                onChange = {handleChange_num}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                name="serviceShare"
                label="Service"
                id="serviceShare"
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
          <PopupCreate
            txId={popup.txId}
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
            </CardContent>
        </Card>
    </Container>
    </main>
    <Footer />
    </React.Fragment>
  );
}
