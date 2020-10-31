import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Snackbar,
  ListItemIcon,
  ListItem,
  ListItemText,
  Dialog
} from '@material-ui/core/';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationList from './NotificationList';

const useStyles = makeStyles(() => ({
  root: {
    display: 'inwline'
  }
}));

const NotificationIcon = () => {
  const [notificationState, setNotificationState] = useState(false);

  const handleNotificationClick = () => {
    setNotificationState(true);
  };

  const handleNotificationClose = () => {
    setNotificationState(false);
  };

  return (
    <>
      <ListItem button onClick={handleNotificationClick()}>
        <ListItemIcon>
          <NotificationsIcon />
          {/* <NotificationList
            setNotificationState={setNotificationState}
            notificationState={notificationState}
            handleNotificationClose={handleNotificationClose}
          /> */}
        </ListItemIcon>
        <ListItemText primary="Show Notifications" />
      </ListItem>
    </>
  );
};

export default NotificationIcon;
