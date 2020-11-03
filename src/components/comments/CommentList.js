import React, { useState } from 'react';
import Comment from './Comment';
import { useStateData } from '../../context/appContext';

const CommentList = () => {
  const { state, productId } = useStateData();
  const [commentListId] = useState(productId);
  const filteredComments = state.comments.filter(
    comment => comment.product_id === commentListId
  );

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
          />
        ))}
    </>
  );
};

export default CommentList;
