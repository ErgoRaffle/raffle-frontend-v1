import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
import Button from "@material-ui/core/Button";
import React from "react";

const useStyles = makeStyles((theme) => ({
    warningIcon: {
        fontSize: 100,
        color: "rgba(0, 0, 0, 0.1)"
    },
    submit: {
        marginTop: theme.spacing(2)
    },
}));

export default function EmptyCard(props) {
    const classes = useStyles();
  
    return (
        <Card variant="outlined">
            <Box p={10}>
                <Box align="center">
                    <ReportProblemRoundedIcon className={classes.warningIcon}/>
                </Box>
                <Typography align="center" color="textSecondary">
                    {props.text}
                </Typography>
                <div align="center">
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={props.retry}
                        className={classes.submit}
                    >
                        Retry
                    </Button>
                </div>
            </Box>
        </Card>
    )
}
