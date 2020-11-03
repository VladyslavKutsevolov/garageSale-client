import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { useStateData } from '../../context/appContext';

const useStyles = makeStyles(() => ({
  root: {
    border: '1px solid #cacccc',
    borderRadius: '5px',
    padding: '7px',
    margin: '5px',
    backgroundColor: '#ebeded',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  seller: {
    border: '1px solid #ebd173',
    borderRadius: '5px',
    padding: '7px',
    margin: '5px',
    backgroundColor: '#f0e1aa',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  iconDiv: {
    position: 'absolute',
    top: '-17px',
    right: '-20px'
  },
  icon: {
    color: '#9c9c9c',
    maxHeight: '1rem'
  }
}));

const Comment = ({
  comment,
  author,
  authorId,
  createdAt,
  commentId,
  productId
}) => {
  const classes = useStyles();
  const { state, deleteComment } = useStateData();
  const sellerComment = false;
  let myComment = false;

  // Validate if user wrote comment
  if (state.loginUser.id === authorId) {
    myComment = true;
  }


  const handleDelete = () => {
    deleteComment(commentId);
    // fetchComments(productId);
  };

  return sellerComment ? (
    <>
      <div className={classes.seller}>
        <Typography variant="caption">{`${author} (seller): `}</Typography>
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
