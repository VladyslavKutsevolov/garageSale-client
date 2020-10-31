/* eslint-disable react/prop-types */
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    top: '.1rem',
    marginBottom: '1rem'
  },
  snackBarPosition: {
    width: '10rem'
  }
}));

const InfoMsg = ({ error, message }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={error || message}
        autoHideDuration={5000}
        onClose={handleClose}
        className={classes.root}
      >
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {error || message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InfoMsg;
