import React, { FC, useState } from 'react';
// eslint-disable-next-line import/extensions
import Comment from './Comment';
import { useStateData } from '../../context/appContext';

interface IComments {
  author: string;
  author_id: number;
  created_at: Date;
  productId: number;
  commentId: number;
  comment_text: string;
  id: number;
}

const CommentList: FC = () => {
  const { state, productId } = useStateData();
  const [commentListId] = useState(productId);

  const filteredComments: IComments[] = state.comments.filter(
    (comment: { product_id: number }) => comment.product_id === commentListId
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
