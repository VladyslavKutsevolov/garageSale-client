import React, { makeStyles, useEffect, useState } from 'react';
import Comment from './Comment';
import { useStateData } from '../../context/appContext';

const CommentList = () => {
  const { state, fetchComments, productId, saleId } = useStateData();

  // leave til later
  const [commentList, setCommentList] = useState([]);
  console.log('commentliststate', state);
  console.log('commentlistsaleId', saleId);

  // We are at the comment list
  // We have the sale ID
  // We need a list of comments where the sale id is sale id
  // We will map that list of comments in to comments.

  // Filter comment list by product_id === productId ---

  useEffect(() => {
    // fetchComments(saleId);
    console.log(fetchComments(saleId))
  }, []);

  return (
    <>
      {state.comments &&
        state.comments.map(comment => (
          <Comment
            productId={productId}
            key={comment.id}
            authorId={comment.author_id}
            commentId={comment.id}
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
