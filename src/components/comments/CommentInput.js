import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',

    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  icon: {
    height: '30px',
    padding: 0,
    margin: '20px 0px'
  }
}));

// TODO 1: This component will need user info: userId(from cookies or state?), user name(get from users table using userID), productId

const CommentInput = () => {
  const classes = useStyles();
  const { createComment, state, productId } = useStateData();
  const [comment, setComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (state.loginUser.id) {
      createComment(state.loginUser.id, productId, comment);
      setComment('');
    }
  };

  return state.loginUser.id ? (
    <>
      <div>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          action={`/comments/${productId}/new`}
          method="POST"
        >
          <TextField
            InputLabelProps={{
              style: {
                fontSize: 12
              }
            }}
            value={comment}
            className={classes.inputStyle}
            id="filled-multiline-static"
            label="Write a comment..."
            variant="filled"
            fullWidth
            onChange={e => setComment(e.target.value)}
          />
          <IconButton className={classes.icon} onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </>
  ) : (
    <>
      <Typography variant="h6" gutterBottom>
        Sign in to post a comment
      </Typography>
    </>
  );
};

export default CommentInput;
