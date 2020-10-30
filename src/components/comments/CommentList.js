import React, { makeStyles, useEffect, useState } from 'react';
import Comment from './Comment';
import { useStateData } from '../../context/appContext';

const CommentList = (filteredComments) => {

  const { state, fetchComments, productId, saleId } = useStateData();



  // leave til later
  const [commentList, setCommentList] = useState([...filteredComments.comments]);


  // We are at the comment list
  // We have the sale ID
  // We HAVE a list of comments where the sale id is sale id
  // We will map that list of comments in to comments.

  // Filter comment list by product_id === productId ---

  useEffect(() => {
    // fetchComments(saleId);
    // console.log("fetching comments", fetchComments(saleId))
  }, []);

  return (
    <>
      {commentList &&
        commentList.map(comment => (
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
