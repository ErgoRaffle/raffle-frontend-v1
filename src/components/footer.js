import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Ergo Raffle
      </Link>{' '}
      {2021}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
  }
}));

export default function Header(props) {
    const classes = useStyles();
  
    return (
      <Box p={4} className={classes.footer} variant="outlined">
        <Copyright />
      </Box>
    )
}
