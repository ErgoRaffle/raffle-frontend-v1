import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  time: {
    fontSize: 32
  },
  copyText: {
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#efefef"
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#cccccc",
      }
  }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const timerProps = {
  isPlaying: true,
  size: 160,
  strokeWidth: 12
};

export default function Popup(props) {
    const classes = useStyles();
    const [copiedSnackbar, setCopiedSnackbar] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCopiedSnackbar(false);
    };

    return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <b>{'\u26A0'} Click on the amount and the address to copy them! </b>
        </DialogContentText>
    </DialogContent>
    <DialogContent align="center">
        <CountdownCircleTimer
            {...timerProps}
            isPlaying
            duration={props.deadline}
            colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
            ]}
        >
            {({ remainingTime }) => (
                <div>
                    <Typography color="primary">Remaining</Typography>
                    <Typography className={classes.time}>{remainingTime}</Typography>
                    <Typography color="primary">seconds</Typography>
                </div>)}
        </CountdownCircleTimer>
    </DialogContent>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Send exactly
        <CopyToClipboard text={props.erg / 1000000000} onCopy={() => {setCopiedSnackbar(true)}}>
            <b className={classes.copyText}> {props.erg / 1000000000} </b>
        </CopyToClipboard>
        ERG to
        <CopyToClipboard text={props.address} onCopy={() => {setCopiedSnackbar(true)}}>
            <b className={classes.copyText}> {(props.address.length > 40) ? `${props.address.substring(0, 20)}...${props.address.substring(props.address.length-20)}` : props.address}</b>
        </CopyToClipboard>
        ; the operation will be done automatically afterward.
        </DialogContentText>
        <Snackbar
            open={copiedSnackbar}
            autoHideDuration={1500}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <Alert onClose={props.onClose} severity="info">
                Copied!
            </Alert>
        </Snackbar>
    </DialogContent>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Your funds will be sent back to you in case of any failure. Smart contracts are being used to prevent the intermediate service from cheating!
        </DialogContentText>
    </DialogContent>
    </Dialog>
  );
}
