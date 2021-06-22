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
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardDeadline: {
    padding: "8px",
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd"
  },
  cardTitle: {
      paddingBottom: 0
  },
}));

export default function RaffleCard(props) {
    const classes = useStyles();
  
    return (
        <Card className={classes.card}>
          <CardContent className={classes.cardTitle}>
            <Typography gutterBottom variant="h5" color="primary" component="h2">
                {props.raffle.name}
            </Typography>
          </CardContent>
          <CardContent align="center">
            <img
                src={process.env.PUBLIC_URL + '/raffle_1.svg'}
                height={200}
                width={200}
                alt="Raffle"
            />
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography>
                {props.raffle.description}
            </Typography>
          </CardContent>
          <CardContent align="center" className={classes.cardDeadline}>
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
