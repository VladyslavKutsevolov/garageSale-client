import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const CommentInput = () => {
  const classes = useStyles();

  return (
    <>
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="filled-multiline-static"
            label="Write a comment..."
            multiline
            rows={2}
            variant="filled"
            fullWidth
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                console.log(e);
                // write your functionality here
              }
            }}
          />
        </form>
      </div>
    </>
  )
};

export default CommentInput;
