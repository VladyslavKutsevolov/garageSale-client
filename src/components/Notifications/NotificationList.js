import React from 'react';
import { Snackbar } from '@material-ui/core/';

const NotificationList = ({setNotificationState, notificationState, handleNotificationClose}) => {

  const { vertical, horizontal, open } = notificationState;

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={() => handleNotificationClose()}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </>
  )
};

export default NotificationList;
