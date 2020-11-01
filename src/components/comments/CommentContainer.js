import React, { makeStyles } from 'react';
import Container from '@material-ui/core/Container';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { useStateData } from '../../context/appContext';

const CommentContainer = () => {
  const { state, productId } = useStateData();

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
