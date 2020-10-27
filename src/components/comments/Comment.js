import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const fakeComments = ["Hello this is nice", "Great product how much", "It costs $80", "Can I come look at it?"]


const useStyles = makeStyles(() => ({
  root: {
    border: '2px solid #cacccc',
    borderRadius: '5px',
    padding: '1%',
    margin: '1%',
    backgroundColor: '#ebeded'
  }
}));


const Comment = ({comment}) => {
  // State needed: comments
  // Backend data needed: comments, name of author (retrieved by author_id)
  // Need cookie of user logged in and compare to author_id of each comment, if userId === author_id, show comment with delete button
  //
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Typography variant="body1">
          {comment}
        </Typography>
      </div>
    </>
  );
};

export default Comment;
