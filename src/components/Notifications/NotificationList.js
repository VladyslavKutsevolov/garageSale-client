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

  return (
    <>
     <h1> Made it you fuckerr </h1> 
      {/* {state.notifications.length ? (
        state.notifications.map(notification => (
          <Typography variant='h4' />
            {`User ${notification.authorUsername} commented on ${notification.productTitle}: ${notification.comment}`}
          </Typography>
        ))
      ) : (
        <Typography variant='h4' />
            {`No new notifications`}
          </Typography>
      )} */}
    </>
  );
};

export default NotificationList;
