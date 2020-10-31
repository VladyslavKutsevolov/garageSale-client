import React from 'react';
import { Snackbar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2px'
    // position: 'absolute'
  }
}));

const NotificationList = ({ notificationState, handleNotificationClose }) => {
  const classes = useStyles();
  const { state } = useStateData();
  const { vertical, horizontal, open } = notificationState;

  return (
    <>
      {state.notifications.length ? (
        state.notifications.map(notification => (
          <Snackbar
            className={classes.root}
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={() => handleNotificationClose()}
            message={`User ${notification.authorUsername} commented on ${notification.productTitle}: ${notification.comment}`}
          />
        ))
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={() => handleNotificationClose()}
          message="No new notifications"
          key={vertical + horizontal}
        />
      )}
    </>
  );
};

export default NotificationList;
