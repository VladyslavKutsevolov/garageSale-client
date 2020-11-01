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

const CommentInput = () => {
  const classes = useStyles();
  const { createComment, state, productId, addNotification } = useStateData();
  const [comment, setComment] = useState('');

  const authorId = state.loginUser.id;
  const authorUsername = state.loginUser.username;
  const sellerId = state.loginUser.seller_id;
  const productInfoArray = state.saleData;



  const productTitle = productInfoArray.filter(
    p => p.product_id === productId
  )[0].product_title;



  const handleSubmit = e => {
    e.preventDefault();
    if (authorId) {
      createComment(authorId, productId, comment, authorUsername);

      // Will need to add validation here when doing postman test
      const notification = { authorUsername, productTitle, comment };
      addNotification(notification);
      setComment('');
    }
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
