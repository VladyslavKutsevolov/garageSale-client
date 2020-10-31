import React from 'react';
import { Snackbar } from '@material-ui/core/';
import { useStateData } from '../../context/appContext';

const NotificationList = ({ notificationState, handleNotificationClose }) => {
  const { state } = useStateData();
  const { vertical, horizontal, open } = notificationState;
  console.log('state in notification list', state);

  return (
    <>
      {state.notifications.length ? (
        state.notifications.map(notification => (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={() => handleNotificationClose()}
            message={`User ${notification.from} commented on ${notification.product}: ${notification.comment}`}
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
