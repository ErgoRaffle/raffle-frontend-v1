import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  logo: {
    marginRight: 10,
  }
}));

export default function RaffleCard(props) {
    const classes = useStyles();
  
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" color="primary" component="h2">
                {props.raffle.name}
            </Typography>
            <Typography>
                {props.raffle.description}
            </Typography>
            <Typography color="textSecondary">
                Deadline: {props.raffle.deadline}
            </Typography>
            </CardContent>
          <CardActions>
            <Link to={`/raffle/${props.raffle.id}`}>
            <Button 
                type="submit"
                color="primary"
            >
                More info
            </Button>
            </Link>
          </CardActions>
        </Card>
    )
}
