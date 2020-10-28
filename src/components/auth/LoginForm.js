/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Modal } from '@material-ui/core';

const rand = () => Math.round(Math.random() * 20) - 10;

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
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

const LoginForm = ({ handleClose, open, setUsername }) => {
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [modalStyle] = React.useState(getModalStyle);

  const clearInputFields = () => {
    setUser('');
    setPassword('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {username: user , password: password };

    axios.post("/users/login", formData)
         .then(res => {
           setUsername(res.data.username);
           alert(res.data.message);
         })
         .catch(err => {
           console.log(err)
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
            PLEASE LOG-IN
          </Typography>
          <form onSubmit={handleSubmit} action="/users/login" method="POST">
            <TextField
              onChange={(e) => setUser(e.target.value)}
              value={user}
              name="username"
              label="ENTER USERNAME"
              fullWidth
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              value={password}
              name="password"
              label="ENTER PASSWORD"
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
