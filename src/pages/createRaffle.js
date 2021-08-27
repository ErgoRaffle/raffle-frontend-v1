import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';

import Popup from '../components/popup';
import DynamicRecaptcha from '../components/dynamicRecaptcha';
import ErrorSnakbar from '../components/errorSnakbar';
import Header from '../components/header';
import Footer from '../components/footer';
import { baseUrl } from '../config/server';
import { terms } from '../config/terms'
import {FormControlLabel} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    captcha: {
        paddingTop: theme.spacing(2)
    },
    cardContainer: {
        marginBottom: 20
    }
}));

export default function CreateRaffle() {
    const classes = useStyles();
    const [formValues, setValues] = React.useState({
        "walletAddr": ""
    })
    const [popup, setPopup] = React.useState({})
    const [feedback, setFeedback] = React.useState(false);
    const [errorSnakbar, setErrorSnakbar] = React.useState(false);
    const [snakbarMessage, setSnakbarMessage] = React.useState("There was a problem connecting to the server");
    const [serviceShare, setServiceShare] = React.useState(0);
    const [winnerShare, setWinnerShare] = React.useState(0);
    const [captchaVerified, setCaptchaVerified] = React.useState(false);
    const [captchaRequired, setCaptchaRequired] = React.useState(true);
    const [agreedToTerms, setAgreedToTerms] = React.useState(false);
    const [deadlineEstimation, setDeadlineEstimation] = React.useState(0);
    const [formValidation, setFormValidation] = React.useState({
        "charityAddr": {
            "error": false,
            "text": ""
        },
        "walletAddr": {
            "error": false,
            "text": ""
        },
        "goal": {
            "error": false,
            "text": ""
        },
        "ticketPrice": {
            "error": false,
            "text": ""
        },
        "deadlineHeight": {
            "error": false,
            "text": ""
        },
        "charityPercent": {
            "error": false,
            "text": ""
        }
    })
    
    /* Get service share (Z) from back-end */
    React.useEffect(() => {
        axios.get(`${baseUrl}raffle_share`)
        .then(res => {
            const response = res.data;
            setServiceShare(response.z)
            setWinnerShare(100 - response.z)
        })
        .catch(error => {
            setServiceShare(0)
            setSnakbarMessage("There was a problem connecting to the server")
            setErrorSnakbar(true);
        })

        const walletAddress = localStorage.getItem('walletAddr')
        if (walletAddress !== null) setValues((prevState) => ({
            ...prevState,
            "walletAddr": walletAddress
        }))
    }, []);
    
    const handleChange_num = (e) => {
        if (e.target.name === "deadlineHeight") setDeadlineEstimation(e.target.value * 2)
        if (e.target.name === "charityPercent") setWinnerShare(100 - e.target.value - serviceShare)
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: (e.target.name === "ticketPrice" || e.target.name === "goal") ? Number(e.target.value) * 1000000000 : Number(e.target.value)
        }))
        validateInput_num(e.target.name, e.target.value)
    }
    
    const handleChange_str = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        validateInput_str(e.target.name, e.target.value)
    }

    const handleChange_checkbox = (e) => {
        setAgreedToTerms(e.target.checked)
    }
    
    const handleChange_captcha = (value) => {
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
    
    /* Request to create raffle */
    const handleCreate = (e) => {
        e.preventDefault()
        if (!captchaRequired || captchaVerified)
        {
            axios.post(`${baseUrl}raffle/add`, formValues)
            .then(res => {
                const response = res.data;
                setPopup(response)
                setFeedback(true);
            })
            .catch(error => {
                const response = error.response
                if (response.status === 400) setSnakbarMessage(response.data.message)
                else setSnakbarMessage("There was a problem connecting to the server")
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

    const handleEstimation = (value) => {
        if (value < 60) return `${value} minutes`
        else if (value < 1440) return `${Math.round(value / 60)} hours`
        else return `${Math.round(value / 1440)} days`
    }

    const validateBase58 = (address) => {
        const regex = RegExp("^[1-9A-HJ-NP-Za-km-z]+$")
        return address.match(regex) !== null
    }

    const validateInput_str = (name, value) => {
        if (name === "charityAddr") {
            if (validateBase58(value) || value === "") setFormValidation((prevState) => ({
                    ...prevState,
                    charityAddr: {
                        "error": false,
                        "text": ""
                    }
                }))
            else setFormValidation((prevState) => ({
                ...prevState,
                charityAddr: {
                    "error": true,
                    "text": "should be Base58"
                }
            }))
        }
        else if (name === "walletAddr") {
            if (validateBase58(value) || value === "") setFormValidation((prevState) => ({
                ...prevState,
                walletAddr: {
                    "error": false,
                    "text": ""
                }
            }))
            else setFormValidation((prevState) => ({
                ...prevState,
                walletAddr: {
                    "error": true,
                    "text": "should be Base58"
                }
            }))
        }
    }

    const validateInput_num = (name, value) => {
        if (name === "goal") {
            if (Number(value) >= 0.00001 || value === "") setFormValidation((prevState) => ({
                ...prevState,
                goal: {
                    "error": false,
                    "text": ""
                }
            }))
            else setFormValidation((prevState) => ({
                ...prevState,
                goal: {
                    "error": true,
                    "text": "minimum value is 0.00001 Erg"
                }
            }))
        }
        else if (name === "ticketPrice") {
            if (Number(value) >= 0.00001 || value === "") setFormValidation((prevState) => ({
                ...prevState,
                ticketPrice: {
                    "error": false,
                    "text": ""
                }
            }))
            else setFormValidation((prevState) => ({
                ...prevState,
                ticketPrice: {
                    "error": true,
                    "text": "minimum value is 0.00001 Erg"
                }
            }))
        }
        else if (name === "deadlineHeight") {
            if (Number(value) < 0 && value !== "") setFormValidation((prevState) => ({
                ...prevState,
                deadlineHeight: {
                    "error": true,
                    "text": "should be positive"
                }
            }))
            else if (Number(value) > 262800 && value !== "") setFormValidation((prevState) => ({
                ...prevState,
                deadlineHeight: {
                    "error": true,
                    "text": "maximum value is 262800"
                }
            }))
            else setFormValidation((prevState) => ({
                ...prevState,
                deadlineHeight: {
                    "error": false,
                    "text": ""
                }
            }))
        }
        else if (name === "charityPercent") {
            if (Number(value) < 0 && value !== "") setFormValidation((prevState) => ({
                ...prevState,
                charityPercent: {
                    "error": true,
                    "text": "should be positive"
                }
            }))
            else if (Number(value) + serviceShare > 100 && value !== "") setFormValidation((prevState) => ({
                ...prevState,
                charityPercent: {
                    "error": true,
                    "text": `should be between 0 and ${100 - serviceShare}`
                }
            }))
            else setFormValidation((prevState) => ({
                ...prevState,
                charityPercent: {
                    "error": false,
                    "text": ""
                }
            }))
        }
    }

  return (
    <React.Fragment>
      <Header />
    <main className={classes.main}>
    <Container component="main" maxWidth="lg" className={classes.container}>
      <CssBaseline />
        <Grid container className={classes.cardContainer} spacing={4}>
            <Grid item key="formCreate" xs={12} lg={6}>
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
                                error={formValidation.charityAddr.error}
                                helperText={formValidation.charityAddr.text}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="walletAddr"
                                label="Wallet Address"
                                name="walletAddr"
                                onChange = {handleChange_str}
                                value={formValues.walletAddr}
                                error={formValidation.walletAddr.error}
                                helperText={formValidation.walletAddr.text}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="goal"
                                label="Donation Goal (Erg)"
                                id="goal"
                                type="number"
                                inputProps={{step: "any"}}
                                onChange = {handleChange_num}
                                error={formValidation.goal.error}
                                helperText={formValidation.goal.text}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="ticketPrice"
                                label="Ticket Price (Erg)"
                                id="ticketPrice"
                                type="number"
                                inputProps={{step: "any"}}
                                onChange = {handleChange_num}
                                error={formValidation.ticketPrice.error}
                                helperText={formValidation.ticketPrice.text}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="deadlineHeight"
                                label="Deadline (Block)"
                                name="deadlineHeight"
                                type="number"
                                onChange = {handleChange_num}
                                error={formValidation.deadlineHeight.error}
                                helperText={formValidation.deadlineHeight.text}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  id="estimateDeadline"
                                  label="Estimation"
                                  name="estimateDeadline"
                                  disabled
                                  value={`about ${handleEstimation(deadlineEstimation)}`}
                              />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color="primary">
                                Shares (Percent)
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="charityPercent"
                                label="Charity"
                                name="charityPercent"
                                type="number"
                                onChange = {handleChange_num}
                                error={formValidation.charityPercent.error}
                                helperText={formValidation.charityPercent.text}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="winnerPercent"
                                label="Winner"
                                name="winnerPercent"
                                type="number"
                                disabled
                                value={winnerShare}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
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
                            {captchaRequired && (<Grid key="recaptcha" item xs={12}>
                                <DynamicRecaptcha
                                    onChange = {handleChange_captcha}
                                    onExpire = {handleExpire_captcha}
                                    onRequired = {setCaptchaRequired}
                                    onError = {popError}
                                />
                            </Grid>)}
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
                            disabled={
                                (!agreedToTerms) ||
                                formValidation.goal.error ||
                                formValidation.charityAddr.error ||
                                formValidation.charityPercent.error ||
                                formValidation.walletAddr.error ||
                                formValidation.deadlineHeight.error ||
                                formValidation.ticketPrice.error
                            }
                          >
                            Create
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
                          <Link to="/">
                            <Button fullWidth>
                                Back
                            </Button>
                          </Link>
                        </form>
                      </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item key="termCreate" xs={12} lg={6}>
                <Card>
                    <CardContent>
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
    </Container>
    </main>
    <Footer />
    </React.Fragment>
  );
}
