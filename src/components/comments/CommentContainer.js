import React, { makeStyles } from 'react';
import Container from '@material-ui/core/Container';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { useStateData } from '../../context/appContext';

// const useStyles = makeStyles(theme => ({
//   root: {

//     border: '2px solid #3f51b5'
//   }

// }));

const CommentContainer = () => {
  const { state, productId } = useStateData();
  const filteredComments = state.comments.filter(
    comment => comment.product_id === productId
    );




  return (
    <>
      {/* <div className={classes.root}> */}
      <div>
        <Container
          style={{
            border: '1px solid #bfbfbf',
            borderRadius: '5px'
          }}
        >
          <CommentList comments={filteredComments} />
          <CommentInput />
        </Container>
      </div>
    </>
  );
};

export default CommentContainer;
