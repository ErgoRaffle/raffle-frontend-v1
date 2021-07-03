import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function ProgressCard() {
    return (
        <Card variant="outlined">
            <Box p={10}>
                <Box align="center">
                    <CircularProgress />
                </Box>
            </Box>
        </Card>
    )
}
