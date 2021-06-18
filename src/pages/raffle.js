import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from "react-router-dom";

import Popup from '../components/popup';
import Header from '../components/header';
import Footer from '../components/footer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  main: {
      minHeight: "calc(100vh - 148px)"
  }
}));

export default function Raffle() {
    let { id } = useParams();
    const classes = useStyles();
    
    const [raffle, setRaffle] = React.useState(
        {
            id: "eb1189e20579a9cd7ba8a5760e3c99cb36ffc0727e8a6b4c2b262d3d4a41528b",
            name: "raffle_1",
            description: "hey this is raffle_1",
            deadline: 460123,
            erg: 12000000000,
            organizer_addr: "9hgtcPbEQnsWMLJ38ATR6ThQgGQpYQFKV1H866Lvcy8Je6bu1wn",
            charity_addr: "9hnWF5YPyjQtoTVs4ArWZmrm1azonBqqY1zk23R7Vqrn5wVtMmK",
            min: 1000000000
        });
    
    const [popup, setPopup] = React.useState({
        deadline: 900,
        erg: 23480000000,
        address: "8UApt8czfFVuTgQmMwtsRBZ4nfWquNiSwCWUjMg"
    })
    
    const [feedback, setFeedback] = React.useState(false);
    const [errorSnakbar, setErrorSnakbar] = React.useState(false);
    const [formValues, setValues] = React.useState({})
    
    /* Get raffle data from back-end */
    /*
    React.useEffect(() => {
        axios.get(`https://back-endAddress/raffles/:id`)
        .then(res => {
        const response = res.data;
        setRaffle(response)
        })
    }, []);
    */
    
    const handleChange = (e) => {
        let value = e.target.value
        if (e.target.name === "erg")
        {
            value = Number(value)
        }
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: value
        }))
    }
    
    const handleDonate = (e) => {
        e.preventDefault()
        axios.post(`https://back-endAddress/donate`, formValues)
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
      <CssBaseline />
      <Header 
        buttonLink="/"
        buttonText="Home"
      />
      <main className={classes.main}>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" color="primary" component="h2">
                      {raffle.name}
                    </Typography>
                    <Typography>
                      {raffle.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" color="primary" component="h2">
                      Deposit
                    </Typography>
                    <Typography component="p" variant="h5">
                        {raffle.erg / 1000000000} ERG
                    </Typography>
                    <Typography color="textSecondary">
                      minimum donation: {raffle.min / 1000000000} ERG
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" color="primary" component="h2">
                      Info
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="raffleTokenId"
                            label="Raffle ID"
                            name="raffleTokenId"
                            autoComplete="rid"
                            disabled
                            value={raffle.id}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="charityAddr"
                            label="Charity Address"
                            name="charityAddr"
                            autoComplete="chr_addr"
                            disabled
                            value={raffle.charity_addr}
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="deadline"
                            label="Deadline"
                            name="Deadline"
                            autoComplete="deadline"
                            disabled
                            value={raffle.deadline}
                        />
                        </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" color="primary" component="h2">
                      Donate
                    </Typography>
                    <form className={classes.form} onSubmit={handleDonate}>
                        <Grid container spacing={4}>
                            <Grid item xs={10}>
                            <TextField
                                fullWidth
                                id="walletAddr"
                                label="Your wallet address"
                                name="walletAddr"
                                autoComplete="wallet_addr"
                                required
                                onChange = {handleChange}
                            />
                            </Grid>
                            <Grid item xs={10}>
                            <TextField
                                fullWidth
                                id="erg"
                                label="ERG"
                                name="erg"
                                autoComplete="value"
                                required
                                onChange = {handleChange}
                            />
                            </Grid>
                        </Grid>
                    </form>
                  </CardContent>
                  <CardActions>
                    <Button
                        type="submit"
                        color="primary"
                        className={classes.submit}
                    >
                        Donate
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
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>)
}
