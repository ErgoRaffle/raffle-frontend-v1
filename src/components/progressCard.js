import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const progressIcon = {
  size: 100,
  strokeWidth: 10
};

export default function ProgressCard() {
    return (
        <Card variant="outlined">
            <Box p={10}>
                <Box align="center">
                    <CircularProgress 
                        {...progressIcon}
                    />
                </Box>
            </Box>
        </Card>
    )
}
