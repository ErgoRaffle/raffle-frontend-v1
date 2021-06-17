import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  logo: {
    marginRight: 10,
  }
}));

export default function Header(props) {
    const classes = useStyles();
  
    return (
      <AppBar position="relative">
        <Toolbar>
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + '/logo_white.png'}
            height={45}
            width={45}
          />
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            ERGO RAFFLE
          </Typography>
          {props.buttonLink && props.buttonText && <Link to={props.buttonLink}>
            <Button variant="contained">
                {props.buttonText}
            </Button>
          </Link>}
        </Toolbar>
      </AppBar>
    )
}
