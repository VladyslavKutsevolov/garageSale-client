import React, { makeStyles, useEffect, useState } from 'react';
import Comment from './Comment';
import { useStateData } from '../../context/appContext';

const CommentList = () => {

  // const commentsList, setCommentsList = useState()
  const { state, productId } = useStateData();
  const [commentListId, setCommentListId] = useState(productId);

  console.log("comment list state", productId, state)
  const filteredComments = state.comments.filter(
    comment => comment.product_id === commentListId
  );

  console.log("filtered comments in commentlist", filteredComments)

  return (
    <>
      {filteredComments &&
        filteredComments.map(comment => (
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
