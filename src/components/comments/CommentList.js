import React, { makeStyles } from 'react';
import Comment from './Comment';



const commentData = [
  {
    productId: 1,
    authorId: 4,
    createdAt: "November 6th",
    commentText: "Wow this is nice"
  },
  {
    productId: 1,
    authorId: 2,
    createdAt: "November 6th",
    commentText: "Can I come and view it today?"
  },
  {
    productId: 1,
    authorId: 1,
    createdAt: "November 6th",
    commentText: "Yes I'm available all day"
  },
  {
    productId: 1,
    authorId: 2,
    createdAt: "November 6th",
    commentText: "Sounds good"
  }
]
const saleData = { saleId: 4, sellerId: 1}



const CommentList = () => {

  const comments = commentData.map( comment => (


    <Comment
      comment={comment.commentText}
      authorId={comment.authorId}
      createdAt={comment.createdAt}
      authorId={comment.authorId}
      saleData={saleData}
    />
    ));

  return comments;
};

export default CommentList;
