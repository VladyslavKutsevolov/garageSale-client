import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import NotificationList from './NotificationList';
import { useStateData } from '../../context/appContext';

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

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  actionButtons: {
    display: 'flex',
    marginTop: '1.2rem',
    justifyContent: 'center'
  },
  submitButton: {
    marginRight: '.5rem'
  },
  upload: {
    marginTop: '1.2rem'
  },
  uploadButtonControl: {
    display: 'flex',
    alignItems: 'center'
  },
  filename: {
    marginLeft: '1rem'
  }
}));

const NotificationModal = ({ notificationsOpen, setNotificationsOpen }) => {
  const classes = useStyles();
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
