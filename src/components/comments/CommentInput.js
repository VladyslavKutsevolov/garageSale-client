import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginBottom: '8%',
      width: '94%'

    },
  }
}));

// Set to bypass error. Need product Id from backend.
const productId = 100;

// TODO 1: This component will need user info: userId(from cookies or state?), user name(get from users table using userID), productId

const CommentInput = () => {
  const classes = useStyles();

  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment posted successfully:", comment)

    // TODO 2: Axios request to be implemented when backend routes build

    // axios.post(`/products/${productId}/new`, comment)
    //   .then(() => {
    //     console.log("Comment posted successfully:", comment)
    //   })
    //   .catch(err => {
    //     alert('Your comment could not be posted. Please try again.')
    //   })

      setComment('');
  }

  return (
    <>
      <div>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} action={`comments/${productId}/new`}  method="POST">
          <TextField
            value={comment}
            id="filled-multiline-static"
            label="Write a comment..."
            variant="filled"
            fullWidth
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
      </div>
    </>
  )
};

export default CommentInput;
