import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';

import PopupSetWallet from '../components/popupSetWallet';
import {Box, IconButton, Menu, MenuItem} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: 0,
        paddingRight: 20,
        fontSize: 28,
        fontWeight: "700",
        marginBottom: "-8px",
        cursor: "pointer"
    },
    subtitle: {
        fontSize: 14,
        textTransform: "lowercase",
        cursor: "pointer"

    },
    lastLeftSide: {
        flexGrow: 1,
    },
    logo: {
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        cursor: "pointer"
    },
    menu: {
        // float: "right",

        paddingRight: 25,
    },
    links: {
        textDecoration: "none",
    },
    typo: {
        color: "black"
    }
}));

function Header(props) {
    const classes = useStyles();
    const [walletFeedback, setWalletFeedback] = React.useState(false)
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const history = useHistory();

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

    const handleLogo = () => history.push('/');

    return (
      <AppBar color="transparent" position="relative" elevation={1}>
        <Toolbar>
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + '/logo_black.png'}
            height={54}
            width={54}
            alt="Ergo logo"
            onClick={handleLogo}
          />
          <div onClick={handleLogo}>
            <Typography variant="body1" color="inherit" className={classes.title}>
                ERGO
            </Typography>
            <Typography variant="body1" color="inherit" className={classes.subtitle}>
                RAFFLE
            </Typography>
          </div>
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

