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

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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

export default function Tickets(props) {
    const classes = useStyles();
    const [explorer, setExplorer] = React.useState("")

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
    }, [explorer]);

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" color="primary" component="h2">
                    Your Tickets
                </Typography>
                {props.total > 0 && (<div>
                        <Typography component="p" variant="h6">
                            You have <b>{props.totalTickets}</b> {(props.totalTickets) === 1 ? `ticket` : `tickets`}
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Transaction ID</TableCell>
                                    <TableCell>Ticket counts</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.tickets.map((ticket, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>
                                            <a target="_blank" href={`${explorer}en/transactions/${ticket.txId}`} className={classes.links}>
                                                {ticket.txId}
                                            </a>
                                        </TableCell>
                                        <TableCell>{ticket.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {!props.total && (
                    <Box p={2}>
                        <Box align="center">
                            <ReportProblemRoundedIcon className={classes.warningIcon}/>
                        </Box>
                        <Typography align="center" color="textSecondary">
                            {props.message}
                        </Typography>
                        <div align="center">
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={props.getTickets}
                                className={classes.submit}
                            >
                                Retry
                            </Button>
                        </div>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}
