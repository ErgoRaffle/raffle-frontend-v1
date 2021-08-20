import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    buttons: {
        margin: 1,
    },
}));

export default function PopupSetWallet(props) {
  const classes = useStyles();
  const [walletAddr, setWalletAddr] = React.useState("")

    React.useEffect(() => {
        const walletAddress = localStorage.getItem('walletAddr')
        if (walletAddress !== null) setWalletAddr(walletAddress)
    }, []);

    const handleChange = (e) => {
        setWalletAddr(e.target.value)
    }

    const handleClear = () => {
        setWalletAddr("")
        props.clearWallet()
    }
    
  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <Typography component="h1" variant="h5" color="primary">
                Set wallet address
            </Typography>
        </DialogContent>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Your funds will be sent to this address.
            </DialogContentText>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="walletAddr"
                        label="Wallet Address"
                        name="walletAddr"
                        value={walletAddr}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Button
                        color="primary"
                        className={classes.buttons}
                        onClick={() => props.setWallet(walletAddr)}
                    >
                        Set
                    </Button>
                    <Button
                        color="primary"
                        className={classes.buttons}
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogContent>
        </DialogContent>
    </Dialog>
  );
}
