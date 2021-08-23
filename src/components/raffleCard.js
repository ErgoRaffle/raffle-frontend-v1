import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from "react";

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

function raffleIcon(raffleId) {
    const id = parseInt(raffleId, 16)
    return `/raffle_${id % 3}.svg`
}

export default function RaffleCard(props) {
    const classes = useStyles();

    const deadlineString = (deadline, currentHeight) => {
        if (deadline > currentHeight && deadline - currentHeight < 30) return `Deadline: about ${(deadline - currentHeight) * 2} minutes`
        else if (deadline > currentHeight && deadline - currentHeight < 60) return `Deadline: about an hour`
        else if (deadline > currentHeight && deadline - currentHeight < 720) return `Deadline: about ${Math.round((deadline - currentHeight) / 30)} hours`
        else if (deadline > currentHeight) return `Deadline: about ${Math.round((deadline - currentHeight) / 720)} days`
        else return `Ended`
    }

    const briefDescription = (description) => {
        if (description.length > 100 || description.split("\n").length > 2)
        {
            var new_description = description.substring(0, 100).split("\n").slice(0, 2)
            const l = new_description.length
            new_description[l-1] = new_description[l-1].concat("...")
            return new_description
        }
        else return description.split("\n")
    }
  
    return (
        <Card className={classes.card}>
          <CardContent className={classes.cardTitle}>
            <Typography gutterBottom variant="h5" color="primary" component="h2">
                {props.raffle.name}
            </Typography>
          </CardContent>
          <CardContent align="center">
            <img
                src={process.env.PUBLIC_URL + raffleIcon(props.raffle.id)}
                height={200}
                width={200}
                alt="Raffle"
            />
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography>
                {briefDescription(props.raffle.description).map(row => (
                    <div>
                        {row}
                    </div>
                ))}
            </Typography>
          </CardContent>
          <CardContent align="center" className={classes.cardDeadline}>
            <Typography color="textSecondary">
                {deadlineString(props.raffle.deadline, props.currentHeight)}
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
