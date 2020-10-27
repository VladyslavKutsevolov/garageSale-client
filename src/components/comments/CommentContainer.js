import React from 'react';
import CommentInput from './CommentInput';
import Container from '@material-ui/core/Container';


const CommentContainer = () => {

  // State needed: comments
  // Backend data needed: comments, name of author (retrieved by author_id)
  // Need cookie of user logged in and compare to author_id of each comment, if userId === author_id, show comment with delete button
  //

  return (
    <>
      <Container>
        <CommentInput />
      </Container>
    </>
  );
};

export default CommentContainer;
