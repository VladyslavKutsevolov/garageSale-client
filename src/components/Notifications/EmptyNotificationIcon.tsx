import React, { FC } from 'react';
import { ListItemIcon, ListItem, ListItemText } from '@material-ui/core/';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useStateData } from '../../context/appContext';

interface INotificationIcon {
  setNotificationsOpen(n: boolean): void;
}

const EmptyNotificationIcon: FC<INotificationIcon> = ({
  setNotificationsOpen
}) => {
  const { getLatestComments, state } = useStateData();

  const handleNotificationClick = () => {
    getLatestComments(state.loginUser.id);
    setNotificationsOpen(true);
  };

  return (
    <>
      <ListItem button onClick={handleNotificationClick}>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Show Notifications" />
      </ListItem>
    </>
  );
};

export default EmptyNotificationIcon;
