import React, { FC, MouseEvent } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ExitToApp } from '@material-ui/icons';
import { useStateData } from '../../context/appContext';

interface ILogout {
  setUser(user: string): void;
}

const LogOut: FC<ILogout> = props => {
  const { setNoHidden, logOutUser } = useStateData();

  const logoutReq = (e: MouseEvent) => {
    e.preventDefault();

    logOutUser();
    props.setUser('');
    setNoHidden(false);
  };

  return (
    <ListItem button onClick={logoutReq}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sign out" />
    </ListItem>
  );
};

export default LogOut;
