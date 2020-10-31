import React, { useState } from 'react';
import {
  Snackbar,
  ListItemIcon,
  ListItem,
  ListItemText
} from '@material-ui/core/';

import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationList from './NotificationList';

const NotificationIcon = () => {
  const [notificationState, setNotificationState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });


  const handleNotificationClick = newState => () => {
    setNotificationState({ open: true, ...newState });
  };

  const handleNotificationClose = () => {
    setNotificationState({ ...notificationState, open: false });
  };

  return (
    <>
      <ListItem
        button
        onClick={handleNotificationClick({
          vertical: 'bottom',
          horizontal: 'center'
        })}
      >
        <ListItemIcon>
          <NotificationsIcon />
          <NotificationList
            setNotificationState={setNotificationState}
            notificationState={notificationState}
            handleNotificationClose={handleNotificationClose}
          />
        </ListItemIcon>
        <ListItemText primary="Show Notifications" />
      </ListItem>
    </>
  );
};

export default NotificationIcon;
