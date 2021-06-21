import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/" color="inherit" href="https://material-ui.com/">
        Ergo Raffle
      </Link>{' '}
      {2021}
      {'.'}
    </Typography>
  );
}

export default function Header(props) {  
    return (
      <Box p={4} variant="outlined">
        <Copyright />
      </Box>
    )
}
