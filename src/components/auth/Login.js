import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { TouchApp } from '@material-ui/icons';

const LogIn = (props) => {
  const handleLoginOpen = () => {
    props.setLoginForm(true);
  };

  return (
    <ListItem button onClick={handleLoginOpen} data-testid="login-opener">
      <ListItemIcon>
        <TouchApp />
      </ListItemIcon>
      <ListItemText primary="User Login" />
    </ListItem>
  );
};
export default LogIn;
