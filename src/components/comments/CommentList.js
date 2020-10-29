import React, { makeStyles, useEffect, useState } from 'react';
import Comment from './Comment';
import { useStateData } from '../../context/appContext';




const CommentList = () => {
  const { state, fetchComments, productId } = useStateData();


  // leave til later
  const [comments, setComments] = useState([]);



  useEffect(() => {
    fetchComments(productId);
  }, []);


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
