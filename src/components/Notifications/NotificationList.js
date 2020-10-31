import React from 'react';
import { Snackbar } from '@material-ui/core/';
import { useStateData } from '../../context/appContext';

const NotificationList = ({setNotificationState, notificationState, handleNotificationClose}) => {

  const { state } = useStateData();
  const { vertical, horizontal, open } = notificationState;
  console.log("state in notification list", state)
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
