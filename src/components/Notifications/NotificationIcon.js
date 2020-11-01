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
    display: 'inline'
  }
}));

const NotificationIcon = ({ setNotificationsOpen }) => {
  const handleNotificationClick = () => {
    setNotificationsOpen(true);
  };

  return (
    <>
      <ListItem button onClick={handleNotificationClick} >
        <ListItemIcon>
          <NotificationsIcon
          />
        </ListItemIcon>
        <ListItemText primary="Show Notifications" />
      </ListItem>
    </>
  );
};

export default NotificationIcon;
