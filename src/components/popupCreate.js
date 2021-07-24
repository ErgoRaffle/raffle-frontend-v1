import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';

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

export default function PopupCreate(props) {
  const classes = useStyles();
    
  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <b>{'\u26A0'} Click on the address to copy it! </b>
        </DialogContentText>
    </DialogContent>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Your raffle created. You can verify it by checking transaction id 
        <b
            onClick={() => {navigator.clipboard.writeText(props.address)}}
            className={classes.copyText}
        > {props.txId} </b> in the explorer.
        </DialogContentText>
    </DialogContent>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
        The raffle will add to raffle list once it confirmed on blockchain.
        </DialogContentText>
    </DialogContent>
    </Dialog>
  );
}
