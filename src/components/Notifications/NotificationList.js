import React from 'react';
import { Typography } from '@material-ui/core/';
import { useStateData } from '../../context/appContext';

const NotificationList = () => {
  const { state } = useStateData();
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
