import React, { FC, useState } from 'react';
import { Modal } from '@material-ui/core';
import NotificationList from './NotificationList';
import { useStateData } from '../../context/appContext';
import { modalStyles } from './styles';

const rand = () => Math.round(Math.random() * 20) - 10;

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

interface INotificationModal {
  notificationsOpen: boolean;
  setNotificationsOpen(val: boolean): void;
}

const NotificationModal: FC<INotificationModal> = ({
  notificationsOpen,
  setNotificationsOpen
}) => {
  const classes = modalStyles();
  const [modalStyle] = useState(getModalStyle);
  const { clearNotifications } = useStateData();

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
    clearNotifications();
  };

  return (
    <>
      <Modal open={notificationsOpen} onClose={handleNotificationsClose}>
        <div style={modalStyle} className={classes.paper}>
          <NotificationList />
        </div>
      </Modal>
    </>
  );
};

export default NotificationModal;
