import React, { makeStyles } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Container from '@material-ui/core/Container';


// const useStyles = makeStyles(theme => ({
//   root: {

//     border: '2px solid #3f51b5'
//   }

// }));

const CommentContainer = (state) => {
  // State needed: comments
  // Backend data needed: comments, name of author (retrieved by author_id)
  // Need cookie of user logged in and compare to author_id of each comment, if userId === author_id, show comment with delete button
  //

  // const classes = useStyles();

  return (

    <>
      {/* <div className={classes.root}> */}
      <div>
        <Container
        style={{
          border:'1px solid #bfbfbf',
          borderRadius: '5px'
          }}>
          <CommentList />
          <CommentInput />
        </Container>
      </div>
    </>

  );
};

export default CommentContainer;
