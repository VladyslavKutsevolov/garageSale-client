import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { TouchApp } from '@material-ui/icons';

interface ILogin {
  setLoginForm(b: boolean): void;
}

const LogIn: React.FC<ILogin> = props => {
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

export default LogIn;
