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
import EmptyCard from '../components/emptyCard';
import ProgressCard from '../components/progressCard';
import { baseUrl } from '../config/server';

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
    
    const [raffle, setRaffle] = React.useState({});
    const [raffleExist, setRaffleExist] = React.useState(false);
    const [popup, setPopup] = React.useState({})
    const [feedback, setFeedback] = React.useState(false);
    const [errorSnakbar, setErrorSnakbar] = React.useState(false);
    const [formValues, setValues] = React.useState({
        "id": id
    })
    const [connecting, setConnecting] = React.useState(true);
    const [pageState, setPageState] = React.useState("Connecting to server");
    const [payment, setPayment] = React.useState(0);
    
    /* Get raffle data from back-end */
    React.useEffect(() => {
        axios.get(`${baseUrl}raffle/${id}`)
        .then(res => {
            const response = res.data;
            setRaffle(response)
            setRaffleExist(true)
            setConnecting(false)
            setPageState("Raffle received")
        })
        .catch(res => {
            setRaffle({})
            setRaffleExist(false)
            setConnecting(false)
            setPageState("There is no data about this raffle")
        })
    }, [id]);
    
    const handleChange = (e) => {
        let value = e.target.value
        if (e.target.name === "ticketCounts")
        {
            value = Number(value)
            setPayment(value * raffle.ticketPrice)
        }
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: value
        }))
    }
    
    /* Request to donate to the raffle */
    const handleDonate = (e) => {
        e.preventDefault()
        axios.post(`${baseUrl}raffle/donate`, formValues)
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
          {raffleExist && !connecting && <Grid container spacing={4}>
              <Grid item xs={12} lg={8}>
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
              <Grid item xs={12} lg={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" color="primary" component="h2">
                      Deposit
                    </Typography>
                    <Typography component="p" variant="h5">
                        {raffle.erg / 1000000000} ERG
                    </Typography>
                    <Typography color="textSecondary">
                      Donation Goal: {(raffle.min > 1000000) ? `${raffle.min / 1000000000} ERG` : `${raffle.min} nano ERG`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={6}>
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
                            readOnly
                            value={raffle.id || ""}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="charityAddr"
                            label="Charity Address"
                            name="charityAddr"
                            readOnly
                            value={raffle.charityAddr || ""}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="deadline"
                            label="Deadline"
                            name="Deadline"
                            readOnly
                            value={raffle.deadline || ""}
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <TextField
                            fullWidth
                            id="charityPercent"
                            label="Charity"
                            name="charityPercent"
                            readOnly
                            value={raffle.charityPercent || ""}
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <TextField
                            fullWidth
                            id="winnerPercent"
                            label="Winner"
                            name="winnerPercent"
                            readOnly
                            value={raffle.winnerPercent || ""}
                        />
                        </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" color="primary" component="h2">
                      Donate
                    </Typography>
                    <form id="donate_form" className={classes.form} onSubmit={handleDonate}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="walletAddr"
                                label="Your wallet address"
                                name="walletAddr"
                                required
                                onChange = {handleChange}
                            />
                            </Grid>
                            <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="ticketCounts"
                                label="Ticket Counts"
                                name="ticketCounts"
                                required
                                type="number"
                                onChange = {handleChange}
                            />
                            </Grid>
                            <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="ticketPrice"
                                label="Ticket Price"
                                name="ticketPrice"
                                readOnly
                                value={raffle.ticketPrice || ""}
                            />
                            </Grid>
                            <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="payment"
                                label="Payment"
                                name="payment"
                                readOnly
                                value={payment}
                            />
                            </Grid>
                        </Grid>
                    </form>
                  </CardContent>
                  <CardActions>
                    <Button
                        form="donate_form"
                        type="submit"
                        color="primary"
                        className={classes.submit}
                    >
                        Donate
                    </Button>
                    <Popup
                        deadline={popup.deadline}
                        erg={popup.erg}
                        address={popup.address || ""}
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
        }
        {!raffleExist && !connecting && (
            <EmptyCard 
                text={pageState}
            />
        )}
        {!raffleExist && connecting && (
            <ProgressCard />
        )}
        </Container>
      </main>
      <Footer />
    </React.Fragment>)
}
