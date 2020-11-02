import React from 'react';
import { Snackbar, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useStateData } from '../../context/appContext';


const useStyles = makeStyles(() => ({
  root: {
    padding: '2px'
    // position: 'absolute'
  }
}));

const NotificationList = () => {
  const { state } = useStateData();
  console.log("state notification lit ", state)
  return (
    <>
      {state.notifications && state.notifications.length ? (
        state.notifications.map(notification => (
          <Typography variant='h6' >
            {`${notification.authorUsername} commented on ${notification.productTitle}: ${notification.comment }`}
          </Typography>
        ))
      ) : (
        <Typography variant='h6'>
          No new notifications
        </Typography>
      )}
    </>
  );
};

export default NotificationList;
