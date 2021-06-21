import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';

import Header from '../components/header';
import RaffleCard from '../components/raffleCard';
import Footer from '../components/footer';
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
  const [raffles, setRaffles] = React.useState([/**/
        {
            id: "34ae4a6cce4993d82493ba540d89e041eec192160149318a5eb450b291f4b3fb",
            name: "Raffle 1",
            description: "hey, this is raffle_1.",
            deadline: 515379
        },
        {
            id: "f6d73fcedba13d2eb5a00fa84a82d6535f6555f78afe6a893224cadd9f25b25a",
            name: "Raffle 2",
            description: "hey, this is raffle_2.",
            deadline: 515672
        },
        {
            id: "61060e39d76778a9a68298a3b89d5eaf81364aa5a4b5ba43b60a034cbd237b52",
            name: "untitled",
            description: "no description found for this raffle.",
            deadline: 516299
        },
        {
            id: "c21f30ae1db3700e02c419dd7c83750c526279890ba2b42840c8ae513a3dd5d5",
            name: "Raffle 4",
            description: "hey, this is raffle_4. The 4th raffle. This should be a two line description. Made a lot of effort to make this long.",
            deadline: 520091
        }
    /**/]);
  
    /* Get list of raffles from back-end */
    /*
    React.useEffect(() => {
        axios.get(`${baseUrl}/raffles`)
        .then(res => {
        const response = res.data;
        setRaffles(response)
        })
    }, []);
    */

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
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <RaffleCard raffle={raffle} />
              </Grid>
            ))}
            </Grid>
          }
          {!raffles.length && (
            <Card variant="outlined">
                <Box p={10}>
                    <Box align="center">
                        <ReportProblemRoundedIcon className={classes.warningIcon}/>
                    </Box>
                    <Typography align="center" color="textSecondary">
                        There are no raffle running
                    </Typography>
                </Box>
            </Card>
          )}
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
