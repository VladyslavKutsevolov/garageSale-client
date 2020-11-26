import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, ListItem, ListItemText } from '@material-ui/core/';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles(() => ({
  root: {
    color: 'green'
  }
}));

const NotificationIcon = ({ setNotificationsOpen, setNotificationsRead }) => {
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

NotificationIcon.propTypes = {
  setNotificationsOpen: PropTypes.func.isRequired,
  setNotificationsRead: PropTypes.func.isRequired
};

export default NotificationIcon;
