import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorSnakbar(props) {
    
  return (
    <Snackbar
        open={props.onOpen}
        autoHideDuration={6000}
        onClose={props.onClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
    >
        <Alert onClose={props.onClose} severity="error">
            {props.message}
        </Alert>
    </Snackbar>
  );
}
