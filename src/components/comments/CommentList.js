import React, { makeStyles, useEffect, useState } from 'react';
import Comment from './Comment';
import { useStateData } from '../../context/appContext';




const CommentList = () => {
  const { state, fetchComments, productId } = useStateData();

  useEffect(() => {
    fetchComments(productId);
  }, []);

  console.log("commenlist", state)


  return (
    <>
      {state.comments && state.comments.map(comment => (
        <Comment
          comment={comment.comment_text}
          author={comment.author}
          createdAt={comment.created_at}
          // saleData={saleData}
        />
      ))}
    </>
  );
};

export default CommentList;
