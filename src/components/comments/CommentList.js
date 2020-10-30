import React, { makeStyles, useEffect, useState } from 'react';
import Comment from './Comment';
import { useStateData } from '../../context/appContext';

const CommentList = (filteredComments) => {

  const { state, fetchComments, productId, saleId } = useStateData();

  return (
    <>
      {filteredComments.comments &&
        filteredComments.comments.map(comment => (
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
