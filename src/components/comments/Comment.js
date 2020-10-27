import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles(() => ({
  root: {
    border: '2px solid #cacccc',
    borderRadius: '5px',
    padding: '2%',
    margin: '2%',
    backgroundColor: '#ebeded'
  },
  seller: {
    border: '2px solid #ebd173',
    borderRadius: '5px',
    padding: '2%',
    margin: '2%',
    backgroundColor: '#f0e1aa'
  }

}));


const Comment = ({comment, authorId, createdAt, saleData}) => {

  let sellerComment = false;

  if (saleData.sellerId === authorId) {
    sellerComment = true;
  }
  // State needed: comment data
  // Backend data needed: comments, name of author (retrieved by author_id), seller_id (retrieved from sales table from sale_id), sale_id
  // Need cookie of user logged in and compare to author_id of each comment, if userId === author_id, show comment with delete button
  // Need seller_id from sales table, if seller_id = comment author_id, render seller styling
  const classes = useStyles();

  return (

    sellerComment ?

    (
      <>
        <div className={classes.seller}>
          <Typography variant="body1">
    Name (seller): {comment}
          </Typography>
          <Typography variant="caption">
            {createdAt}
          </Typography>
        </div>
      </>

    )
    :
    (
      <>
        <div className={classes.root}>
          <Typography variant="body1">
            Name: {comment}
          </Typography>
          <Typography variant="caption">
            {createdAt}
          </Typography>
        </div>
      </>
    )

  );
};

export default Comment;
