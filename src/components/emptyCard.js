import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';

const useStyles = makeStyles((theme) => ({
  warningIcon: {
      fontSize: 100,
      color: "rgba(0, 0, 0, 0.1)"
  }
}));

export default function EmptyCard(props) {
    const classes = useStyles();
  
    return (
        <Card variant="outlined">
            <Box p={10}>
                <Box align="center">
                    <ReportProblemRoundedIcon className={classes.warningIcon}/>
                </Box>
                <Typography align="center" color="textSecondary">
                    {props.text}
                </Typography>
            </Box>
        </Card>
    )
}
