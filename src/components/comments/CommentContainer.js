import React, { makeStyles } from 'react';
import Container from '@material-ui/core/Container';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentContainer = () => {
  // State needed: comments
  // Backend data needed: comments, name of author (retrieved by author_id)
  // Need cookie of user logged in and compare to author_id of each comment, if userId === author_id, show comment with delete button
  //

  // const classes = useStyles();

  return (
    <>
      {/* <div className={classes.root}> */}
      <div>
        <Container>
          <CommentList />
          <CommentInput />
        </Container>
      </div>
    </>
  );
};

export default CommentContainer;
