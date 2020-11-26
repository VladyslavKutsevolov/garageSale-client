import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { TouchApp } from '@material-ui/icons';

const LogIn = props => {
  const handleLoginOpen = () => {
    props.setLoginForm(true);
  };

  return (
    <ListItem button onClick={handleLoginOpen} data-testid="login-opener">
      <ListItemIcon>
        <TouchApp />
      </ListItemIcon>
      <ListItemText primary="Sign in" />
    </ListItem>
  );
};

LogIn.propTypes = {
  setLoginForm: PropTypes.func.isRequired
};

export default LogIn;
