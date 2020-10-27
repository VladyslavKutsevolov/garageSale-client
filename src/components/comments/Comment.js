import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';



const useStyles = makeStyles(() => ({
  root: {
    border: '2px solid #cacccc',
    borderRadius: '5px',
    padding: '2%',
    margin: '2%',
    backgroundColor: '#ebeded',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'

  },
  seller: {
    border: '2px solid #ebd173',
    borderRadius: '5px',
    padding: '2%',
    margin: '2%',
    backgroundColor: '#f0e1aa',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'

  },
  icon: {
    color: "#9c9c9c",
    position: 'absolute',
    top: '-25%',
    right: 0

  }

}));



const Comment = ({comment, authorId, createdAt, saleData}) => {

  saleData = { saleId: 4, sellerId: 1}
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
          <CancelIcon className={classes.icon}/>
        </div>
      </>

    )
    :
    (
      <div className={classes.root}>
        <Typography variant="body1">
        Name: {comment}
        </Typography>
        <CancelIcon className={classes.icon}/>
      </div>
    )

  );
};

export default Comment;
