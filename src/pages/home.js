import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import Typography from '@material-ui/core/Typography';

import Header from '../components/header';
import RaffleCard from '../components/raffleCard';
import Footer from '../components/footer';
import EmptyCard from '../components/emptyCard';
import ProgressCard from '../components/progressCard';
import { baseUrl } from '../config/server';
import Card from "@material-ui/core/Card";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    warningIcon: {
        fontSize: 100,
        color: "rgba(0, 0, 0, 0.1)"
    },
    main: {
        minHeight: "calc(100vh - 148px)"
    },
    cardContainer: {
        marginBottom: 20
    },
    testnetBox: {
        marginBottom: theme.spacing(2)
    },
    title: {
      paddingBottom: 12,
      fontWeight: "700",
      letterSpacing: "-0.8px"
    },
    subtitle: {
        paddingBottom: 12,
        maxWidth: 500,
        fontWeight: "400",
        letterSpacing: "-0.8px"
    },
    titleContainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2)
    }
}));

export default function Home() {
  const classes = useStyles();
  const [raffles, setRaffles] = React.useState([]);
  const [connecting, setConnecting] = React.useState(true);
  const [pageState, setPageState] = React.useState("Connecting to server");
  const [moreRaffles, setMoreRaffles] = React.useState(true);
  const [rafflesOffset, setOffset] = React.useState(0);
  const [currentHeight, setCurrentHeight] = React.useState(0)
  
    /* Get list of raffles from back-end */
    React.useEffect(() => {
        getRaffles()
    }, []);
    
    const getRaffles = () => {
        setConnecting(true)
        axios.get(`${baseUrl}raffle?offset=${rafflesOffset}&limit=9`)
        .then(res => {
            const response = res.data
            const newRaffles = raffles.concat(response.items)
            setRaffles(newRaffles)
            setCurrentHeight(response.currentHeight)
            setOffset(newRaffles.length)
            setConnecting(false)
            
            if (response.total < 9)
            {
                setMoreRaffles(false)
            }
            if (newRaffles.length)
            {
                setPageState("Raffles received")
            }
            else
            {
                setPageState("There are no raffle running")
            }
        })
        .catch(error => {
            setConnecting(false)
            setPageState("There was a problem connecting to the server")
        })
    }
    
    const checkEndOfRaffles = () => {
        if (moreRaffles && !connecting)
        {
            getRaffles()
        }
    }
 
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main className={classes.main}>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Card variant="outlined" className={classes.testnetBox}>
              <Alert severity="warning">
                  You are using the Beta release. It's generally safe to use the raffle at this stage, but be sure that you understand the risks that come with it. Therefore, do not use it for mission critical campaigns and do not donate more than what you can afford to lose.
              </Alert>
            </Card>
            <div className={classes.titleContainer}>
                <Typography variant="h4" component="h2" color="inherit" className={classes.title}>
                    Browse Raffles
                </Typography>
                <Typography variant="h5" component="h3" color="inherit" className={classes.subtitle}>
                    People all around the world are raising money for what really matters.
                </Typography>
            </div>
          {raffles && (
            <Grid container className={classes.cardContainer} spacing={4}>
                <BottomScrollListener onBottom={checkEndOfRaffles}>
                    {raffles.map((raffle, ind) => (
                    <Grid item key={ind} xs={12} sm={6} md={4} lg={4}>
                        <RaffleCard raffle={raffle} currentHeight={currentHeight}/>
                    </Grid>
                    ))}
                </BottomScrollListener>
            </Grid>
          )}
          {!raffles.length && !connecting && (
            <EmptyCard 
                text={pageState}
                retry={getRaffles}
            />
          )}
          {connecting && (
            <ProgressCard />
          )}
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
