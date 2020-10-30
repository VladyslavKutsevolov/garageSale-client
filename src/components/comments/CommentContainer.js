import React, { makeStyles } from 'react';
import Container from '@material-ui/core/Container';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { useStateData } from '../../context/appContext';

const CommentContainer = () => {
  const { state, productId } = useStateData();
  const filteredComments = state.comments.filter(
    comment => comment.product_id === productId
  );

  console.log("commentcontainer", state)


  return (
    <>
      <div>
        <Container>
          <CommentList comments={filteredComments} />
          <CommentInput />
        </Container>
      </div>
    </>
  );
};

export default CommentContainer;
