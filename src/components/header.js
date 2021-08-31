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
import { connect } from "react-redux";

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

function Header(props) {
    const classes = useStyles();
    const [walletFeedback, setWalletFeedback] = React.useState(false)
    const [menuAnchor, setMenuAnchor] = React.useState(null);

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
                {(props.walletAddr) ? `Wallet: ${props.walletAddr.substring(0, 3)}...${props.walletAddr.substring(props.walletAddr.length-3)}` : "Set Wallet"}
            </Button>
            {(walletFeedback) ? (<PopupSetWallet
                onClose={handleClose}
            />) : null}
        </Toolbar>
      </AppBar>
    )
}

const mapStateToProps = (state) => ({
    walletAddr: state.walletAddr
})

export default connect(mapStateToProps)(Header)

