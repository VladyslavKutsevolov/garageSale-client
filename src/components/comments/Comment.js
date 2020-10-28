import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

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

const Comment = ({ comment, authorId, createdAt, saleData }) => {
  saleData = { saleId: 4, sellerId: 1 };

  let sellerComment = false;

  const myComment = true;
  // TODO: grab userCookie
  // if (!userId === authorId) {myComment = true;}

  if (saleData.sellerId === authorId) {
    sellerComment = true;
  }

  // State needed: comment data
  // Backend data needed: comments, name of author (retrieved by author_id), seller_id (retrieved from sales table from sale_id), sale_id
  // Need cookie of user logged in and compare to author_id of each comment, if userId === author_id, show comment with delete button
  // Need seller_id from sales table, if seller_id = comment author_id, render seller styling
  const classes = useStyles();



  const deleteHandler = () => {

  }

  return sellerComment ? (
    <>
      <div className={classes.seller}>
        <Typography variant="caption">
          Name (seller):
          {comment}
        </Typography>
        {myComment && (
          // <IconButton className={classes.iconDiv} hoveredStyle={hoveredStyle} onclick={deleteHandler}>
          <IconButton className={classes.iconDiv} onclick={deleteHandler}>
            <CancelIcon className={classes.icon}/>
          </IconButton>
        )}
      </div>
    </>
  ) : (
    <div className={classes.root}>
      <Typography variant="caption">
        Name:
        {" " + comment}
      </Typography>
      {myComment && (
        // <IconButton className={classes.iconDiv} hoveredStyle={hoveredStyle} onclick={deleteHandler}>
        <IconButton className={classes.iconDiv}  onclick={deleteHandler}>
          <CancelIcon className={classes.icon} />
        </IconButton>
      )}

    </div>
  );
};

export default Comment;
