import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

import Header from '../components/header';
import Footer from '../components/footer';
import { terms } from '../config/terms'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    main: {
        minHeight: "calc(100vh - 148px)"
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
    },
}));

export default function FAQ() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleExpandClick = (index) => {
        (selectedIndex === index) ? setSelectedIndex(-1) : setSelectedIndex(index);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <main className={classes.main}>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid item key={0} xs={12}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => handleExpandClick(0)}>
                                <CardContent>
                                    <Typography variant="h5" color="primary" component="p">
                                        What is a raffle?
                                    </Typography>
                                </CardContent>
                                <Collapse in={0 === selectedIndex} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph color="textPrimary" >
                                            A raffle is a crowdfunding service that aims to enable anyone to raise enough money needed for a project. The project can be a direct donation to a charity, an academic or business plan, or anything else the creator can convince people to part with their hard-earned ERG for.
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            As an added bonus, after finishing the raffle, a lottery takes place, and a lucky participant wins the raffle reward.
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            The probability of winning the raffle reward is proportional to the participation; the more donations to the crowdfunding campaign, the more chance of winning the prize!
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            This raffle service is based on the Ergo network and raises Ergs for the projects. Other raffle settings are adaptable and can be customized by the raffle creator.
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item key={1} xs={12}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => handleExpandClick(1)}>
                                <CardContent>
                                    <Typography variant="h5" color="primary" component="p">
                                        How to create a new raffle?
                                    </Typography>
                                </CardContent>
                                <Collapse in={1 === selectedIndex} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph color="textPrimary" >
                                            This service is open for anyone who wants to start a legal crowdfunding campaign!
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            To start a new raffle, visit the "Create Raffle" page and fill in the specified information, including a description, price, funding goal, raffle deadline, and a winner reward percentage.
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            An address is then created based on the provided information, and you pay a small network fee to start the raffle. The proxy contract working behind the scenes for the raffle creation guarantees that the raffle is created with your specified information. In case of any issues, you can refund your creation fee before the raffle is created.
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item key={2} xs={12}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => handleExpandClick(2)}>
                                <CardContent>
                                    <Typography variant="h5" color="primary" component="p">
                                        How to participate in a raffle?
                                    </Typography>
                                </CardContent>
                                <Collapse in={2 === selectedIndex} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph color="textPrimary" >
                                            Anyone can participate in the active raffles by buying tickets. The raffle creator sets the ticket price, and the number of tickets you purchase will determine your chance of winning the prize pool. However, there is no benefit to splitting your orders to try and garner a higher chance of winning and it is best to buy at once.
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            You set the wallet address and specify the number of tickets you want to buy on the raffle page. An address is generated to which you send funds to complete your order.
                                            <b> Please pay close attention to the wallet address you've set </b>
                                            as any rewards will also be sent to this address if you win the raffle. Or in the case of an unsuccessful raffle or any problems, refunds will also be sent to this address.
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item key={3} xs={12}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => handleExpandClick(3)}>
                                <CardContent>
                                    <Typography variant="h5" color="primary" component="p">
                                        How do raffles finish?
                                    </Typography>
                                </CardContent>
                                <Collapse in={3 === selectedIndex} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph color="textPrimary" >
                                            Each raffle has a deadline set based on the network height and a goal set by the raffle creator for raised funds. If the raffle can raise enough money within the deadline, it will be marked as successful and funded. At the same time, the raffle prize-pool winner will also be announced and rewarded.
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            If the raffle can not raise enough money within the deadline, the raffle is unsuccessful, and all donators will be refunded. You are free to submit again with improvements or based on feedback from the community.
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item key={4} xs={12}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => handleExpandClick(4)}>
                                <CardContent>
                                    <Typography variant="h5" color="primary" component="p">
                                        What are raffle fees?
                                    </Typography>
                                </CardContent>
                                <Collapse in={4 === selectedIndex} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph color="textPrimary" >
                                            There are three types of fees within raffles. A raffle creation fee, a raffle donation fee, and a service fee. The first two fees are just network transaction fees; we do not charge any more for the service than facilitating the raffle creation and donation.
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            Currently, 5% of the total raised money by a successful raffle is paid as a service fee.
                                        </Typography>
                                        <Typography paragraph color="textPrimary" >
                                            It is worth mentioning that the service is fully decentralized; anyone can join the raffle or mark a raffle as successful or unsuccessful and take the needed actions. However, this service is designed such that anyone with any amount of knowledge can use it. The service uses proxy contracts for its activities; an advanced user can use this service through raw scripts and reduce the proxy transaction fees. You can read more technical details on the documentation page.
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </CardActionArea>
                        </Card>
                    </Grid>
                <Grid item key="terms" xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" color="primary" component="p">
                                Terms of use
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography paragraph color="textPrimary">
                                By participating or creating a raffle, you agree that:
                            </Typography>
                            <ul>
                                {terms.map(term => (<li><Typography paragraph color="textPrimary" >
                                    {term}
                                </Typography></li>))}
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
                </Container>
            </main>
            <Footer />
        </React.Fragment>
    )
}
