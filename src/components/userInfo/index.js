import React from 'react';
import { Avatar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const userStyle = makeStyles(theme => ({
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25)
  },
  container: {
    width: theme.spacing(40),
    height: theme.spacing(50),
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem',
    boxShadow: '-2px 5px 25px -4px rgba(0,0,0,0.75)',
    borderRadius: '5px'
  },
  userInfo: {
    padding: '2rem',
    textAlign: 'center'
  }
}));

const UserInfo = () => {
  const classes = userStyle();
  return (
    <div className={classes.container}>
      <Avatar
        alt="user"
        className={classes.large}
        src="https://lh3.googleusercontent.com/proxy/m-QPOjBKO7rRpIKWrjSES9JzNJ0TsZZCVxfT6fhCfYZefw3ijMSnAsVFucIv8oQVbVLbfDzu3-21X8J2G_KRW9Wp0LbKoYZxrwnUVHg-dTYiin7xNYVEuzo9JysG1K11erYkxA"
      />
      <div className={classes.userInfo}>
        <Typography variant="h4">Username</Typography>
        <Typography variant="subtitle1">Location</Typography>
        <Button variant="contained" color="primary">
          Edit profile
        </Button>
      </div>
    </div>
  );
};
export default UserInfo;
