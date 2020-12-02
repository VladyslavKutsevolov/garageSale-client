import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, ListItem, ListItemText } from '@material-ui/core/';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles(() => ({
  root: {
    color: 'green'
  }
}));

interface IIcon {
  setNotificationsOpen(val: boolean): void;
  setNotificationsRead(val: boolean): void;
}

const NotificationIcon: FC<IIcon> = ({
  setNotificationsOpen,
  setNotificationsRead
}) => {
  const classes = useStyles();
  const { getLatestComments, state } = useStateData();
  const handleNotificationClick = () => {
    getLatestComments(state.loginUser.id);
    setNotificationsOpen(true);
    setNotificationsRead(true);
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
