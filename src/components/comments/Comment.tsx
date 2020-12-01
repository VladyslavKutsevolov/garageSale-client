import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { useStateData } from '../../context/appContext';
import { commentStyles } from './styles';

interface IComment {
  comment: string;
  author: string;
  authorId: number;
  createdAt: Date;
  productId: number;
  commentId: number;
}

const Comment: FC<IComment> = ({ comment, author, authorId, commentId }) => {
  const classes = commentStyles();
  const { state, deleteComment } = useStateData();
  let sellerComment = false;
  let myComment = false;

  // Validate if user wrote comment
  if (state.loginUser.id === authorId) {
    myComment = true;
  }

  if (state.saleInfo.seller_id === authorId) {
    sellerComment = true;
  }

  const handleDelete = () => {
    deleteComment(commentId);
  };

  return sellerComment ? (
    <>
      <div className={classes.seller}>
        <Typography variant="caption">{`${author} (seller): ${comment}`}</Typography>
        {myComment && (
          <IconButton className={classes.iconDiv} onClick={handleDelete}>
            <CancelIcon className={classes.icon} />
          </IconButton>
        )}
      </div>
    </>
  ) : (
    <div className={classes.root}>
      <Typography variant="caption">{`${author}: ${comment}`}</Typography>
      {myComment && (
        <IconButton className={classes.iconDiv} onClick={handleDelete}>
          <CancelIcon className={classes.icon} />
        </IconButton>
      )}
    </div>
  );
};

export default Comment;
