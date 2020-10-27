import React, { makeStyles } from 'react';
import Comment from './Comment';



const commentData = ["Hello this is nice", "Great product how much", "It costs $80", "Can I come look at it?"]




const CommentList = () => {

  const comments = commentData.map( comment => (


    <Comment
      comment={comment}
    />
    ));

  return comments;
};

export default CommentList;
