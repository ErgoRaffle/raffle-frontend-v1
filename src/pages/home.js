import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

import Header from '../components/header';
import RaffleCard from '../components/raffleCard';
import Footer from '../components/footer';
import EmptyCard from '../components/emptyCard';
import { baseUrl } from '../config/server';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  warningIcon: {
      fontSize: 100,
      color: "rgba(0, 0, 0, 0.1)"
  },
  main: {
      minHeight: "calc(100vh - 148px)"
  }
}));

export default function Home() {
  const classes = useStyles();
  const [raffles, setRaffles] = React.useState([]);
  
    /* Get list of raffles from back-end */
    React.useEffect(() => {
        axios.get(`${baseUrl}/raffle`)
        .then(res => {
            const response = res.data
            if (response.code === 200)
            {
                console.log("we're good")
                setRaffles(response.items)
            }
            else
            {
                console.log("response not 200 case")
                setRaffles([])
            }
        })
        .catch(res => {
            console.log("catch case")
            setRaffles([])
        })
    }, []);
    

  return (
    <React.Fragment>
      <CssBaseline />
      <Header 
        buttonLink="/create"
        buttonText="Create Raffle"
      />
      <main className={classes.main}>
        <Container className={classes.cardGrid} maxWidth="lg">
          {raffles && <Grid container spacing={4}>
            {raffles.map((raffle, ind) => (
              <Grid item key={ind} xs={12} sm={6} md={4} lg={4}>
                <RaffleCard raffle={raffle} />
              </Grid>
            ))}
            </Grid>
          }
          {!raffles.length && (
            <EmptyCard 
                text="There are no raffle running"
            />
          )}
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
