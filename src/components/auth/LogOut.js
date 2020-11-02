/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ExitToApp } from '@material-ui/icons';
import { useStateData } from '../../context/appContext';

const LogOut = props => {
  const { setNoHidden } = useStateData();

  const logoutReq = e => {
    e.preventDefault();

    axios.post('/users/logout').then(res => {
      props.setUser('');
      alert(res.data.message);
    });

    setNoHidden(false);
  };

  return (
    <ListItem button onClick={e => logoutReq(e)}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  );
};
export default LogOut;
