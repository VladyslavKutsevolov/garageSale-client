import React, { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props: AlertProps) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const useStyles = makeStyles({
  root: {
    position: 'relative',
    top: '.1rem',
    marginBottom: '1rem'
  },
  snackBarPosition: {
    width: '10rem'
  }
});

interface IInfoMsg {
  error: boolean;
  message: string;
}

const InfoMsg: FC<IInfoMsg> = ({ error, message }) => {
  const classes = useStyles();

  // eslint-disable-next-line no-unneeded-ternary
  const isOpen = error || message ? true : false;

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={5000} className={classes.root}>
        <Alert severity={error ? 'error' : 'success'}>{error || message}</Alert>
      </Snackbar>
    </div>
  );
};

export default InfoMsg;
