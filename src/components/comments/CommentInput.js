import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import { useStateData } from '../../context/appContext';
import { commentContainerStyles } from './styles';

const CommentInput = () => {
  const classes = commentContainerStyles();
  const { createComment, state, productId, addNotification } = useStateData();
  const [comment, setComment] = useState('');

  const authorId = state.loginUser.id;
  const authorUsername = state.loginUser.username;
  const productInfoArray = state.saleData;

  const productTitle = 'Teddy Bear';

  const handleSubmit = e => {
    e.preventDefault();
    createComment(authorId, productId, comment, authorUsername);
    const notification = { authorUsername, productTitle, comment };
    // Don't send seller notifications of their own comment
    if (authorId !== state.loginUser.id) {
      addNotification(notification);
    }
    setComment('');
  };

  return authorId ? (
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
                fontSize: 14
              }
            }}
            value={comment}
            className={classes.inputStyle}
            id="filled-multiline-static"
            label="Write a comment..."
            variant="standard"
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
