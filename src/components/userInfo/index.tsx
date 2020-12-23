import React, { FC } from 'react';
import { Avatar, Button, Typography } from '@material-ui/core';
import { userStyle } from './styles';

const UserInfo: FC = () => {
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
