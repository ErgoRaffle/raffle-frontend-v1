import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from "react";

import { baseUrl } from '../config/server';
import Box from "@material-ui/core/Box";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import axios from "axios";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: "1px solid #C4C4C4",
        borderRadius: 4,

    },
    cardContent: {
        flexGrow: 1,
    },
    links: {
        textDecoration: "none",
        color: "primary"
    },
    warningIcon: {
        fontSize: 100,
        color: "rgba(0, 0, 0, 0.1)"
    },
    submit: {
        marginTop: theme.spacing(2)
    },
}));

function Tickets(props) {
    const classes = useStyles();
    const [explorer, setExplorer] = React.useState("")
    const [tickets, setTickets] = React.useState([]);
    const [ticketsCounts, setTicketsCounts] = React.useState({
        "totalTickets": 0,
        "total": 0
    })
    const [ticketMessage, setTicketMessage] = React.useState("");

    React.useEffect(() => {
        if (explorer === "")
        {
            axios.get(`${baseUrl}explorer`)
                .then(res => {
                    const response = res.data;
                    setExplorer(response.explorerUrl)
                })
                .catch(res => {
                    props.onError("There was a problem connecting to the server")
                })
        }

        getTickets(props.id)
    }, [explorer]);

    React.useEffect(() => {
        getTickets(props.id)
    }, [props.walletAddr]);

    const getTickets = (id) => {
        if (props.walletAddr !== "") axios.post(`${baseUrl}tickets`, {
            "walletAddr": props.walletAddr,
            "raffleId": id
        })
            .then(res => {
                const response = res.data;
                setTickets(response.items)
                setTicketsCounts({
                    "totalTickets": response.totalTickets,
                    "total": response.total
                })
                setTicketMessage("You have no tickets in this raffle")
            })
            .catch(error => {
                const response = error.response
                setTickets([])
                setTicketsCounts({
                    "totalTickets": 0,
                    "total": 0
                })
                if (response.status === 400) setTicketMessage(response.data.message)
                else setTicketMessage("There was a problem connecting to the server")
            })
        else
        {
            setTickets([])
            setTicketsCounts({
                "totalTickets": 0,
                "total": 0
            })
            setTicketMessage("Set your wallet address to see your tickets")
        }
    }

    return (
        <Card className={classes.card} elevation={0}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    Your Tickets
                </Typography>
                {(ticketsCounts.total > 0) ? (<div>
                        <Typography component="p" variant="h6">
                            You have <b>{ticketsCounts.totalTickets}</b> {(ticketsCounts.totalTickets) === 1 ? `ticket` : `tickets`}
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Transaction ID</TableCell>
                                    <TableCell>Ticket counts</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>
                                            <a target="_blank" href={`${explorer}/en/transactions/${ticket.txId}`} className={classes.links}>
                                                {ticket.txId}
                                            </a>
                                        </TableCell>
                                        <TableCell>{ticket.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : null}
                {(ticketsCounts.total === 0) ? (
                    <Box p={2}>
                        <Box align="center">
                            <ReportProblemRoundedIcon className={classes.warningIcon}/>
                        </Box>
                        <Typography align="center" color="textSecondary">
                            {ticketMessage}
                        </Typography>
                        <div align="center">
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={getTickets}
                                className={classes.submit}
                            >
                                Retry
                            </Button>
                        </div>
                    </Box>
                ) : null}
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    walletAddr: state.walletAddr
})

export default connect(mapStateToProps)(Tickets)

