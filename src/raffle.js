import './App.css';

import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/raffle/:id">
            <Raffle />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
    const [raffles, setRaffles] = React.useState([
        {
            id: 1,
            name: "raffle_1",
            description: "hey this is raffle_1",
            deadline: 1000
        },
        {
            id: 2,
            name: "raffle_2",
            description: "hey this is raffle_2",
            deadline: 2000
        }
    ]);
    
    React.useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => {
        const persons = res.data;
        setRaffles(persons)
        })
    }, []);
    
    return (
        <div>
            <Grid container spacing={3}>>
            {raffles.map((raffle, ind) => (
                <Grid item xs={12} md={4} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                            {raffle.name}
                            </Typography>
                            <Typography variant="h5" component="h2">
                            {raffle.description}
                            </Typography>
                            <Typography color="textSecondary">
                            adjective
                            </Typography>
                            <Typography variant="body2" component="p">
                            {raffle.deadline}
                            <br />
                            {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={`/raffle/${raffle.id}`}>Topics</Link>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </div>
    );
}

function Raffle() {
    let { id } = useParams();
    return <h3>Requested topic ID: {id}</h3>;
}
