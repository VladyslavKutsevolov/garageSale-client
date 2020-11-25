/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button, Modal } from '@material-ui/core';
import { useStateData } from '../../context/appContext';
import { loginFormStyles } from './styles';

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

const LoginForm = ({ handleClose, open, setUser }) => {
  const classes = loginFormStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalStyle] = React.useState(getModalStyle);
  const { getLoginUser, getLatestComments, state } = useStateData();

  const clearInputFields = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = { username, password };
    axios
      .post('http://localhost:3001/users/login', formData)
      .then(res => {
        getLoginUser(res.data.username);
        setUser(res.data.username);
      })
      .catch(err => {
        console.log(err);
      });
    clearInputFields();
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Enter your username and password
          </Typography>
          <form
            onSubmit={handleSubmit}
            action="http://localhost:3001/users/login"
            method="POST"
          >
            <TextField
              onChange={e => setUsername(e.target.value)}
              value={username}
              name="username"
              label="USERNAME"
              data-testid="username"
              fullWidth
            />
            <TextField
              onChange={e => setPassword(e.target.value)}
              type="password"
              value={password}
              name="password"
              label="PASSWORD"
              data-testid="password"
              fullWidth
            />
            <div className={classes.actionButtons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.submitButton}
                type="submit"
              >
                LogIn
              </Button>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LoginForm;
