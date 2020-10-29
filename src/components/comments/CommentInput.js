import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles((theme) => ({
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

// Set to bypass error. Need product Id from backend.
const productId = 100;

// TODO 1: This component will need user info: userId(from cookies or state?), user name(get from users table using userID), productId

const CommentInput = () => {
  const classes = useStyles();
  const { createComment } = useStateData();
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment posted successfully:", comment)
    createComment(productId, comment);
    setComment('');
  };


  return (
    <>
      <div>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} action={`/comments/${productId}/new`}  method="POST">
          <TextField
            InputLabelProps={{
              style: {
                fontSize: 12
              }}}
            value={comment}
            className={classes.inputStyle}
            id="filled-multiline-static"
            label="Write a comment..."
            variant="filled"
            fullWidth
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton className={classes.icon} onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </>
  )
};

export default CommentInput;
