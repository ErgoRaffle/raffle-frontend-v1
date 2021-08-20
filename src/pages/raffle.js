import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { useParams } from "react-router-dom";

import Popup from '../components/popup';
import DynamicRecaptcha from "../components/dynamicRecaptcha";
import ErrorSnakbar from '../components/errorSnakbar';
import Header from '../components/header';
import Footer from '../components/footer';
import EmptyCard from '../components/emptyCard';
import ProgressCard from '../components/progressCard';
import { baseUrl } from '../config/server';
import {terms} from '../config/terms'
import {CircularProgress, FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";

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
    },
    paper: {
        padding: theme.spacing(8),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    termPaper: {
        padding: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    progress: {
        fontSize: 20
    },
    depositInfo: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    },
    depositProgress: {
        marginRight: theme.spacing(2)
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
    const [snakbarMessage, setSnakbarMessage] = React.useState("There was a problem connecting to the server");
    const [formValues, setValues] = React.useState({
        "id": id,
        "walletAddr": ""
    })
    const [connecting, setConnecting] = React.useState(true);
    const [pageState, setPageState] = React.useState("Connecting to server");
    const [payment, setPayment] = React.useState(0);
    const [captchaVerified, setCaptchaVerified] = React.useState(false);
    const [captchaRequired, setCaptchaRequired] = React.useState(true);
    const [agreedToTerms, setAgreedToTerms] = React.useState(false);
    
    /* Get raffle data from back-end */
    React.useEffect(() => {
        getRaffleInfo(id)

        const walletAddress = localStorage.getItem('walletAddr')
        if (walletAddress !== null) setValues((prevState) => ({
            ...prevState,
            "walletAddr": walletAddress
        }))
    }, [id]);

    const getRaffleInfo = (id) => {
        setConnecting(true)
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
    }
    
    const handleChange = (e) => {
        let value = e.target.value
        if (e.target.name === "ticketCounts")
        {
            value = Number(value)
            setPayment(value * raffle.ticketPrice + 2 * raffle.fee)
        }
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: value
        }))
    }
    const handleChange_checkbox = (e) => {
        setAgreedToTerms(e.target.checked)
    }
    
    const handleChange_captcha = (value) => {
        console.log("Form value:", value)
        setValues((prevState) => ({
            ...prevState,
            captcha: value
        }))
        setCaptchaVerified(true)
    }
    
    const handleExpire_captcha = () => {
        setValues((prevState) => ({
            ...prevState,
            captcha: null
        }))
        setCaptchaVerified(false)
    }
    
    /* Request to donate to the raffle */
    const handleDonate = (e) => {
        e.preventDefault()
        if (!captchaRequired || captchaVerified)
        {
            axios.post(`${baseUrl}raffle/donate`, formValues)
            .then(res => {
                const response = res.data;
                setPopup(response)
                setFeedback(true);
            })
            .catch(res => {
                setSnakbarMessage("There was a problem connecting to the server")
                setErrorSnakbar(true);
            })
        }
        else
        {
            setSnakbarMessage("Please verify that you are not a robot")
            setErrorSnakbar(true);
        }
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

    const popError = (message) => {
        setSnakbarMessage(message)
        setErrorSnakbar(true);
    }
    
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
                        {raffle.description.split("\n").map(row => (
                            <div>
                                {row}
                            </div>
                        ))}
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
                      <Grid container display="inline-flex">
                          <Grid item x={8} className={classes.depositInfo}>
                              <Typography component="p" variant="h5">
                                  Raised: {raffle.erg / 1000000000} ERG
                              </Typography>
                              <Typography color="textSecondary">
                                  {`Donation Goal: ${raffle.min / 1000000000} ERG`}
                              </Typography>
                          </Grid>
                          <Grid item x={4} className={classes.depositProgress}>
                              <Box position="relative" display="inline-flex">
                                  <CircularProgress
                                      variant="determinate"
                                      value={Math.min(Math.round(raffle.erg * 100 / raffle.min), 100)}
                                      size={80}/>
                                  <Box
                                      top={0}
                                      left={0}
                                      bottom={0}
                                      right={0}
                                      position="absolute"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                  >
                                      <Typography
                                          variant="caption"
                                          component="div"
                                          color="textSecondary"
                                          className={classes.progress}
                                      >
                                          {`${Math.round(raffle.erg * 100 / raffle.min)}%`}
                                      </Typography>
                                  </Box>
                              </Box>
                          </Grid>
                      </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="raffleTokenId"
                            label="Raffle ID"
                            name="raffleTokenId"
                            disabled
                            value={raffle.id || ""}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="charityAddr"
                            label="Charity Address"
                            name="charityAddr"
                            disabled
                            value={raffle.charityAddr || ""}
                        />
                        </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                  <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                          <Grid container spacing={2}>
                              <Grid item xs={12}>
                                  <TextField
                                      id="deadline"
                                      label="Deadline"
                                      name="Deadline"
                                      disabled
                                      value={`Block ${raffle.deadline}, ${(raffle.deadline > raffle.currentHeight) ? `about ${Math.round((raffle.deadline - raffle.currentHeight) / 30)} hours` : `Ended`}`}
                                  />
                              </Grid>
                              <Grid item xs={4}>
                                  <TextField
                                      fullWidth
                                      id="charityPercent"
                                      label="Charity"
                                      name="charityPercent"
                                      disabled
                                      value={raffle.charityPercent || ""}
                                  />
                              </Grid>
                              <Grid item xs={4}>
                                  <TextField
                                      fullWidth
                                      id="winnerPercent"
                                      label="Winner"
                                      name="winnerPercent"
                                      disabled
                                      value={raffle.winnerPercent || ""}
                                  />
                              </Grid>
                          </Grid>
                      </CardContent>
                  </Card>
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={12} lg={6}>
                  <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                          <div className={classes.paper}>
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
                                              value={formValues.walletAddr}
                                          />
                                      </Grid>
                                      <Grid item xs={8}>
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
                                              label="Ticket Price (Erg)"
                                              name="ticketPrice"
                                              disabled
                                              value={raffle.ticketPrice / 1000000000 || ""}
                                          />
                                      </Grid>
                                      <Grid item xs={4}>
                                          <TextField
                                              fullWidth
                                              id="fee"
                                              label="Fee (Erg)"
                                              name="fee"
                                              disabled
                                              value={raffle.fee / 1000000000 || ""}
                                          />
                                      </Grid>
                                      <Grid item xs={8}>
                                          <TextField
                                              fullWidth
                                              id="payment"
                                              label="Payment (Erg)"
                                              name="payment"
                                              disabled
                                              value={payment / 1000000000}
                                          />
                                      </Grid>
                                      <Grid item xs={12}>
                                          <div  align="center" className={classes.captcha}>
                                              <DynamicRecaptcha
                                                  onChange = {handleChange_captcha}
                                                  onExpire = {handleExpire_captcha}
                                                  onRequired = {setCaptchaRequired}
                                                  onError = {popError}
                                              />
                                          </div>
                                      </Grid>
                                      <Grid item xs={12}>
                                          <FormControlLabel
                                              control={
                                                  <Checkbox
                                                      checked={agreedToTerms}
                                                      onChange = {handleChange_checkbox}
                                                      inputProps = {{ 'aria-label': 'primary checkbox'}}
                                                      color="primary"
                                                      size="small"
                                                  />
                                              }
                                              label="I agree to the Terms of use."
                                          />
                                      </Grid>
                                  </Grid>
                                  <Button
                                      type="submit"
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                      className={classes.submit}
                                      disabled={!agreedToTerms}
                                  >
                                      Donate
                                  </Button>
                                  <Popup
                                      deadline={popup.deadline}
                                      erg={popup.fee}
                                      address={popup.address || ""}
                                      open={feedback}
                                      onClose={handleClose}
                                  />
                                  <ErrorSnakbar
                                      onOpen={errorSnakbar}
                                      onClose={handleError}
                                      message={snakbarMessage}
                                  />
                              </form>
                          </div>
                      </CardContent>
                  </Card>
              </Grid>
              <Grid item key="termCreate" xs={12} sm={12} md={6}>
                  <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                          <div className={classes.paper}>
                              <Typography component="h1" variant="h5" color="primary">
                                  Terms of use
                              </Typography>
                          </div>
                          <div className={classes.termPaper}>
                              <Typography paragraph color="textPrimary">
                                  By participating or creating a raffle, you agree that:
                              </Typography>
                              <ul>
                                  {terms.map(term => (<li><Typography paragraph color="textPrimary" >
                                      {term}
                                  </Typography></li>))}
                              </ul>
                          </div>
                      </CardContent>
                  </Card>
              </Grid>
          </Grid>
        }
        {!raffleExist && !connecting && (
            <EmptyCard 
                text={pageState}
                retry={() => getRaffleInfo(id)}
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
