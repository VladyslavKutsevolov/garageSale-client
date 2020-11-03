import React from 'react';
import {
  ListItemIcon,
  ListItem,
  ListItemText
} from '@material-ui/core/';
import NotificationsIcon from '@material-ui/icons/Notifications';

const EmptyNotificationIcon = ({ setNotificationsOpen }) => {

  const handleNotificationClick = () => {
    setNotificationsOpen(true);
  };

  return (
    <>
      <ListItem button onClick={handleNotificationClick} >
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Show Notifications" />
      </ListItem>
    </>
  );
};

export default EmptyNotificationIcon;
