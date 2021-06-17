import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';

import { Copyright } from '../App';
import Header from '../components/header';
import RaffleCard from '../components/raffleCard';

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
  warningIcon: {
      fontSize: 100,
      color: "rgba(0, 0, 0, 0.1)"
  }
}));

export default function Home() {
  const classes = useStyles();
  const [raffles, setRaffles] = React.useState([/**/
        {
            id: 1,
            name: "Raffle 1",
            description: "hey, this is raffle_1.",
            deadline: 1000
        },
        {
            id: 2,
            name: "Raffle 2",
            description: "hey, this is raffle_2.",
            deadline: 2000
        },
        {
            id: 3,
            name: "untitled",
            description: "no description found for this raffle.",
            deadline: 2000
        },
        {
            id: 4,
            name: "Raffle 4",
            description: "hey, this is raffle_4. The 4th raffle. This should be a two line description. Made a lot of effort to make this long.",
            deadline: 2000
        }
    /**/]);
  
    /* Get list of raffles from back-end */
    /*
    React.useEffect(() => {
        axios.get(`https://back-endAddress/raffles`)
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
      <main>
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
    </React.Fragment>
  );
}
