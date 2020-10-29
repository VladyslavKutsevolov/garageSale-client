import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Cookies from 'js-cookie';

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

const Comment = ({ comment, author, authorId, createdAt }) => {
  const classes = useStyles();
  let sellerComment = false;
  const myComment = true;

  console.log("cookiegrab", Cookies.get())
  // TODO: grab userCookie
  // if (!userId === authorId) {myComment = true;}

  // if (saleData.sellerId === authorId) {
  //   sellerComment = true;
  // };



  // Need cookie of user logged in and compare to author_id of each comment, if userId === author_id, show comment with delete button
  // Need seller_id from sales table, if seller_id = comment author_id, render seller styling

  const handleDelete = () => {
    console.log("delete")
    console.log('cookie', Cookies.get('userId'));
  }

  return sellerComment ? (
    <>
      <div className={classes.seller}>
        <Typography variant="caption">{author + ' (seller): '}</Typography>
        {myComment && (
          // <IconButton className={classes.iconDiv} hoveredStyle={hoveredStyle} onclick={deleteHandler}>
          <IconButton className={classes.iconDiv} onClick={handleDelete}>
            <CancelIcon className={classes.icon}/>
          </IconButton>
        )}
      </div>
    </>
  ) : (
    <div className={classes.root}>
      <Typography variant="caption">
        {author + ": " + comment}
      </Typography>
      {myComment && (
        // <IconButton className={classes.iconDiv} hoveredStyle={hoveredStyle} onclick={deleteHandler}>
        <IconButton className={classes.iconDiv}  onClick={handleDelete}>
          <CancelIcon className={classes.icon} />
        </IconButton>
      )}

    </div>
  );
};

export default Comment;
