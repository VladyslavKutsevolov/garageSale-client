import React from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ExitToApp } from '@material-ui/icons';
import { useStateData } from '../../context/appContext';

const LogOut = props => {
  const { setNoHidden, logOutUser } = useStateData();

  const logoutReq = e => {
    e.preventDefault();

    logOutUser();
    props.setUser('');
    setNoHidden(false);
  };

  return (
    <ListItem button onClick={e => logoutReq(e)}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sign out" />
    </ListItem>
  );
};

LogOut.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default LogOut;
