import React from 'react';
import Container from '@material-ui/core/Container';
import CommentInput from './CommentInput';
import CommentList from './CommentList';


const CommentContainer = () => {

  return (
    <>
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
