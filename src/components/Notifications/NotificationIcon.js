import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, ListItem, ListItemText } from '@material-ui/core/';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles(() => ({
  root: {
    color: 'green'
  }
}));

const NotificationIcon = ({ setNotificationsOpen }) => {
  const classes = useStyles();

  const handleNotificationClick = () => {
    setNotificationsOpen(true);
  };

  return (
    <>
      <ListItem button onClick={handleNotificationClick}>
        <ListItemIcon>
          <NotificationsActiveIcon className={classes.root} />
        </ListItemIcon>
        <ListItemText primary="Show Notifications" />
      </ListItem>
    </>
  );
};

export default NotificationIcon;
