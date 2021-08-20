import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';

import PopupSetWallet from '../components/popupSetWallet';
import {Box, IconButton, Menu, MenuItem} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: 5,
        paddingRight: 20,
    },
    lastLeftSide: {
        flexGrow: 1,
    },
    logo: {
        marginRight: 10,
    },
    menu: {
        paddingRight: 25,
    },
    links: {
        textDecoration: "none",
    },
    typo: {
        color: "white"
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const [walletAddr, setWalletAddr] = React.useState("")
    const [walletFeedback, setWalletFeedback] = React.useState(false)
    const [menuAnchor, setMenuAnchor] = React.useState(null);

    React.useEffect(() => {
        const walletAddress = localStorage.getItem('walletAddr')
        if (walletAddress !== null) setWalletAddr(walletAddress)
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setWalletFeedback(false);
    };

    const handleClose_menu = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMenuAnchor(null);
    };

    const handleSet = (e) => {
        setWalletAddr(e)
        localStorage.setItem('walletAddr', e)
    }

    const handleClear = (e) => {
        setWalletAddr("")
        localStorage.setItem('walletAddr', "")
    }

    return (
      <AppBar position="relative">
        <Toolbar>
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + '/logo_white.png'}
            height={45}
            width={45}
            alt="Ergo logo"
          />
          <Typography variant="h5" color="inherit" className={classes.title}>
            ERGO RAFFLE
          </Typography>
            <Box className={classes.menu} display={{xs: "block", md: "none"}}>
                <IconButton
                    aria-label="menu"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {setMenuAnchor(event.currentTarget)}}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={menuAnchor}
                    keepMounted
                    open={Boolean(menuAnchor)}
                    onClose={handleClose_menu}
                >
                    <MenuItem>
                        <Link to="/" className={classes.links}>
                                Home
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/create" className={classes.links}>
                            Create Raffle
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/faq" className={classes.links}>
                            FAQ
                        </Link>
                    </MenuItem>
                </Menu>
            </Box>
            <Box className={classes.menu} display={{xs: "none", md: "block"}}>
                <Link to="/" className={classes.links}>
                    <Typography variant="h6" color="textPrimary" className={classes.typo}>
                        Home
                    </Typography>
                </Link>
            </Box>
            <Box className={classes.menu} display={{xs: "none", md: "block"}}>
                <Link to="/create" className={classes.links}>
                    <Typography variant="h6" color="textPrimary" className={classes.typo}>
                        Create Raffle
                    </Typography>
                </Link>
            </Box>
            <Box className={classes.menu} display={{xs: "none", md: "block"}}>
                <Link to="/faq" className={classes.links}>
                    <Typography variant="h6" color="textPrimary" className={classes.typo}>
                        FAQ
                    </Typography>
                </Link>
            </Box>
          <div className={classes.lastLeftSide} />
            <Button
                variant="contained"
                onClick={() => {setWalletFeedback(true)}}
            >
                {(walletAddr) ? `Wallet: ${walletAddr.substring(0, 3)}...${walletAddr.substring(walletAddr.length-3)}` : "Set Wallet"}
            </Button>
            <PopupSetWallet
                open={walletFeedback}
                onClose={handleClose}
                setWallet={handleSet}
                clearWallet={handleClear}
                walletAddress={walletAddr}
          />
        </Toolbar>
      </AppBar>
    )
}
